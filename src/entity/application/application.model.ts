import { Column, DataType, Model, Table, ForeignKey } from 'sequelize-typescript'
import { DriverModel } from '../driver/driver.model'
import { APPLICATION_STATUSES, APPLICATION_TYPES, ApplicationStatus, ApplicationType } from '~/constants/shared'
import { ApiProperty } from '@nestjs/swagger'

@Table({ tableName: 'applications' })
export class ApplicationModel extends Model {
    @ApiProperty({ example: 1, description: 'Telegram model id' })
    declare id: number

    @ApiProperty({ description: 'Telegram created date', type: Date })
    declare createdAt: Date

    @ApiProperty({ description: 'Telegram updated date', type: Date })
    declare updatedAt: Date

    @ApiProperty({ example: 1, description: 'Driver id' })
    @ForeignKey(() => DriverModel)
    @Column({ type: DataType.INTEGER, allowNull: false })
    declare driverId: number

    @ApiProperty({ enum: ApplicationType, description: 'Application type' })
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

    @ApiProperty({ enum: ApplicationStatus, description: 'Application status' })
    @Column({
        type: DataType.ENUM(...APPLICATION_STATUSES),
        allowNull: false,
        defaultValue: ApplicationStatus.PENDING,
        validate: {
            isIn: {
                args: [APPLICATION_STATUSES],
                msg: `status must be a valid (${APPLICATION_STATUSES.join(', ')})`
            }
        }
    })
    declare status: ApplicationStatus

    @ApiProperty({ example: 'message', description: 'Application message', required: false })
    @Column({ type: DataType.TEXT, allowNull: true })
    declare message?: string
}
