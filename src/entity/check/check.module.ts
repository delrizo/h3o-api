import { SequelizeModule } from '@nestjs/sequelize'
import { Module } from '@nestjs/common'
import { CheckModel } from './check.model'
import { CheckService } from './check.service'

@Module({
    providers: [CheckService],
    imports: [SequelizeModule.forFeature([CheckModel])],
    exports: [CheckService]
})
export class CheckModule {}
