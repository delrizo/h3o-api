import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { TelegrafExecutionContext } from 'nestjs-telegraf'
import { Context } from 'telegraf'

export const TelegramUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const context = TelegrafExecutionContext.create(ctx)
    const { from } = context.getContext<Context>()

    if (!from) {
        throw new Error('Пользователь Telegram не найден')
    }

    return from
})
