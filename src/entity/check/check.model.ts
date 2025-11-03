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

    @ApiProperty({ description: 'Check photo binary data', type: String })
    @Column({
        type: DataType.BLOB('long'), // Используем BLOB для хранения бинарных данных
        allowNull: false
    })
    declare photoData: Buffer

    @ApiProperty({ example: 'photo.jpg', description: 'Original file name' })
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare fileName: string

    @ApiProperty({ example: 1024, description: 'File size in bytes' })
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare fileSize: number

    @ApiProperty({ example: 'image/jpeg', description: 'MIME type' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: 'image/jpeg'
    })
    declare mimeType: string

    @ApiProperty({ enum: ApplicationStatus, description: 'Check status' })
    @Column({
        type: DataType.ENUM(...Object.values(ApplicationStatus)),
        allowNull: false,
        defaultValue: ApplicationStatus.PENDING
    })
    declare status: ApplicationStatus

    @ApiProperty({ example: 'CHECK_123', description: 'Check unique identifier' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    declare checkCode: string

    @ApiProperty({ example: 'jpg', description: 'File extension' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: 'jpg'
    })
    declare fileExtension: string

    @ApiProperty({ example: 'Загружен через бота', description: 'Комментарий к чеку' })
    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    declare comment: string | null
}
