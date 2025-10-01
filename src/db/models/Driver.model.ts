import { Column, DataType, HasOne, Model, Table } from 'sequelize-typescript'
import { Status, statuses } from '~/constants'
import { TelegramModel } from '~/db/models/telegram.model'
import { WorkSheetModel } from '~/db/models/work-sheet.model'

@Table({ tableName: 'drivers' })
export class DriverModel extends Model {
    @Column({
        type: DataType.ENUM(...statuses),
        allowNull: false,
        validate: {
            isIn: {
                args: [statuses],
                msg: `status must be a valid (${statuses.join(', ')})`
            }
        }
    })
    declare status: Status

    @HasOne(() => TelegramModel)
    declare telegram: TelegramModel

    @HasOne(() => WorkSheetModel)
    declare worksheet: WorkSheetModel
}
