import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { DriverModel } from './driver.model'
import { TelegramModel } from '../telegram/telegram.model'
import { DriverStatus } from '~/constants'
import { WorkSheetModel } from '../work-sheet/work-sheet.model'
import { ApplicationModel } from '../application/application.model'
import { DriverUpdateDto, GetDriversDto } from './driver.dto'
import { WhereOptions } from 'sequelize'
import { isNotEmptyObject } from 'class-validator'

@Injectable()
export class DriverService {
    constructor(
        @InjectModel(DriverModel)
        private driverModel: typeof DriverModel,
        @InjectModel(TelegramModel)
        private telegramModel: typeof TelegramModel
    ) {}

    async findDriverByTelegramId(telegramId: number): Promise<DriverModel | null> {
        return this.driverModel.findOne({
            include: [
                {
                    model: TelegramModel,
                    where: { telegram_id: telegramId },
                    required: true
                }
            ]
        })
    }

    async createDriverWithTelegram(telegramData: { telegram_id: number; first_name: string; username: string }): Promise<DriverModel> {
        const transaction = await this.driverModel.sequelize?.transaction()

        try {
            // Создаем водителя
            const driver = await this.driverModel.create(
                {
                    status: DriverStatus.ONE
                },
                { transaction }
            )

            // Создаем запись в Telegram
            await this.telegramModel.create(
                {
                    ...telegramData,
                    driverId: driver.id
                },
                { transaction }
            )

            await transaction?.commit()

            return driver
        } catch (error) {
            await transaction?.rollback()

            throw error
        }
    }

    async isDriverExists(telegramId: number): Promise<boolean> {
        const telegram = await this.telegramModel.findOne({
            where: { telegram_id: telegramId }
        })

        return !!telegram
    }

    async getDrivers(dto: GetDriversDto): Promise<DriverModel[]> {
        const whereDriver: WhereOptions<DriverModel> = {}
        const whereApplication: WhereOptions<ApplicationModel> = {}

        if (dto.driver_status) {
            whereDriver.status = dto.driver_status
        }

        if (dto.application_type) {
            whereApplication.type = dto.application_type
        }

        return this.driverModel.findAll({
            where: whereDriver,
            include: [
                {
                    model: TelegramModel,
                    required: false
                },
                {
                    model: WorkSheetModel,
                    required: false
                },
                {
                    model: ApplicationModel,
                    where: whereApplication,
                    required: isNotEmptyObject(whereApplication)
                }
            ]
        })
    }

    async update(id: number, dto: DriverUpdateDto) {
        const driver = await this.driverModel.findByPk(id)

        if (!driver) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND)
        }

        return await driver.update(dto)
    }
}
