import { ConfigModuleRoot } from '~/config.module.root'
import { SequelizeModule } from '@nestjs/sequelize'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { DriverModel } from '~/entity/driver/driver.model'
import { TelegramModel } from '~/entity/telegram/telegram.model'
import { WorkSheetModel } from '~/entity/work-sheet/work-sheet.model'
import { AuthModule } from '~/auth/auth.module'
import { BotModule } from './telegram-bot/taxi-driver-bot/bot.module'
import { ApplicationModel } from './entity/application/application.model'
import { DriverModule } from './entity/driver/driver.module'
import { WorkSheetModule } from './entity/work-sheet/work-sheet.module'

@Module({
    imports: [
        ConfigModuleRoot,
        JwtModule.register({
            global: true,
            secret: process.env.SECRET_KEY,
            signOptions: { expiresIn: '1h' }
        }),
        SequelizeModule.forRoot({
            password: process.env.POSTGRES_PASSWORD,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            database: process.env.POSTGRES_DB,
            host: process.env.NODE_ENV === 'development' ? process.env.POSTGRES_DEV_HOST : process.env.POSTGRES_PROD_HOST,
            autoLoadModels: true,
            dialect: 'postgres',
            logging: false,
            timezone: '+03:00', // Временная зона Минска (UTC+3)
            dialectOptions: {
                useUTC: false // Отключаем использование UTC
            },
            models: [DriverModel, TelegramModel, WorkSheetModel, ApplicationModel]
        }),
        AuthModule,
        DriverModule,
        WorkSheetModule,
        BotModule
    ]
})
export class RootModule {}
