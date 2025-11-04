import { Injectable } from '@nestjs/common'
import { Markup } from 'telegraf'
import { ACTION } from '~/constants/shared'
import { REAPPLY_MESSAGE } from '../../constants/message/reapply.message'
import { CHECKS_MESSAGE } from '~/constants/message/checks.message'

@Injectable()
export class ButtonService {
    private getButtons(buttons: [text: string, action: string][][]) {
        return Markup.inlineKeyboard(buttons.map(i => i.map(([text, action]) => Markup.button.callback(text, action))))
    }

    reapplyEmploymentButton() {
        return this.getButtons([[[REAPPLY_MESSAGE.REAPPLY, ACTION.REAPPLY_EMPLOYMENT]]])
    }

    checksButton() {
        return this.getButtons([[[CHECKS_MESSAGE.UPLOAD, ACTION.UPLOAD_CHECKS]]])
    }
}
