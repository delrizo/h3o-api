import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { DriverService } from '~/entity/driver/driver.service'
import { TelegrafExecutionContext } from 'nestjs-telegraf'
import { Context } from 'telegraf'
import { MessageService } from '~/message/message.service'
import { KeyboardService } from '../taxi-driver-bot/keyboard.service'

@Injectable()
export class TelegramDriverGuard implements CanActivate {
    constructor(
        private readonly driverService: DriverService,
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

        const driver = await this.driverService.findDriverByTelegramId(botContext.from.id)
        if (!driver) {
            const message = this.messageService.telegramNotFound('driver')
            const keyboard = this.keyboardService.resetMenu()

            await botContext.reply(message, keyboard)
            return false
        }

        botContext.state.driver = driver
        return true
    }
}
