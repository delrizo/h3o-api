import { AuthController } from '~/auth/auth.controller'
import { AuthService } from '~/auth/auth.service'
import { JwtStrategy } from '~/auth/jwt.strategy'
import { Module } from '@nestjs/common'

@Module({
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
