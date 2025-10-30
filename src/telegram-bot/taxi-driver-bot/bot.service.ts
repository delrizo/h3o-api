import { Injectable } from '@nestjs/common'
import { KeyboardService } from './keyboard.service'
import { MessageService } from './message.service'
import { DriverService } from '~/entity/driver/driver.service'
import { User } from 'telegraf/types'
import { ApplicationService } from '~/entity/application/application.service'
import { ApplicationStatus } from '~/constants'
import { ButtonService } from './button.service'

@Injectable()
export class BotService {
    constructor(
        private readonly keyboardService: KeyboardService,
        private readonly messageService: MessageService,
        private readonly buttonService: ButtonService,
        private readonly driverService: DriverService,
        private readonly applicationService: ApplicationService
    ) {}

    async startHandler(user: User) {
        const driver = await this.driverService.getDriverByTelegramId(user.id)

        if (!driver) {
            await this.driverService.createDriverWithTelegram({
                telegram_id: user.id,
                first_name: user.first_name ?? '',
                username: user.username ?? ''
            })
        }

        return {
            message: this.messageService.mainMenuStart(driver?.status),
            keyboard: this.keyboardService.mainMenu(driver?.status)
        }
    }

    async employmentHandler(user: User) {
        const driver = await this.driverService.findDriverByTelegramId(user.id)
        if (!driver) {
            return { message: this.messageService.driverNotFoundByTelegramId() }
        }

        const application = await this.applicationService.getDriverEmploymentApplication(driver.id)
        if (!application) {
            await this.applicationService.createEmploymentApplication(
                driver.id,
                `Заявка на трудоустройство от ${user.first_name} (@${user?.username})`
            )
        }

        const message = this.messageService.createEmployment(application?.status)

        if (
            application?.status &&
            (application.status === ApplicationStatus.APPROVED ||
                application.status === ApplicationStatus.REJECTED ||
                application.status === ApplicationStatus.ARCHIVED)
        ) {
            return {
                message,
                button: this.buttonService.reapplyEmploymentButton()
            }
        }

        return { message }
    }

    async reapplyEmploymentHandler(user: User) {
        const driver = await this.driverService.findDriverByTelegramId(user.id)
        if (!driver) {
            return { message: this.messageService.driverNotFoundByTelegramId() }
        }

        const application = await this.applicationService.getDriverEmploymentApplication(driver.id)
        if (!application) {
            await this.applicationService.createEmploymentApplication(
                driver.id,
                `Заявка на трудоустройство от ${user.first_name} (@${user?.username})`
            )
        }

        if (
            !application?.status ||
            application.status === ApplicationStatus.PENDING ||
            application.status === ApplicationStatus.IN_PROGRESS
        ) {
            return { message: this.messageService.createEmployment(application?.status) }
        }

        await this.applicationService.update(application.id, { status: ApplicationStatus.PENDING })

        return { message: this.messageService.reapplySuccess() }
    }

    async blockHandler(user: User) {
        const driver = await this.driverService.findDriverByTelegramId(user.id)
        if (!driver) {
            return { message: this.messageService.driverNotFoundByTelegramId() }
        }
    }
}
