import { Inject, Injectable } from '@nestjs/common'
import { CreateOptions } from 'sequelize'

@Injectable()
export class BaseRepo<T> {
    constructor(
        @Inject('SEQUELIZE_REPOSITORY')
        private readonly model: any
    ) {}

    create(data: Partial<T>, options?: CreateOptions): Promise<T> {
        return this.model.create(data, options)
    }

    bulkCreate(data: Partial<T>[], options?: CreateOptions): Promise<T[]> {
        return this.model.bulkCreate(data, options)
    }
}
