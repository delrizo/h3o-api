import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { DriverModel } from './driver.model'
import { TelegramModel } from '../telegram/telegram.model'
import { ApplicationTypeWithAll, DriverStatus } from '~/constants'
import { WorkSheetModel } from '../work-sheet/work-sheet.model'
import { ApplicationModel } from '../application/application.model'
import { DriverUpdateDto, GetDriversDto } from './driver.dto'
import { Includeable, WhereOptions } from 'sequelize'

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

    async getDriverByTelegramId(telegramId: number): Promise<DriverModel | null> {
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

    async getDrivers(dto: GetDriversDto): Promise<DriverModel[]> {
        const whereDriver: WhereOptions<DriverModel> = {}

        if (dto.driver_status) {
            whereDriver.status = dto.driver_status
        }

        const include: Includeable[] = [
            {
                model: TelegramModel,
                required: false
            },
            {
                model: WorkSheetModel,
                required: false
            }
        ]

        if (dto.application_type && dto.application_type === ApplicationTypeWithAll.ALL) {
            include.push({
                model: ApplicationModel,
                required: true // Только водители с заявками
            })
        } else if (dto.application_type && dto.application_type) {
            include.push({
                model: ApplicationModel,
                where: { type: dto.application_type },
                required: true // Только водители с заявками этого типа
            })
        } else {
            include.push({
                model: ApplicationModel,
                required: false // Если application_type нет - водители с заявками и без
            })
        }

        return this.driverModel.findAll({
            where: whereDriver,
            include
        })

        // const whereDriver: WhereOptions<DriverModel> = {}
        // const whereApplication: WhereOptions<ApplicationModel> = {}

        // if (dto.driver_status) {
        //     whereDriver.status = dto.driver_status
        // }

        // if (dto.application_type && dto.application_type !== ApplicationTypeWithAll.ALL) {
        //     whereApplication.type = dto.application_type
        // }

        // return this.driverModel.findAll({
        //     where: whereDriver,
        //     include: [
        //         {
        //             model: TelegramModel,
        //             required: false
        //         },
        //         {
        //             model: WorkSheetModel,
        //             required: false
        //         },
        //         {
        //             model: ApplicationModel,
        //             where: whereApplication,
        //             required: isNotEmptyObject(whereApplication)
        //         }
        //     ]
        // })
    }

    async update(id: number, dto: DriverUpdateDto) {
        const driver = await this.driverModel.findByPk(id)

        if (!driver) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND)
        }

        return await driver.update(dto)
    }
}
