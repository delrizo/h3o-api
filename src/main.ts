import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { NestFactory } from '@nestjs/core'
import { RootModule } from '~/root.module'
import { ValidationPipe } from '@nestjs/common'
import { seedDrivers } from '~/entity/seeds/driver.seed'
import { Logger } from '@nestjs/common'

async function bootstrap() {
    const logger = new Logger('Bootstrap')
    const app = await NestFactory.create(RootModule)
    const config = new DocumentBuilder().addBearerAuth().build()

    app.setGlobalPrefix('api')

    logger.debug(`[NODE_ENV]: ${process.env.NODE_ENV}`)
    if (process.env.NODE_ENV === 'development') {
        app.enableCors()

        try {
            await seedDrivers()
            logger.debug('Test data seeded successfully')
        } catch (error) {
            logger.error('Error seeding test data', error)
        }
    }

    app.useGlobalPipes(new ValidationPipe({ transform: true }))

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/docs', app, document, { yamlDocumentUrl: '/api/yaml', jsonDocumentUrl: '/api/json' })

    await app.listen(process.env.PORT!)
}

bootstrap()
