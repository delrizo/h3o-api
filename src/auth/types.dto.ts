import { IsEmail, IsString, Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class TokenResponseDto {
    constructor(accessToken: string, refreshToken: string) {
        this.accessToken = accessToken
        this.refreshToken = refreshToken
    }

    @ApiProperty({ example: '', description: 'Refresh JWT Token' })
    @IsString({ message: 'Must be a string' })
    readonly accessToken: string

    @ApiProperty({ example: '', description: 'Refresh JWT Token' })
    @IsString({ message: 'Must be a string' })
    readonly refreshToken: string
}

export class UserDto {
    @ApiProperty({ example: 'john.doe@email.com', description: 'Email' })
    @IsString({ message: 'Must be a string' })
    @IsEmail({}, { message: 'Incorrect email' })
    readonly email: string

    @ApiProperty({ example: '12345678', description: 'Password' })
    @IsString({ message: 'Must be a string' })
    @Length(8, 24, { message: 'Not less than 8 and not more than 24' })
    readonly password: string
}

export class RefreshDto {
    @ApiProperty({ example: '', description: 'Refresh JWT Token' })
    @IsString({ message: 'Must be a string' })
    readonly refreshToken: string
}
