import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { ApplicationStatus, APPLICATION_STATUSES, ApplicationSource, APPLICATION_SOURCES } from '~/constants'
import { DriverModel } from '~/db/models/driver.model'

@Table({ tableName: 'drivers' })
export class ApplicationModel extends Model {
    @ForeignKey(() => DriverModel)
    @Column({ type: DataType.INTEGER, allowNull: true })
    declare driverId: number

    @Column({
        type: DataType.ENUM(...APPLICATION_STATUSES),
        allowNull: false,
        validate: {
            isIn: {
                args: [APPLICATION_STATUSES],
                msg: `status must be a valid (${APPLICATION_STATUSES.join(', ')})`
            }
        }
    })
    declare status: ApplicationStatus

    @Column({
        type: DataType.ENUM(...APPLICATION_SOURCES),
        allowNull: false,
        validate: {
            isIn: {
                args: [APPLICATION_SOURCES],
                msg: `source must be a valid (${APPLICATION_SOURCES.join(', ')})`
            }
        }
    })
    declare source: ApplicationSource

    @Column({ type: DataType.STRING, allowNull: true })
    declare last_name: string

    @Column({ type: DataType.STRING, allowNull: false })
    declare first_name: string

    @Column({ type: DataType.STRING, allowNull: true })
    declare middle_name: string

    @Column({ type: DataType.STRING, allowNull: true })
    declare phone: string

    @Column({ type: DataType.BIGINT, allowNull: true })
    declare telegram_id: number

    @Column({ type: DataType.STRING, allowNull: true })
    declare telegram_first_name: string

    @Column({ type: DataType.STRING, allowNull: true })
    declare telegram_username: string
}
