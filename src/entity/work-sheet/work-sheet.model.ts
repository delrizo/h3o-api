import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { DriverModel } from '~/entity/driver/driver.model'

@Table({ tableName: 'worksheets' })
export class WorkSheetModel extends Model {
    @ForeignKey(() => DriverModel)
    @Column({ type: DataType.INTEGER, allowNull: true })
    declare driverId: number

    @Column({ type: DataType.STRING, allowNull: false })
    declare last_name: string

    @Column({ type: DataType.STRING, allowNull: false })
    declare first_name: string

    @Column({ type: DataType.STRING, allowNull: true })
    declare middle_name: string
}
