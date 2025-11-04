import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { TelegrafExecutionContext } from 'nestjs-telegraf'
import { Context } from 'telegraf'
import { DriverModel } from '~/entity/driver/driver.model'
import { DriverStatus } from '~/constants/shared'
import { KeyboardService } from '../taxi-driver-bot/keyboard.service'
import { MessageService } from '~/message/message.service'

@Injectable()
export class TelegramDriverEmployedGuard implements CanActivate {
    constructor(
        private readonly messageService: MessageService,
        private readonly keyboardService: KeyboardService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = TelegrafExecutionContext.create(context)
        const botContext = ctx.getContext<Context>()

        const driver = botContext.state.driver as DriverModel

        if (driver.status !== DriverStatus.TWO) {
            const message = this.messageService.notAccess()
            const keyboard = this.keyboardService.mainMenu(driver.status)

            await botContext.reply(message, keyboard)
            return false
        }

        return true
    }
}
