import { Update, Ctx, Start, Action, Hears } from 'nestjs-telegraf'
import { Context } from 'telegraf'
import { UseGuards } from '@nestjs/common'
import { TelegramUserGuard } from '../guards/telegram-user.guard'
import { TelegramUser } from '../decorators/telegram-user.decorator'
import type { User } from 'telegraf/types'
import { ACTION, HEARS } from '~/constants/shared'
import { BotService } from './bot.service'
import { TelegramDriverGuard } from '../guards/telegram-driver.guard'
import { TelegramDriver } from '../decorators/telegram-driver.decorator'
import { DriverModel } from '~/entity/driver/driver.model'
import { TelegramDriverBlockGuard } from '../guards/telegram-driver-block.guard'
import { TelegramDriverEmployedGuard } from '../guards/telegram-driver-employed.guard'
import { SceneContext } from 'telegraf/scenes'

@Update()
export class BotUpdate {
    constructor(private readonly botService: BotService) {}

    @Start()
    @UseGuards(TelegramUserGuard)
    async start(@TelegramUser() user: User, @Ctx() ctx: Context) {
        const { message, keyboard } = await this.botService.startHandler(user)

        await ctx.replyWithMarkdownV2(message, keyboard)
    }

    @Hears(HEARS.CREATE_EMPLOYMENT)
    @UseGuards(TelegramDriverGuard, TelegramDriverBlockGuard)
    async createEmployment(@TelegramDriver() driver: DriverModel, @Ctx() ctx: Context) {
        const { message, button } = await this.botService.employmentHandler(driver)

        await ctx.reply(message, button)
    }

    @Action(ACTION.REAPPLY_EMPLOYMENT)
    @UseGuards(TelegramDriverGuard, TelegramDriverBlockGuard)
    async reapplyEmployment(@TelegramDriver() driver: DriverModel, @Ctx() ctx: Context) {
        await ctx.answerCbQuery()

        const { message } = await this.botService.reapplyEmploymentHandler(driver)

        await ctx.reply(message)
    }

    @Hears(HEARS.WHAT)
    @UseGuards(TelegramDriverGuard)
    async block(@TelegramDriver() driver: DriverModel, @Ctx() ctx: Context) {
        const { message } = this.botService.blockHandler(driver)

        await ctx.reply(message)
    }

    @Hears(HEARS.CHECKS)
    @UseGuards(TelegramDriverGuard, TelegramDriverEmployedGuard, TelegramDriverBlockGuard)
    async checks(@Ctx() ctx: Context) {
        const { message, buttons } = this.botService.checksHandler()

        await ctx.reply(message, buttons)
    }

    @Action(ACTION.UPLOAD_CHECKS)
    @UseGuards(TelegramDriverGuard, TelegramDriverEmployedGuard, TelegramDriverBlockGuard)
    async uploadChecks(@Ctx() ctx: Context & SceneContext) {
        await ctx.answerCbQuery()

        await ctx.scene.enter(ACTION.UPLOAD_CHECKS)
    }

    @Hears(HEARS.COMPLETE)
    @UseGuards(TelegramDriverGuard, TelegramDriverEmployedGuard, TelegramDriverBlockGuard)
    async complete() {}

    // @Command('checks')
    // @UseGuards(TelegramUserGuard)
    // async onChecks(@TelegramUser() telegramUser: User, @Ctx() ctx: Context) {
    //     await ctx.reply(
    //         'Выберите действие: ',
    //         this.botService.getMenu([[MESSAGE.CHECKS.UPLOAD, MESSAGE.CHECKS.STATISTIC], [MESSAGE.SHARED.BACK]])
    //     )
    // }
}
