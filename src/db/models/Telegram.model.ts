import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { DriverModel } from '~/db/models/driver.model'

@Table({ tableName: 'telegrams' })
export class TelegramModel extends Model {
    @ForeignKey(() => DriverModel)
    @Column({ type: DataType.INTEGER, allowNull: true })
    declare driverId: number

    @Column({ type: DataType.BIGINT, allowNull: false })
    declare telegram_id: number

    @Column({ type: DataType.STRING, allowNull: true })
    declare first_name: string

    @Column({ type: DataType.STRING, allowNull: false })
    declare username: string
}
