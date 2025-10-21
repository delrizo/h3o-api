import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { WorkSheetModel } from './work-sheet.model'
import { DriverModel } from '../driver/driver.model'
import { WorkSheetUpdateDto } from './work-sheet.dto'

@Injectable()
export class WorkSheetService {
    constructor(
        @InjectModel(WorkSheetModel)
        private workSheetModel: typeof WorkSheetModel,
        @InjectModel(DriverModel)
        private driverModel: typeof DriverModel
    ) {}

    async create(driverId: number): Promise<WorkSheetModel> {
        const driver = await this.driverModel.findByPk(driverId)
        if (!driver) {
            throw new HttpException('Driver not found', HttpStatus.NOT_FOUND)
        }

        const existingWorksheet = await this.workSheetModel.findOne({
            where: { driverId }
        })

        if (existingWorksheet) {
            throw new HttpException('Worksheet already exists for this driver', HttpStatus.BAD_REQUEST)
        }

        return await this.workSheetModel.create({
            driverId
        })
    }

    async update(id: number, dto: WorkSheetUpdateDto): Promise<WorkSheetModel> {
        const worksheet = await this.workSheetModel.findByPk(id)

        if (!worksheet) {
            throw new HttpException('Worksheet not found', HttpStatus.NOT_FOUND)
        }

        return await worksheet.update(dto)
    }
}
