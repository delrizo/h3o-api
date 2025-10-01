import { Inject, Injectable } from '@nestjs/common'
import { TelegramModel } from '~/db/models'
import { BaseRepo } from '~/db/repo/base.repo'

@Injectable()
export class TelegramRepo extends BaseRepo<TelegramModel> {
    constructor(
        @Inject('TELEGRAM_REPO')
        private readonly telegramModel: typeof TelegramModel
    ) {
        super(telegramModel)
    }

    async getById(telegram_id: number) {
        return this.telegramModel.findOne({
            where: { telegram_id }
        })
    }

    async getWithoutDriver() {
        return this.telegramModel.findAll({
            where: {
                driverId: null
            }
        })
    }
}
