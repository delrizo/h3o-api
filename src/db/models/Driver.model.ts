import { Column, DataType, HasOne, Model, Table } from 'sequelize-typescript'
import { Status, statuses } from '~/constants'
import { TelegramModel } from '~/db/models/Telegram.model'

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
    status: Status

    @HasOne(() => TelegramModel)
    telegram: TelegramModel
}
