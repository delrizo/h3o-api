import { Update, Ctx, Start, Action } from 'nestjs-telegraf'
import { Context } from 'telegraf'
import { BUTTON, MESSAGE } from './message'
import { UseGuards } from '@nestjs/common'
import { TelegramUserGuard } from '../guards/telegram-user.guard'
import { TelegramUser } from '../decorators/telegram-user.decorator'
import type { User } from 'telegraf/types'
import { ApplicationType } from '~/constants'
import { DriverService } from '~/entity/driver/driver.service'
import { ApplicationService } from '~/entity/application/application.service'

@Update()
export class BotUpdate {
    constructor(
        private readonly driverService: DriverService,
        private readonly applicationService: ApplicationService
    ) {}

    @Start()
    @UseGuards(TelegramUserGuard)
    async start(@TelegramUser() telegramUser: User, @Ctx() ctx: Context) {
        const isDriverExists = await this.driverService.isDriverExists(telegramUser.id)

        if (!isDriverExists) {
            await this.driverService.createDriverWithTelegram({
                telegram_id: telegramUser.id,
                first_name: telegramUser.first_name ?? '',
                username: telegramUser.username ?? ''
            })

            await ctx.reply(MESSAGE.START.FIRST, BUTTON.START.FIRST)
        } else {
            await ctx.reply(MESSAGE.START.EXISTING)
        }
    }

    @Action(ApplicationType.EMPLOYMENT)
    @UseGuards(TelegramUserGuard)
    async onApplicationButton(@TelegramUser() telegramUser: User, @Ctx() ctx: Context) {
        await ctx.answerCbQuery()

        const driver = await this.driverService.findDriverByTelegramId(telegramUser.id)

        if (!driver) {
            await ctx.reply(MESSAGE.ERROR.DOES_NOT_EXIST)
            return
        }

        // Проверка 1: Доступность заявки для статуса водителя
        if (!this.applicationService.canCreateEmploymentApplication(driver.status)) {
            await ctx.reply(MESSAGE.ERROR.APPLICATION_NOT_AVAILABLE)
            return
        }

        // Проверка 2: Нет ли уже активной заявки
        const hasPending = await this.applicationService.hasPendingEmploymentApplication(driver.id)
        if (hasPending) {
            await ctx.reply(MESSAGE.ERROR.APPLICATION_PENDING)
            return
        }

        try {
            // Создаем заявку на employment
            await this.applicationService.createEmploymentApplication(
                driver.id,
                `Заявка на трудоустройство от ${ctx.from?.first_name} (@${ctx.from?.username})`
            )

            // Отправляем сообщения об успехе
            await ctx.reply(MESSAGE.APPLICATION.EMPLOYMENT.SUCCESS)
            await ctx.reply(MESSAGE.APPLICATION.EMPLOYMENT.INFO)
            await ctx.reply(MESSAGE.APPLICATION.EMPLOYMENT.PENDING)
        } catch {
            await ctx.reply('❌ Произошла ошибка при создании заявки. Попробуйте позже.')
        }
    }
}
