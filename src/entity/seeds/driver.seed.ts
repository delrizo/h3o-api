// ~/db/seeds/driver.seed.ts
import { DriverModel } from '../driver/driver.model'
import { TelegramModel } from '../telegram/telegram.model'
import { WorkSheetModel } from '../work-sheet/work-sheet.model'
import { ApplicationModel } from '../application/application.model'
import { DRIVER_STATUSES, APPLICATION_TYPES, APPLICATION_STATUSES } from '~/constants/shared'

export const seedDrivers = async () => {
    // Очистка таблиц
    await ApplicationModel.destroy({ where: {} })
    await WorkSheetModel.destroy({ where: {} })
    await TelegramModel.destroy({ where: {} })
    await DriverModel.destroy({ where: {} })

    // Массивы для генерации случайных данных
    const firstNames = [
        'Александр',
        'Алексей',
        'Андрей',
        'Антон',
        'Артем',
        'Борис',
        'Вадим',
        'Валентин',
        'Валерий',
        'Василий',
        'Виктор',
        'Виталий',
        'Владимир',
        'Владислав',
        'Геннадий',
        'Георгий',
        'Григорий',
        'Даниил',
        'Денис',
        'Дмитрий',
        'Евгений',
        'Егор',
        'Иван',
        'Игорь',
        'Кирилл',
        'Константин',
        'Леонид',
        'Максим',
        'Михаил',
        'Никита',
        'Николай',
        'Олег',
        'Павел',
        'Петр',
        'Роман',
        'Сергей',
        'Станислав',
        'Степан',
        'Тимофей',
        'Федор',
        'Юрий',
        'Ярослав',
        'Аркадий',
        'Вячеслав',
        'Глеб',
        'Захар',
        'Илья',
        'Макар',
        'Назар',
        'Прохор'
    ]

    const lastNames = [
        'Иванов',
        'Петров',
        'Сидоров',
        'Смирнов',
        'Кузнецов',
        'Попов',
        'Лебедев',
        'Козлов',
        'Новиков',
        'Морозов',
        'Волков',
        'Соловьев',
        'Васильев',
        'Зайцев',
        'Павлов',
        'Семенов',
        'Голубев',
        'Виноградов',
        'Богданов',
        'Воробьев',
        'Федоров',
        'Михайлов',
        'Беляев',
        'Тарасов',
        'Белов',
        'Комаров',
        'Орлов',
        'Киселев',
        'Макаров',
        'Андреев',
        'Ковалев',
        'Ильин',
        'Гусев',
        'Титов',
        'Кузьмин',
        'Кудрявцев',
        'Баранов',
        'Куликов',
        'Алексеев',
        'Степанов',
        'Яковлев',
        'Сорокин',
        'Сергеев',
        'Романов',
        'Захаров',
        'Борисов',
        'Королев',
        'Герасимов',
        'Пономарев',
        'Григорьев'
    ]

    const middleNames = [
        'Александрович',
        'Алексеевич',
        'Андреевич',
        'Антонович',
        'Артемович',
        'Борисович',
        'Вадимович',
        'Валентинович',
        'Валерьевич',
        'Васильевич',
        'Викторович',
        'Витальевич',
        'Владимирович',
        'Владиславович',
        'Геннадьевич',
        'Георгиевич',
        'Григорьевич',
        'Данилович',
        'Денисович',
        'Дмитриевич',
        'Евгеньевич',
        'Егорович',
        'Иванович',
        'Игоревич',
        'Кириллович',
        'Константинович',
        'Леонидович',
        'Максимович',
        'Михайлович',
        'Никитич',
        'Николаевич',
        'Олегович',
        'Павлович',
        'Петрович',
        'Романович',
        'Сергеевич',
        'Станиславович',
        'Степанович',
        'Тимофеевич',
        'Федорович',
        'Юрьевич',
        'Ярославович'
    ]

    const applicationMessages = [
        'Хочу устроиться на работу в вашу компанию',
        'Прошу связаться со мной для уточнения деталей',
        'Хочу повысить свой статус в системе',
        'Проблема с технической поддержкой',
        'Вопрос по поводу документов',
        'Нужна консультация по работе приложения',
        'Запрос на изменение графика работы',
        'Проблема с выплатами',
        'Вопрос по страховке',
        'Другая проблема, требующая внимания',
        'Хочу получить больше информации о вакансиях',
        'Прошу пересмотреть мой статус',
        'Техническая неполадка в личном кабинете',
        'Вопрос по обучению',
        'Предложение по сотрудничеству'
    ]

    // Создание 100 водителей
    const drivers: DriverModel[] = []

    for (let i = 1; i <= 100; i++) {
        // Случайный выбор данных
        const status = DRIVER_STATUSES[Math.floor(Math.random() * DRIVER_STATUSES.length)]
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
        const middleName = middleNames[Math.floor(Math.random() * middleNames.length)]

        // Создание водителя
        const driver = await DriverModel.create({
            status: status
        })

        // Создание Telegram записи для каждого водителя
        await TelegramModel.create({
            driverId: driver.id,
            telegram_id: 1000000000 + i, // Уникальный telegram_id
            first_name: firstName,
            username: `${firstName.toLowerCase()}_${i}`
        })

        // Создание WorkSheet для 80% водителей (остальные 20% без worksheet)
        if (Math.random() > 0.2) {
            await WorkSheetModel.create({
                driverId: driver.id,
                last_name: lastName,
                first_name: firstName,
                middle_name: middleName
            })
        }

        // Создание заявок для водителя (от 0 до 5 заявок)
        const applicationsCount = Math.floor(Math.random() * 6) // 0-5 заявок

        for (let j = 0; j < applicationsCount; j++) {
            const applicationType = APPLICATION_TYPES[Math.floor(Math.random() * APPLICATION_TYPES.length)]
            const applicationStatus = APPLICATION_STATUSES[Math.floor(Math.random() * APPLICATION_STATUSES.length)]
            const hasMessage = Math.random() > 0.3 // 70% заявок с сообщением

            await ApplicationModel.create({
                driverId: driver.id,
                type: applicationType,
                status: applicationStatus,
                message: hasMessage ? applicationMessages[Math.floor(Math.random() * applicationMessages.length)] : null
            })
        }

        drivers.push(driver)

        // Логирование прогресса
        if (i % 10 === 0) {
            console.log(`Создано ${i} водителей`)
        }
    }

    // Подсчет статистики
    const totalDrivers = await DriverModel.count()
    const totalApplications = await ApplicationModel.count()
    const driversWithApplications = await DriverModel.count({
        include: [
            {
                model: ApplicationModel,
                required: true
            }
        ]
    })

    console.log(`Успешно создано:`)
    console.log(`- ${totalDrivers} водителей`)
    console.log(`- ${totalApplications} заявок`)
    console.log(`- ${driversWithApplications} водителей имеют заявки`)

    return drivers
}
