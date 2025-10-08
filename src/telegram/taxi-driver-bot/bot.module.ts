import { Module } from '@nestjs/common'
import { TelegrafModule } from 'nestjs-telegraf'
import { BotService } from './bot.service'
import { BotUpdate } from './bot.update'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { session } from 'telegraf'
import { DriverModel, DriverService } from '~/entity/driver'
import { SequelizeModule } from '@nestjs/sequelize'
import { TelegramModel } from '~/entity/telegram'
import { ApplicationModel, ApplicationService } from '~/entity/application'

@Module({
    imports: [
        TelegrafModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                token: configService.get<string>('TELEGRAM_BOT_TOKEN')!,
                middlewares: [session()],
                include: [BotModule]
            }),
            inject: [ConfigService]
        }),
        SequelizeModule.forFeature([DriverModel, TelegramModel, ApplicationModel])
    ],
    providers: [BotService, BotUpdate, DriverService, ApplicationService]
})
export class BotModule {}
