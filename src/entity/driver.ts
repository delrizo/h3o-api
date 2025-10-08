import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Column, DataType, HasOne, Model, Table } from 'sequelize-typescript'
import { DriverStatus, DRIVER_STATUSES } from '~/constants'
import { TelegramModel } from '~/entity/telegram'
import { WorkSheetModel } from '~/entity/work-sheet'

@Table({ tableName: 'drivers' })
export class DriverModel extends Model {
    @Column({
        type: DataType.ENUM(...DRIVER_STATUSES),
        allowNull: false,
        validate: {
            isIn: {
                args: [DRIVER_STATUSES],
                msg: `status must be a valid (${DRIVER_STATUSES.join(', ')})`
            }
        }
    })
    declare status: DriverStatus

    @HasOne(() => TelegramModel)
    declare telegram: TelegramModel

    @HasOne(() => WorkSheetModel)
    declare worksheet: WorkSheetModel
}

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
}
