import { Module } from '@nestjs/common'
import { TelegrafModule } from 'nestjs-telegraf'
import { BotService } from './bot.service'
import { BotUpdate } from './bot.update'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { session } from 'telegraf'
import { DriverModel } from '~/entity/driver/driver.model'
import { SequelizeModule } from '@nestjs/sequelize'
import { TelegramModel } from '~/entity/telegram/telegram.model'
import { ApplicationModel } from '~/entity/application/application.model'
import { DriverService } from '~/entity/driver/driver.service'
import { DriverModule } from '~/entity/driver/driver.module'
import { ApplicationModule } from '~/entity/application/application.module'
import { ApplicationService } from '~/entity/application/application.service'
import { MessageService } from './message.service'
import { KeyboardService } from './keyboard.service'
import { ButtonService } from './button.service'

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
        SequelizeModule.forFeature([DriverModel, TelegramModel, ApplicationModel]),
        DriverModule,
        ApplicationModule
    ],
    providers: [BotService, BotUpdate, DriverService, ApplicationService, MessageService, KeyboardService, ButtonService]
})
export class BotModule {}
