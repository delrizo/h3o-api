import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { JwtService } from '@nestjs/jwt'
import { Reflector } from '@nestjs/core'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(
        private readonly jwtService: JwtService,
        private reflector: Reflector
    ) {
        super()
    }

    async canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [context.getHandler(), context.getClass()])

        if (isPublic) {
            return true
        }

        const request = context.switchToHttp().getRequest()
        const token = this.extractToken(request)

        if (!token) {
            throw new UnauthorizedException('Token not found')
        }

        try {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const { email, sub } = await this.jwtService.verify(token)

            if (email === 'fundascension@gmail.com' && sub === 1) {
                return true
            } else {
                throw new UnauthorizedException('Unauthorized')
            }
        } catch {
            throw new UnauthorizedException('Unauthorized')
        }
    }

    private extractToken(request: Request): string | null {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const [type, token] = request.headers?.authorization?.split(' ') ?? []

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return type === 'Bearer' ? token : null
    }

    handleRequest(err: any, user: any, info: any) {
        console.log('HANDLE', err, user, info)
        if (err || !user) {
            let message = 'Unauthorized'

            if (info instanceof Error) {
                message = info.message
            } else if (info && info.name === 'TokenExpiredError') {
                message = 'Token expired'
            } else if (info && info.name === 'JsonWebTokenError') {
                message = 'Invalid token'
            }

            throw new UnauthorizedException(message)
        }

        return user
    }
}
