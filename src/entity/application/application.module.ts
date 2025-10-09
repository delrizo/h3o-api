import { SequelizeModule } from '@nestjs/sequelize'
import { Module } from '@nestjs/common'
import { ApplicationModel } from './application.model'
import { ApplicationService } from './application.service'

@Module({
    controllers: [],
    providers: [ApplicationService],
    imports: [SequelizeModule.forFeature([ApplicationModel])],
    exports: [ApplicationService]
})
export class ApplicationModule {}
