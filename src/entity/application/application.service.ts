import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { ApplicationModel } from './application.model'
import { ApplicationStatus, ApplicationType, DriverStatus } from '~/constants'

@Injectable()
export class ApplicationService {
    constructor(
        @InjectModel(ApplicationModel)
        private applicationModel: typeof ApplicationModel
    ) {}

    // Проверить, может ли водитель оставить заявку на employment
    canCreateEmploymentApplication(driverStatus: DriverStatus): boolean {
        // Например, только водители со статусом ONE могут оставлять заявку на employment
        return driverStatus === DriverStatus.ONE
    }

    // Создать заявку на employment
    async createEmploymentApplication(driverId: number, message?: string): Promise<ApplicationModel> {
        return this.applicationModel.create({
            driverId,
            type: ApplicationType.EMPLOYMENT,
            message,
            processedAt: null
        })
    }

    // Проверить, есть ли заявка в ожидании на employment
    async hasPendingEmploymentApplication(driverId: number): Promise<boolean> {
        const application = await this.applicationModel.findOne({
            where: {
                driverId,
                type: ApplicationType.EMPLOYMENT,
                status: ApplicationStatus.PENDING // Ищем заявки со статусом ONE (необработанные)
            }
        })

        return !!application
    }

    // Получить заявки водителя
    async getDriverApplications(driverId: number): Promise<ApplicationModel[]> {
        return this.applicationModel.findAll({
            where: { driverId },
            order: [['createdAt', 'DESC']]
        })
    }

    // Получить заявку по ID
    async getApplicationById(id: number): Promise<ApplicationModel | null> {
        return this.applicationModel.findByPk(id)
    }
}
