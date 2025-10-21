import { ApiProperty } from '@nestjs/swagger'
import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { DriverModel } from '~/entity/driver/driver.model'

@Table({ tableName: 'worksheets' })
export class WorkSheetModel extends Model {
    @ApiProperty({ example: 1, description: 'Worksheet model id' })
    declare id: number

    @ApiProperty({ example: 1, description: 'Driver id' })
    @ForeignKey(() => DriverModel)
    @Column({ type: DataType.INTEGER, allowNull: false })
    declare driverId: number

    @ApiProperty({ example: 'Lastname', description: 'Last name' })
    @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
    declare last_name: string

    @ApiProperty({ example: 'Firstname', description: 'First name' })
    @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
    declare first_name: string

    @ApiProperty({ example: 'Middlename', description: 'Middle name' })
    @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
    declare middle_name: string
}
