import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { DriverModel } from '~/db/models/driver.model'

@Table({ tableName: 'telegrams' })
export class TelegramModel extends Model {
    @ForeignKey(() => DriverModel)
    @Column({ type: DataType.INTEGER, allowNull: true })
    driverId: number

    @Column({ type: DataType.NUMBER, allowNull: false })
    telegram_id: number

    @Column({ type: DataType.STRING, allowNull: true })
    first_name: string

    @Column({ type: DataType.STRING, allowNull: false })
    username: string
}
