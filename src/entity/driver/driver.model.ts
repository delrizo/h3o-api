import { Column, DataType, HasMany, HasOne, Model, Table } from 'sequelize-typescript'
import { DriverStatus, DRIVER_STATUSES } from '~/constants'
import { TelegramModel } from '~/entity/telegram/telegram.model'
import { WorkSheetModel } from '~/entity/work-sheet/work-sheet.model'
import { ApplicationModel } from '../application/application.model'

@Table({ tableName: 'drivers' })
export class DriverModel extends Model {
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

    @HasOne(() => TelegramModel)
    declare telegram: TelegramModel

    @HasOne(() => WorkSheetModel)
    declare worksheet: WorkSheetModel

    @HasMany(() => ApplicationModel)
    declare applications: ApplicationModel[]
}
