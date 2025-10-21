import { SequelizeModule } from '@nestjs/sequelize'
import { Module } from '@nestjs/common'
import { WorkSheetController } from './work-sheet.controller'
import { WorkSheetService } from './work-sheet.service'
import { WorkSheetModel } from './work-sheet.model'
import { DriverModel } from '../driver/driver.model'

@Module({
    controllers: [WorkSheetController],
    providers: [WorkSheetService],
    imports: [SequelizeModule.forFeature([WorkSheetModel, DriverModel])],
    exports: [WorkSheetService]
})
export class WorkSheetModule {}
