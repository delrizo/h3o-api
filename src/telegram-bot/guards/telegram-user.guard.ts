import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { TelegrafExecutionContext } from 'nestjs-telegraf'
import { Context } from 'telegraf'

@Injectable()
export class TelegramUserGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const ctx = TelegrafExecutionContext.create(context)
        const { from } = ctx.getContext<Context>()

        if (!from) {
            const botContext = ctx.getContext<Context>()
            botContext.reply('Не удалось получить информацию')
            return false
        }

        return true
    }
}
