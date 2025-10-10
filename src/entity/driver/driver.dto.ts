import { IsEnum, IsOptional } from 'class-validator'
import { ApplicationType, DriverStatus } from '~/constants'

export class GetDriversDto {
    @IsEnum(DriverStatus, { message: 'Invalid driver status' })
    @IsOptional()
    driver_status?: DriverStatus

    @IsEnum(ApplicationType, { message: 'Invalid application type' })
    @IsOptional()
    application_type?: ApplicationType
}
