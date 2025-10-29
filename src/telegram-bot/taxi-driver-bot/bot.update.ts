import { Update, Ctx, Start, Action, Hears } from 'nestjs-telegraf'
import { Context } from 'telegraf'
import { MESSAGE } from './message/message'
import { UseGuards } from '@nestjs/common'
import { TelegramUserGuard } from '../guards/telegram-user.guard'
import { TelegramUser } from '../decorators/telegram-user.decorator'
import type { User } from 'telegraf/types'
import { ApplicationStatus, ReapplyType } from '~/constants'
import { DriverService } from '~/entity/driver/driver.service'
import { ApplicationService } from '~/entity/application/application.service'
import { BotService } from './bot.service'
import { MENU_MESSAGE } from './message/menu.message'

@Update()
export class BotUpdate {
    constructor(
        private readonly botService: BotService,
        private readonly driverService: DriverService,
        private readonly applicationService: ApplicationService
    ) {}

    @Start()
    @UseGuards(TelegramUserGuard)
    async start(@TelegramUser() user: User, @Ctx() ctx: Context) {
        const { message, keyboard } = await this.botService.startHandler(user)

        await ctx.replyWithMarkdownV2(message, keyboard)
    }

    @Hears(MENU_MESSAGE.MAIN.one.CREATE_EMPLOYMENT)
    @UseGuards(TelegramUserGuard)
    async createEmployment(@TelegramUser() user: User, @Ctx() ctx: Context) {
        const { message, button } = await this.botService.employmentHandler(user)

        await ctx.reply(message, button)
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

    // @Command('checks')
    // @UseGuards(TelegramUserGuard)
    // async onChecks(@TelegramUser() telegramUser: User, @Ctx() ctx: Context) {
    //     await ctx.reply(
    //         'Выберите действие: ',
    //         this.botService.getMenu([[MESSAGE.CHECKS.UPLOAD, MESSAGE.CHECKS.STATISTIC], [MESSAGE.SHARED.BACK]])
    //     )
    // }
}
