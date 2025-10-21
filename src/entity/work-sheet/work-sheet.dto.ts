import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional } from 'class-validator'

export class WorkSheetUpdateDto {
    @ApiProperty({ example: 'Lastname', description: 'Last name', required: false })
    @IsOptional()
    @IsString()
    last_name?: string

    @ApiProperty({ example: 'Firstname', description: 'First name', required: false })
    @IsOptional()
    @IsString()
    first_name?: string

    @ApiProperty({ example: 'Middlename', description: 'Middle name', required: false })
    @IsOptional()
    @IsString()
    middle_name?: string
}
