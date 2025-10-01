import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { DriverModel } from '~/db/models/driver.model'

@Table({ tableName: 'worksheets' })
export class WorkSheetModel extends Model {
    @ForeignKey(() => DriverModel)
    @Column({ type: DataType.INTEGER, allowNull: true })
    driverId: number

    @Column({ type: DataType.STRING, allowNull: false })
    last_name: string

    @Column({ type: DataType.STRING, allowNull: false })
    first_name: string

    @Column({ type: DataType.STRING, allowNull: true })
    middle_name: string
}
