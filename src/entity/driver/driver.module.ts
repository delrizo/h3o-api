import { SequelizeModule } from '@nestjs/sequelize'
import { Module } from '@nestjs/common'
import { DriverModel } from './driver.model'
import { DriverController } from './driver.controller'
import { DriverService } from './driver.service'
import { TelegramModel } from '../telegram/telegram.model'
import { WorkSheetModel } from '../work-sheet/work-sheet.model'
import { ApplicationModel } from '../application/application.model'
import { CheckModel } from '../check/check.model'
import { NotificationModule } from '~/notification/notification.module'

@Module({
    controllers: [DriverController],
    providers: [DriverService],
    imports: [SequelizeModule.forFeature([DriverModel, TelegramModel, WorkSheetModel, ApplicationModel, CheckModel]), NotificationModule],
    exports: [DriverService]
})
export class DriverModule {}
