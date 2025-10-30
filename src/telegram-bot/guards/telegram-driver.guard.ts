import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { DriverService } from '~/entity/driver/driver.service'
import { MessageService } from '../taxi-driver-bot/message.service'
import { TelegrafExecutionContext } from 'nestjs-telegraf'
import { Context } from 'telegraf'

@Injectable()
export class TelegramDriverGuard implements CanActivate {
    constructor(
        private readonly driverService: DriverService,
        private readonly messageService: MessageService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = TelegrafExecutionContext.create(context)
        const botContext = ctx.getContext<Context>()

        if (!botContext.from) {
            await botContext.reply('Не удалось получить информацию')
            return false
        }

        const driver = await this.driverService.findDriverByTelegramId(botContext.from.id)
        if (!driver) {
            await botContext.reply(this.messageService.driverNotFoundByTelegramId())
            return false
        }

        botContext.state.driver = driver
        return true
    }
}
