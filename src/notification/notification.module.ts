import { forwardRef, Module } from '@nestjs/common'
import { NotificationService } from '~/notification/notification.service'
import { BotModule } from '~/telegram-bot/taxi-driver-bot/bot.module'

@Module({
    providers: [NotificationService],
    imports: [forwardRef(() => BotModule)],
    exports: [NotificationService]
})
export class NotificationModule {}
