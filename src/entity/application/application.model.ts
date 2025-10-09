import { Column, DataType, Model, Table, ForeignKey } from 'sequelize-typescript'
import { DriverModel } from '../driver/driver.model'
import { APPLICATION_STATUSES, APPLICATION_TYPES, ApplicationStatus, ApplicationType } from '~/constants'

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
