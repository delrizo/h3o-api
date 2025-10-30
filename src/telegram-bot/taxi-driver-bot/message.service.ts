import { Injectable } from '@nestjs/common'
import { ApplicationStatus, DriverStatus } from '~/constants'
import { START_MESSAGE } from './message/start.messages'
import { EMPLOYMENT_MESSAGE } from './message/employment.message'
import { REAPPLY_MESSAGE } from './message/reapply.message'
import { ERROR_MESSAGE } from './message/error.message'

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

    driverNotFoundByTelegramId() {
        return ERROR_MESSAGE.NOT_FOUND
    }
}
