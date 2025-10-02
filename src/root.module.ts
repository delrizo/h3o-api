import { ConfigModuleRoot } from '~/config.module.root'
import { SequelizeModule } from '@nestjs/sequelize'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { DriverModel, ApplicationModel, TelegramModel, WorkSheetModel } from '~/db/models'
import { AuthModule } from '~/auth/auth.module'

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
            models: [DriverModel, ApplicationModel, TelegramModel, WorkSheetModel]
        }),
        AuthModule
    ]
})
export class RootModule {}
