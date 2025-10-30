import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { TelegrafExecutionContext } from 'nestjs-telegraf'
import { Context } from 'telegraf'

@Injectable()
export class TelegramUserGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = TelegrafExecutionContext.create(context)
        const botContext = ctx.getContext<Context>()

        if (!botContext.from) {
            await botContext.reply('Не удалось получить информацию')
            return false
        }

        return true
    }
}
