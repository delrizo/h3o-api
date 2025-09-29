import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { NestFactory } from '@nestjs/core'
import { RootModule } from '~/root.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
    const app = await NestFactory.create(RootModule)
    const config = new DocumentBuilder().addBearerAuth().build()

    app.setGlobalPrefix('api')

    console.log('NODE_ENV:', process.env.NODE_ENV)
    if (process.env.NODE_ENV === 'development') {
        app.enableCors()
    }

    app.useGlobalPipes(new ValidationPipe({ transform: true }))

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/docs', app, document)

    await app.listen(process.env.PORT!)
}

bootstrap()
