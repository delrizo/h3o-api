import { Column, DataType, Model, Table, ForeignKey } from 'sequelize-typescript'
import { DriverModel } from './driver'
import { APPLICATION_STATUSES, APPLICATION_TYPES, ApplicationStatus, ApplicationType, DriverStatus } from '~/constants'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'

@Table({ tableName: 'applications' })
export class ApplicationModel extends Model {
    @ForeignKey(() => DriverModel)
    @Column({ type: DataType.INTEGER, allowNull: false })
    declare driverId: number

    @Column({
        type: DataType.ENUM(...APPLICATION_TYPES),
        allowNull: false,
        validate: {
            isIn: {
                args: [APPLICATION_TYPES],
                msg: `status must be a valid (${APPLICATION_TYPES.join(', ')})`
            }
        }
    })
    declare type: ApplicationType

    @Column({
        type: DataType.ENUM(...APPLICATION_STATUSES),
        allowNull: false,
        defaultValue: ApplicationStatus.ONE,
        validate: {
            isIn: {
                args: [APPLICATION_STATUSES],
                msg: `status must be a valid (${APPLICATION_STATUSES.join(', ')})`
            }
        }
    })
    declare status: ApplicationStatus

    @Column({ type: DataType.TEXT, allowNull: true })
    declare message?: string

    @Column({ type: DataType.DATE, allowNull: true })
    declare processedAt: Date
}

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
            status: ApplicationStatus.ONE,
            message,
            processedAt: null
        })
    }

    // Проверить, есть ли активная заявка на employment
    async hasPendingEmploymentApplication(driverId: number): Promise<boolean> {
        const application = await this.applicationModel.findOne({
            where: {
                driverId,
                type: ApplicationType.EMPLOYMENT,
                status: ApplicationStatus.ONE // Ищем заявки со статусом ONE (необработанные)
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
