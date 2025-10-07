import { SequelizeModule } from '@nestjs/sequelize'
import { Module } from '@nestjs/common'
import { TelegramModel } from '~/db/models/telegram.model'
import { TelegramController } from '~/modules/telegram/telegram.controller'
import { TelegramService } from '~/modules/telegram/telegram.service'
import { TelegramRepo } from '~/db/repo/telegram.repo'

@Module({
    controllers: [TelegramController],
    providers: [TelegramService, TelegramRepo],
    imports: [SequelizeModule.forFeature([TelegramModel])],
    exports: [TelegramService, TelegramRepo]
})
export class TelegramModule {}
