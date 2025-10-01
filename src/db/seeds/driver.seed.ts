// ~/db/seeds/driver.seed.ts
import { DriverModel } from '../models/driver.model'
import { TelegramModel } from '../models/telegram.model'
import { WorkSheetModel } from '../models/work-sheet.model'

export const seedDrivers = async () => {
    // Очистка таблиц (опционально)
    await WorkSheetModel.destroy({ where: {} })
    await TelegramModel.destroy({ where: {} })
    await DriverModel.destroy({ where: {} })

    // Создание водителей
    const driver1 = await DriverModel.create({
        status: 'one'
    })

    const driver2 = await DriverModel.create({
        status: 'two'
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const driver3 = await DriverModel.create({
        status: 'three'
    })

    // Создание связанных записей
    await TelegramModel.create({
        driverId: driver1.id,
        telegram_id: 123456789,
        first_name: 'Иван',
        username: 'ivan_telegram'
    })

    await WorkSheetModel.create({
        driverId: driver1.id,
        last_name: 'Иванов',
        first_name: 'Иван',
        middle_name: 'Иванович'
    })

    await TelegramModel.create({
        driverId: driver2.id,
        telegram_id: 987654321,
        first_name: 'Петр',
        username: 'peter_telegram'
    })

    // driver3 останется без telegram и worksheet
}
