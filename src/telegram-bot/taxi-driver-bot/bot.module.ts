import { Module } from '@nestjs/common'
import { TelegrafModule } from 'nestjs-telegraf'
import { BotService } from './bot.service'
import { BotUpdate } from './bot.update'
import { DriverModel } from '~/entity/driver/driver.model'
import { SequelizeModule } from '@nestjs/sequelize'
import { TelegramModel } from '~/entity/telegram/telegram.model'
import { ApplicationModel } from '~/entity/application/application.model'
import { DriverModule } from '~/entity/driver/driver.module'
import { ApplicationModule } from '~/entity/application/application.module'
import { ApplicationService } from '~/entity/application/application.service'
import { KeyboardService } from './keyboard.service'
import { ButtonService } from './button.service'
import { MessageModule } from '~/message/message.module'

@Module({
    imports: [
        TelegrafModule,
        SequelizeModule.forFeature([DriverModel, TelegramModel, ApplicationModel]),
        DriverModule,
        ApplicationModule,
        MessageModule
    ],
    providers: [BotService, BotUpdate, ApplicationService, KeyboardService, ButtonService]
})
export class BotModule {}
