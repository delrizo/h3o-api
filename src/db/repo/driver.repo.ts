import { Inject, Injectable } from '@nestjs/common'
import { DriverModel } from '~/db/models'
import { BaseRepo } from '~/db/repo/base.repo'
import { Op } from 'sequelize'

@Injectable()
export class DriverRepo extends BaseRepo<DriverModel> {
    constructor(
        @Inject('DRIVER_REPO')
        private readonly driverModel: typeof DriverModel
    ) {
        super(driverModel)
    }

    async getById(id: number) {
        return this.driverModel.findOne({
            where: { id }
        })
    }

    async getWithoutTelegram() {
        return this.driverModel.findAll({
            include: [
                {
                    model: this.driverModel.associations.telegram.target,
                    required: false
                }
            ],
            where: {
                '$telegram.driverId$': null
            }
        })
    }

    async getWithoutWorksheet() {
        return this.driverModel.findAll({
            include: [
                {
                    model: this.driverModel.associations.worksheet.target,
                    required: false
                }
            ],
            where: {
                '$worksheet.driverId$': null
            }
        })
    }

    async getWithoutTelegramAndWorksheet() {
        return this.driverModel.findAll({
            include: [
                {
                    model: this.driverModel.associations.telegram.target,
                    required: false
                },
                {
                    model: this.driverModel.associations.worksheet.target,
                    required: false
                }
            ],
            where: {
                [Op.and]: [{ '$telegram.driverId$': null }, { '$worksheet.driverId$': null }]
            }
        })
    }
}
