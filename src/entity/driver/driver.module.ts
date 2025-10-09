import { SequelizeModule } from '@nestjs/sequelize'
import { Module } from '@nestjs/common'
import { DriverModel } from './driver.model'
import { DriverController } from './driver.controller'
import { DriverService } from './driver.service'
import { TelegramModel } from '../telegram/telegram.model'
import { WorkSheetModel } from '../work-sheet/work-sheet.model'

@Module({
    controllers: [DriverController],
    providers: [DriverService],
    imports: [SequelizeModule.forFeature([DriverModel, TelegramModel, WorkSheetModel])],
    exports: [DriverService]
})
export class DriverModule {}
