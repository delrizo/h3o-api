import { Update, Ctx, Start, Action, Hears } from 'nestjs-telegraf'
import { Context } from 'telegraf'
import { UseGuards } from '@nestjs/common'
import { TelegramUserGuard } from '../guards/telegram-user.guard'
import { TelegramUser } from '../decorators/telegram-user.decorator'
import type { User } from 'telegraf/types'
import { ReapplyType } from '~/constants/shared'
import { BotService } from './bot.service'
import { MENU_MESSAGE } from '../../constants/message/menu.message'
import { TelegramDriverGuard } from '../guards/telegram-driver.guard'
import { TelegramDriver } from '../decorators/telegram-driver.decorator'
import { DriverModel } from '~/entity/driver/driver.model'
import { TelegramDriverBlockGuard } from '../guards/telegram-driver-block.guard'

@Update()
export class BotUpdate {
    constructor(private readonly botService: BotService) {}

    @Start()
    @UseGuards(TelegramUserGuard)
    async start(@TelegramUser() user: User, @Ctx() ctx: Context) {
        const { message, keyboard } = await this.botService.startHandler(user)

        await ctx.replyWithMarkdownV2(message, keyboard)
    }

    @Hears(MENU_MESSAGE.MAIN.one.CREATE_EMPLOYMENT)
    @UseGuards(TelegramDriverGuard, TelegramDriverBlockGuard)
    async createEmployment(@TelegramDriver() driver: DriverModel, @Ctx() ctx: Context) {
        const { message, button } = await this.botService.employmentHandler(driver)

        await ctx.reply(message, button)
    }

    @Action(ReapplyType.EMPLOYMENT)
    @UseGuards(TelegramDriverGuard, TelegramDriverBlockGuard)
    async reapplyEmployment(@TelegramDriver() driver: DriverModel, @Ctx() ctx: Context) {
        await ctx.answerCbQuery()

        const { message } = await this.botService.reapplyEmploymentHandler(driver)

        await ctx.reply(message)
    }

    @Hears(MENU_MESSAGE.MAIN.three.BLOCK)
    @UseGuards(TelegramDriverGuard)
    async block(@TelegramDriver() driver: DriverModel, @Ctx() ctx: Context) {
        const { message } = this.botService.blockHandler(driver)

        await ctx.reply(message)
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
