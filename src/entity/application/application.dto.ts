import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsOptional } from 'class-validator'
import { ApplicationStatus } from '~/constants/shared'

export class ApplicationUpdateDto {
    @ApiProperty({ enum: ApplicationStatus, description: 'Application status' })
    @IsEnum(ApplicationStatus, { message: 'Invalid application status' })
    @IsOptional()
    readonly status?: ApplicationStatus
}
