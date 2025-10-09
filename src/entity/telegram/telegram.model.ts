import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { DriverModel } from '~/entity/driver/driver.model'

@Table({ tableName: 'telegrams' })
export class TelegramModel extends Model {
    @ForeignKey(() => DriverModel)
    @Column({ type: DataType.INTEGER, allowNull: true })
    declare driverId: number

    @Column({ type: DataType.BIGINT, allowNull: false, unique: true })
    declare telegram_id: number

    @Column({ type: DataType.STRING, allowNull: false })
    declare first_name: string

    @Column({ type: DataType.STRING, allowNull: false })
    declare username: string
}
