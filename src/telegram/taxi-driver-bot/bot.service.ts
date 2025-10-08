import { Injectable } from '@nestjs/common'
import { Markup } from 'telegraf'

@Injectable()
export class BotService {
    getMainMenu() {
        return Markup.keyboard([['📋 Информация', '⚙️ Настройки'], ['📞 Контакты']])
            .resize()
            .oneTime()
    }

    getInlineMenu() {
        return Markup.inlineKeyboard([
            [Markup.button.callback('Информация', 'info_button')],
            [Markup.button.url('Сайт', 'https://example.com')]
        ])
    }

    getApplicationMenu() {
        return Markup.keyboard([['📝 Оставить заявку'], ['🚪 Главное меню']])
            .resize()
            .oneTime()
    }

    getApplicationButton() {
        return Markup.keyboard([['📝 Оставить заявку']])
            .resize()
            .oneTime()
    }

    getEmploymentButton() {
        return Markup.inlineKeyboard([[Markup.button.callback('📝 Оставить заявку', 'employment')]])
    }
}
