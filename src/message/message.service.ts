import { Injectable } from '@nestjs/common'
import { ApplicationStatus, DriverStatus } from '~/constants/shared'
import { START_MESSAGE } from '~/constants/message/start.message'
import { EMPLOYMENT_MESSAGE } from '~/constants/message/employment.message'
import { REAPPLY_MESSAGE } from '~/constants/message/reapply.message'
import { ERROR_MESSAGE } from '~/constants/message/error.message'
import { BLOCK_MESSAGE } from '~/constants/message/block.message'
import { STATUS_MESSAGE } from '~/constants/message/status.message'

@Injectable()
export class MessageService {
    mainMenuStart(status?: DriverStatus) {
        if (status) {
            return START_MESSAGE[status]
        }

        return START_MESSAGE.FIRST
    }

    createEmployment(status?: ApplicationStatus) {
        if (status) {
            return EMPLOYMENT_MESSAGE[status]
        }

        return EMPLOYMENT_MESSAGE.CREATED
    }

    reapplySuccess() {
        return REAPPLY_MESSAGE.REAPPLY_SUCCESS
    }

    telegramNotFound(who: 'from' | 'driver') {
        switch (who) {
            case 'driver':
                return ERROR_MESSAGE.NOT_FOUND_DRIVER_BY_TELEGRAM_USER_INFO
            default:
                return ERROR_MESSAGE.NOT_FOUND_TELEGRAM_USER_INFO
        }
    }

    blockDetails() {
        return BLOCK_MESSAGE.BASE
    }

    getStatusChangeMessage(status: DriverStatus) {
        return `${STATUS_MESSAGE.DRIVER.CHANGE} ${STATUS_MESSAGE.DRIVER[status]}`
    }
}
