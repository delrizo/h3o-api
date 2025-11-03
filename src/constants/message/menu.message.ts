import { DriverStatus } from '~/constants/shared'

export const MENU_MESSAGE = {
    MAIN: {
        [DriverStatus.ONE]: {
            CREATE_EMPLOYMENT: '🚀 Стать частью команды'
        },
        [DriverStatus.TWO]: {
            CABINET: '💼 Личный кабинет',
            FINANCE: '💰 Финансы',
            CHECKS: '🧾 Чеки',
            MEDICAL: '🩺 Медосмотр',
            BN_CARD: '⛽️ БН-карта',
            VACATION: '🗓 Отпуск',
            COURCE_CLIENT: '🎓 Курс «Клиентский сервис+»',
            SPIN_OFF: '🎯 Дополнительный заработок',
            SUPPORT: '🆘 Поддержка'
        },
        [DriverStatus.THREE]: {
            BLOCK: '❓ Что делать ❓'
        }
    },
    SHARED: {
        ABOUT: '💎 О компании'
    }
}
