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

    @ApiProperty({
        description: 'Array of Telegram photo objects in different sizes',
        example: [
            {
                file_id: 'AgACAgIAAxkBAAICRmkKCUz23hMRSdEkO97qmeBukx7HAAL4DWsbX25QSHsTpFYPbexoAQADAgADcwADNgQ',
                file_unique_id: 'AQAD-A1rG19uUEh4',
                file_size: 863,
                width: 90,
                height: 38
            },
            {
                file_id: 'AgACAgIAAxkBAAICRmkKCUz23hMRSdEkO97qmeBukx7HAAL4DWsbX25QSHsTpFYPbexoAQADAgADbQADNgQ',
                file_unique_id: 'AQAD-A1rG19uUEhy',
                file_size: 13202,
                width: 320,
                height: 134
            }
        ]
    })
    @Column({
        type: DataType.JSON, // Храним массив объектов с фото разных размеров
        allowNull: false
    })
    declare photos: Array<{
        file_id: string
        file_unique_id: string
        file_size: number
        width: number
        height: number
    }>

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
