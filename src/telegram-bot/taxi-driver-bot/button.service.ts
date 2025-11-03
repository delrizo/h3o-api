import { Injectable } from '@nestjs/common'
import { Markup } from 'telegraf'
import { ReapplyType } from '~/constants/shared'
import { REAPPLY_MESSAGE } from '../../constants/message/reapply.message'

@Injectable()
export class ButtonService {
    private getButtons(buttons: [text: string, action: string][][]) {
        return Markup.inlineKeyboard(buttons.map(i => i.map(([text, action]) => Markup.button.callback(text, action))))
    }

    reapplyEmploymentButton() {
        return this.getButtons([[[REAPPLY_MESSAGE.REAPPLY, ReapplyType.EMPLOYMENT]]])
    }
}
