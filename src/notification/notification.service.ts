import { Injectable } from '@nestjs/common'
import { Telegraf } from 'telegraf'
import { InjectBot } from 'nestjs-telegraf'
import { DriverStatus } from '~/constants/shared'
import { MessageService } from '~/message/message.service'

@Injectable()
export class NotificationService {
    constructor(
        @InjectBot() private readonly bot: Telegraf,
        private readonly messageService: MessageService
    ) {}

    async notifyDriverStatusChange(telegramId: number, newStatus: DriverStatus) {
        const message = this.messageService.getStatusChangeMessage(newStatus)

        await this.bot.telegram.sendMessage(telegramId, message)
    }
}
