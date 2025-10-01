import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtPayload } from '~/auth/types'
import { JwtService } from '@nestjs/jwt'
import { TokenResponseDto } from '~/auth/types.dto'

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    validateUser(email: string, password: string): boolean {
        const isCompare = email === 'fundascension@gmail.com' && password === 'fundascension@gmail.com'

        if (!isCompare) {
            throw new UnauthorizedException()
        }

        return isCompare
    }

    login(email: string) {
        const payload: JwtPayload = { email: email, sub: 1 }

        return new TokenResponseDto(this.jwtService.sign(payload), this.jwtService.sign(payload, { expiresIn: '7d' }))
    }

    refreshAccessToken(refreshToken: string) {
        try {
            const payload = this.jwtService.verify<JwtPayload>(refreshToken)

            if (payload.email !== 'fundascension@gmail.com' || payload.sub !== 1) {
                throw new HttpException('Not found', HttpStatus.NOT_FOUND)
            }

            return this.login(payload.email)
        } catch {
            throw new UnauthorizedException()
        }
    }
}
