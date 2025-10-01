import { Body, Controller, Post } from '@nestjs/common'
import { RefreshDto, TokenResponseDto, UserDto } from '~/auth/types.dto'
import { ApiResponse } from '@nestjs/swagger'
import { AuthService } from '~/auth/auth.service'

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiResponse({
        status: 200,
        description: 'Successful login',
        type: TokenResponseDto
    })
    @Post('login')
    login(@Body() body: UserDto) {
        this.authService.validateUser(body.email, body.password)

        return this.authService.login(body.email)
    }

    @ApiResponse({
        status: 200,
        description: 'Successful refresh',
        type: TokenResponseDto
    })
    @Post('refresh')
    refresh(@Body() body: RefreshDto) {
        return this.authService.refreshAccessToken(body.refreshToken)
    }
}
