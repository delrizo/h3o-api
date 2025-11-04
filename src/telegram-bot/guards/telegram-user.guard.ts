import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { TelegrafExecutionContext } from 'nestjs-telegraf'
import { Context } from 'telegraf'
import { MessageService } from '~/message/message.service'
import { KeyboardService } from '../taxi-driver-bot/keyboard.service'

@Injectable()
export class TelegramUserGuard implements CanActivate {
    constructor(
        private readonly messageService: MessageService,
        private readonly keyboardService: KeyboardService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = TelegrafExecutionContext.create(context)
        const botContext = ctx.getContext<Context>()

        if (!botContext.from) {
            const message = this.messageService.telegramNotFound('from')
            const keyboard = this.keyboardService.resetMenu()

            await botContext.reply(message, keyboard)
            return false
        }

        return true
    }
}
