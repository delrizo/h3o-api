import { Injectable } from '@nestjs/common'
import { Markup } from 'telegraf'
import { ReapplyType } from '~/constants'
import { BUTTON_MESSAGE } from './message/button.message'

@Injectable()
export class ButtonService {
    private getButtons(buttons: [text: string, action: string][][]) {
        return Markup.inlineKeyboard(buttons.map(i => i.map(([text, action]) => Markup.button.callback(text, action))))
    }

    reapplyEmploymentButton() {
        return this.getButtons([[[BUTTON_MESSAGE.REAPPLY, ReapplyType.EMPLOYMENT]]])
    }
}
