import { Module } from '@nestjs/common'
import { NotificationService } from '~/notification/notification.service'
import { MessageModule } from '~/message/message.module'
import { TelegrafModule } from 'nestjs-telegraf'

@Module({
    providers: [NotificationService],
    imports: [TelegrafModule, MessageModule],
    exports: [NotificationService]
})
export class NotificationModule {}
