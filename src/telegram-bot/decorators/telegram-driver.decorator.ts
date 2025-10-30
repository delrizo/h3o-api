import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { TelegrafExecutionContext } from 'nestjs-telegraf'
import { Context } from 'telegraf'
import { DriverModel } from '~/entity/driver/driver.model'

export const TelegramDriver = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const context = TelegrafExecutionContext.create(ctx)
    const botContext = context.getContext<Context>()

    if (!botContext.state.driver) {
        throw new Error('Пользователь Telegram не найден')
    }

    return botContext.state.driver as DriverModel
})
