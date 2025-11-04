import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { CheckModel } from './check.model'
import { DriverModel } from '../driver/driver.model'

@Injectable()
export class CheckService {
    constructor(
        @InjectModel(CheckModel)
        private checkModel: typeof CheckModel
    ) {}

    createTelegramCheck(driver: DriverModel, photo: Buffer) {
        return this.checkModel.create({
            driverId: driver.id,
            photo,
            comment: 'Загружен через телеграм бота'
        })
    }
}
