import { JwtService } from '@nestjs/jwt'
import { Socket } from 'socket.io'

type SocketMiddleware = (socket: Socket, next: (err?: Error) => void) => void

export const AuthWsMiddleware = (jwtService: JwtService): SocketMiddleware => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    return async (socket: Socket, next) => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const token = socket.handshake?.auth?.token
            if (!token) {
                throw new Error('Authorization token is missing')
            }

            // try {
            await jwtService.verify(token)
            // } catch (error) {
            //     throw new Error('Authorization token is invalid')
            // }

            // const user = jwtStrategy.validate(payload)
            //
            // if (!user) {
            //     throw new Error('User does not exist')
            // }
            //
            // socket = Object.assign(socket, {
            //     user: user!
            // })
            next()
        } catch {
            next(new Error('Unauthorized'))
        }
    }
}
