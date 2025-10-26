import { Update, Ctx, Start, Action } from 'nestjs-telegraf'
import { Context } from 'telegraf'
import { MESSAGE } from './message'
import { UseGuards } from '@nestjs/common'
import { TelegramUserGuard } from '../guards/telegram-user.guard'
import { TelegramUser } from '../decorators/telegram-user.decorator'
import type { User } from 'telegraf/types'
import { ApplicationStatus, ApplicationType, ReapplyType } from '~/constants'
import { DriverService } from '~/entity/driver/driver.service'
import { ApplicationService } from '~/entity/application/application.service'
import { BotService } from './bot.service'

@Update()
export class BotUpdate {
    constructor(
        private readonly botService: BotService,
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

            await ctx.reply(
                MESSAGE.START.FIRST,
                this.botService.getButton(MESSAGE.APPLICATION.EMPLOYMENT.CREATE, ApplicationType.EMPLOYMENT)
            )
        } else {
            await ctx.reply(MESSAGE.START.EXISTING)
        }
    }

    @Action(ApplicationType.EMPLOYMENT)
    @UseGuards(TelegramUserGuard)
    async onEmploymentButton(@TelegramUser() telegramUser: User, @Ctx() ctx: Context) {
        await ctx.answerCbQuery()

        const driver = await this.driverService.findDriverByTelegramId(telegramUser.id)
        if (!driver) {
            await ctx.reply(MESSAGE.ERROR.DOES_NOT_EXIST)
            return
        }

        const application = await this.applicationService.getDriverEmploymentApplication(driver.id)
        if (!application) {
            await this.applicationService.createEmploymentApplication(
                driver.id,
                `Заявка на трудоустройство от ${ctx.from?.first_name} (@${ctx.from?.username})`
            )

            await ctx.reply(MESSAGE.APPLICATION.EMPLOYMENT.CREATED)
            return
        }

        if (application.status === ApplicationStatus.PENDING) {
            await ctx.reply(MESSAGE.APPLICATION.EMPLOYMENT.PENDING)
            return
        }

        if (application.status === ApplicationStatus.IN_PROGRESS) {
            await ctx.reply(MESSAGE.APPLICATION.EMPLOYMENT.IN_PROGRESS)
            return
        }

        if (application.status === ApplicationStatus.APPROVED) {
            await ctx.reply(
                MESSAGE.APPLICATION.EMPLOYMENT.APPROVED,
                this.botService.getButton(MESSAGE.APPLICATION.EMPLOYMENT.REAPPLY, ReapplyType.EMPLOYMENT)
            )
            return
        }

        if (application.status === ApplicationStatus.REJECTED) {
            await ctx.reply(
                MESSAGE.APPLICATION.EMPLOYMENT.REJECTED,
                this.botService.getButton(MESSAGE.APPLICATION.EMPLOYMENT.REAPPLY, ReapplyType.EMPLOYMENT)
            )
            return
        }

        if (application.status === ApplicationStatus.ARCHIVED) {
            await ctx.reply(
                MESSAGE.APPLICATION.EMPLOYMENT.ARCHIVED,
                this.botService.getButton(MESSAGE.APPLICATION.EMPLOYMENT.REAPPLY, ReapplyType.EMPLOYMENT)
            )
            return
        }
    }

    @Action(ReapplyType.EMPLOYMENT)
    @UseGuards(TelegramUserGuard)
    async onReapplyEmploymentButton(@TelegramUser() telegramUser: User, @Ctx() ctx: Context) {
        await ctx.answerCbQuery()

        const driver = await this.driverService.findDriverByTelegramId(telegramUser.id)
        if (!driver) {
            await ctx.reply(MESSAGE.ERROR.DOES_NOT_EXIST)
            return
        }

        const application = await this.applicationService.getDriverEmploymentApplication(driver.id)
        if (!application) {
            await this.applicationService.createEmploymentApplication(
                driver.id,
                `Заявка на трудоустройство от ${ctx.from?.first_name} (@${ctx.from?.username})`
            )

            await ctx.reply(MESSAGE.APPLICATION.EMPLOYMENT.CREATED)
            return
        }

        if (application.status === ApplicationStatus.PENDING) {
            await ctx.reply(MESSAGE.APPLICATION.EMPLOYMENT.PENDING)
            return
        }

        if (application.status === ApplicationStatus.IN_PROGRESS) {
            await ctx.reply(MESSAGE.APPLICATION.EMPLOYMENT.IN_PROGRESS)
            return
        }

        await this.applicationService.update(application.id, { status: ApplicationStatus.PENDING })
        await ctx.reply(MESSAGE.APPLICATION.EMPLOYMENT.REAPPLY_SUCCESS)
    }
}
