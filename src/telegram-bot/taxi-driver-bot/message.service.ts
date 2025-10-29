import { Injectable } from '@nestjs/common'
import { ApplicationStatus, DriverStatus } from '~/constants'
import { START_MESSAGE } from './message/start.messages'
import { EMPLOYMENT_MESSAGE } from './message/employment.message'

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
}
