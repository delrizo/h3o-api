import { ApiProperty } from '@nestjs/swagger'
import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { DriverModel } from '~/entity/driver/driver.model'
import { ApplicationStatus } from '~/constants/shared'

@Table({ tableName: 'checks' })
export class CheckModel extends Model {
    @ApiProperty({ example: 1, description: 'Check id' })
    declare id: number

    @ApiProperty({ description: 'Check created date', type: Date })
    declare createdAt: Date

    @ApiProperty({ description: 'Check updated date', type: Date })
    declare updatedAt: Date

    @ApiProperty({ example: 1, description: 'Driver id' })
    @ForeignKey(() => DriverModel)
    @Column({ type: DataType.INTEGER, allowNull: false })
    declare driverId: number

    @ApiProperty({ description: 'Original photo binary data', type: String })
    @Column({
        type: DataType.BLOB('long'),
        allowNull: false
    })
    declare photo: Buffer

    @ApiProperty({ enum: ApplicationStatus, description: 'Check status' })
    @Column({
        type: DataType.ENUM(...Object.values(ApplicationStatus)),
        allowNull: false,
        defaultValue: ApplicationStatus.PENDING
    })
    declare status: ApplicationStatus

    @ApiProperty({ example: 'Загружен через бота', description: 'Комментарий к чеку' })
    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    declare comment: string | null
}
