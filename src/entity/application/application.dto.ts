import { IsEnum, IsOptional } from 'class-validator'
import { ApplicationStatus, ApplicationType } from '~/constants'

export class ApplicationUpdateDto {
    @IsEnum(ApplicationType, { message: 'Invalid application type' })
    @IsOptional()
    readonly type?: ApplicationType

    @IsEnum(ApplicationStatus, { message: 'Invalid application status' })
    @IsOptional()
    readonly status?: ApplicationStatus
}
