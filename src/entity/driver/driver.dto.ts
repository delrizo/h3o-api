import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsOptional } from 'class-validator'
import { ApplicationTypeWithAll, DriverStatus } from '~/constants/shared'

export class GetDriversDto {
    @IsEnum(DriverStatus, { message: 'Invalid driver status' })
    @IsOptional()
    readonly driver_status?: DriverStatus

    @IsEnum(ApplicationTypeWithAll, { message: 'Invalid application type' })
    @IsOptional()
    readonly application_type?: ApplicationTypeWithAll
}

export class DriverUpdateDto {
    @ApiProperty({ enum: DriverStatus, description: 'Driver status' })
    @IsEnum(DriverStatus, { message: 'Invalid application status' })
    @IsOptional()
    readonly status?: DriverStatus
}
