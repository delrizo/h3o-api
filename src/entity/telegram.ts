import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { IsNumber, IsOptional, IsString } from 'class-validator'
import { DriverModel } from '~/entity/driver'
import { ApiProperty } from '@nestjs/swagger'

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

export class TelegramModelDto {
    @ApiProperty({ example: 5232323, description: 'Telegram ID' })
    @IsNumber({}, { message: 'Must be a number' })
    readonly telegram_id: number

    @ApiProperty({ example: 'FirstName', description: 'Telegram First Name' })
    @IsOptional()
    @IsString({ message: 'Must be a string' })
    readonly first_name: string

    @ApiProperty({ example: 'userName', description: 'Telegram Username' })
    @IsString({ message: 'Must be a string' })
    readonly username: string
}
