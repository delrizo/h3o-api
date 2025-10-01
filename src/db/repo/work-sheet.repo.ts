import { Inject, Injectable } from '@nestjs/common'
import { WorkSheetModel } from '~/db/models'
import { BaseRepo } from '~/db/repo/base.repo'

@Injectable()
export class WorkSheetRepo extends BaseRepo<WorkSheetModel> {
    constructor(
        @Inject('TELEGRAM_REPO')
        private readonly workSheetModel: typeof WorkSheetModel
    ) {
        super(workSheetModel)
    }

    async getById(id: number) {
        return this.workSheetModel.findOne({
            where: { id }
        })
    }

    async getWithoutDriver() {
        return this.workSheetModel.findAll({
            where: {
                driverId: null
            }
        })
    }
}
