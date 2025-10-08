import { Markup } from 'telegraf'
import { ApplicationType } from '~/constants'

export const MESSAGE = {
    ERROR: {
        FROM: `Не удалось получить информацию`,
        DOES_NOT_EXIST: 'Пожалуйста, сначала начните работу с ботом через /start',
        APPLICATION_NOT_AVAILABLE: '❌ Заявка на трудоустройство недоступна для вашего текущего статуса',
        APPLICATION_PENDING: '⏳ У вас уже есть активная заявка на трудоустройство. Дождитесь обработки.',
        APPLICATION_ALREADY_PROCESSED: 'ℹ️ Ваша заявка уже обрабатывается'
    },
    START: {
        FIRST: `
Привет, ты попал первый раз, теперь ты у нас в БД
Нажимай кнопку и типо с тобой свяжутся        
`,
        EXISTING: `С возвращением! Вы уже зарегистрированы в системе.`
    },
    APPLICATION: {
        EMPLOYMENT: {
            SUCCESS: '✅ Заявка на трудоустройство успешно отправлена!',
            PENDING: '📋 Наш менеджер рассмотрит вашу заявку в ближайшее время и свяжется с вами.',
            INFO: '💼 Для трудоустройства нам потребуется:\n• Ваши документы\n• Опыт работы\n• Контактные данные\n\nМы свяжемся с вами для уточнения деталей.'
        }
    }
} as const

export const BUTTON = {
    START: {
        FIRST: Markup.inlineKeyboard([[Markup.button.callback('📝 Оставить заявку', ApplicationType.EMPLOYMENT)]])
    }
}
