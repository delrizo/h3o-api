import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { DriverStatus } from '~/constants/shared'
import { BotService } from '~/telegram-bot/taxi-driver-bot/bot.service'

@Injectable()
export class NotificationService {
    constructor(
        @Inject(forwardRef(() => BotService))
        private readonly botService: BotService
    ) {}

    async notifyDriverStatusChange(telegramId: number, newStatus: DriverStatus) {
        await this.botService.driverStatusChange(telegramId, newStatus)
    }
}
