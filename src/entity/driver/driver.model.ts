import { Column, DataType, HasMany, HasOne, Model, Table } from 'sequelize-typescript'
import { DriverStatus, DRIVER_STATUSES } from '~/constants'
import { TelegramModel } from '~/entity/telegram/telegram.model'
import { WorkSheetModel } from '~/entity/work-sheet/work-sheet.model'
import { ApplicationModel } from '../application/application.model'
import { ApiProperty } from '@nestjs/swagger'

@Table({ tableName: 'drivers' })
export class DriverModel extends Model {
    @ApiProperty({ example: 1, description: 'Driver id' })
    declare id: number

    @ApiProperty({ description: 'Driver created date', type: Date })
    declare createdAt: Date

    @ApiProperty({ description: 'Driver updated date', type: Date })
    declare updatedAt: Date

    @ApiProperty({ enum: DriverStatus, description: 'Driver status' })
    @Column({
        type: DataType.ENUM(...DRIVER_STATUSES),
        allowNull: false,
        validate: {
            isIn: {
                args: [DRIVER_STATUSES],
                msg: `status must be a valid (${DRIVER_STATUSES.join(', ')})`
            }
        }
    })
    declare status: DriverStatus

    @ApiProperty({ description: 'Driver Telegram', type: TelegramModel, nullable: true })
    @HasOne(() => TelegramModel)
    declare telegram: TelegramModel | null

    @ApiProperty({ description: 'Driver worksheet', type: WorkSheetModel, nullable: true })
    @HasOne(() => WorkSheetModel)
    declare worksheet: WorkSheetModel | null

    @ApiProperty({ description: 'Driver applications', type: [ApplicationModel] })
    @HasMany(() => ApplicationModel)
    declare applications: ApplicationModel[]
}
