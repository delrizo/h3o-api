import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { DriverModel } from './driver.model'
import { TelegramModel } from '../telegram/telegram.model'
import { DriverStatus } from '~/constants'
import { WorkSheetModel } from '../work-sheet/work-sheet.model'

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

    async getDrivers(status?: DriverStatus): Promise<DriverModel[]> {
        const whereCondition: any = {}

        if (status) {
            whereCondition.status = status
        }

        return this.driverModel.findAll({
            where: whereCondition,
            include: [
                {
                    model: TelegramModel,
                    required: false // false чтобы включить водителей без Telegram
                },
                {
                    model: WorkSheetModel,
                    required: false // false чтобы включить водителей без рабочего листа
                }
            ]
        })
    }
}
