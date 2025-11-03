import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { TelegrafExecutionContext } from 'nestjs-telegraf'
import { Context } from 'telegraf'
import { MessageService } from '~/message/message.service'

@Injectable()
export class TelegramUserGuard implements CanActivate {
    constructor(private readonly messageService: MessageService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = TelegrafExecutionContext.create(context)
        const botContext = ctx.getContext<Context>()

        if (!botContext.from) {
            const message = this.messageService.telegramNotFound('from')
            await botContext.reply(message)
            return false
        }

        return true
    }
}
