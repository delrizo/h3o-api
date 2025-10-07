import { Injectable } from '@nestjs/common'
import { TelegramModelDto } from '~/db/models/telegram.model'
import { TelegramRepo } from '~/db/repo/telegram.repo'

@Injectable()
export class TelegramService {
    constructor(private telegramRepo: TelegramRepo) {}

    create({ telegram_id, username, first_name }: TelegramModelDto) {
        return this.telegramRepo.create({
            telegram_id,
            first_name,
            username
        })
    }
}
