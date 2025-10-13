import { ApiProperty } from '@nestjs/swagger'
import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { DriverModel } from '~/entity/driver/driver.model'

@Table({ tableName: 'telegrams' })
export class TelegramModel extends Model {
    @ApiProperty({ example: 1, description: 'Telegram model id' })
    declare id: number

    @ApiProperty({ description: 'Telegram created date', type: Date })
    declare createdAt: Date

    @ApiProperty({ description: 'Telegram updated date', type: Date })
    declare updatedAt: Date

    @ApiProperty({ example: 1, description: 'Driver id' })
    @ForeignKey(() => DriverModel)
    @Column({ type: DataType.INTEGER, allowNull: true })
    declare driverId: number

    @ApiProperty({ example: 1, description: 'Telegram id' })
    @Column({ type: DataType.BIGINT, allowNull: false, unique: true })
    declare telegram_id: number

    @ApiProperty({ example: 'Alex', description: 'Telegram first name' })
    @Column({ type: DataType.STRING, allowNull: false })
    declare first_name: string

    @ApiProperty({ example: 'alex', description: 'Telegram username' })
    @Column({ type: DataType.STRING, allowNull: false })
    declare username: string
}
