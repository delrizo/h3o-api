import { Markup } from 'telegraf'

export class ReplyKeyboard {
    static mainMenu() {
        return Markup.keyboard([
            ['📋 Информация', '⚙️ Настройки'],
            ['📞 Контакты', '🎭 Сцена']
        ])
            .resize()
            .oneTime()
    }

    static settingsMenu() {
        return Markup.keyboard([['🔔 Уведомления', '🌙 Тема'], ['⬅️ Назад']]).resize()
    }

    static removeKeyboard() {
        return Markup.removeKeyboard()
    }
}

export class InlineKeyboard {
    static mainMenu() {
        return Markup.inlineKeyboard([
            [Markup.button.callback('Информация', 'info'), Markup.button.callback('Настройки', 'settings')],
            [Markup.button.url('Сайт', 'https://example.com'), Markup.button.callback('Помощь', 'help')]
        ])
    }

    static confirmButtons() {
        return Markup.inlineKeyboard([[Markup.button.callback('✅ Да', 'confirm_yes'), Markup.button.callback('❌ Нет', 'confirm_no')]])
    }
}
