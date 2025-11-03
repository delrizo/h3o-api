import { Injectable } from '@nestjs/common'
import { Markup } from 'telegraf'
import { DriverStatus } from '~/constants/shared'
import { MENU_MESSAGE } from '../../constants/message/menu.message'

@Injectable()
export class KeyboardService {
    private getMenu(menu: string[][]) {
        return Markup.keyboard(menu).resize().oneTime()
    }

    mainMenu(status?: DriverStatus) {
        switch (status) {
            case DriverStatus.ONE:
                return this.getMenu([[MENU_MESSAGE.MAIN[status].CREATE_EMPLOYMENT], [MENU_MESSAGE.SHARED.ABOUT]])
            case DriverStatus.TWO:
                return this.getMenu([
                    [MENU_MESSAGE.MAIN[status].CABINET],
                    [MENU_MESSAGE.MAIN[status].FINANCE, MENU_MESSAGE.MAIN[status].CHECKS],
                    [MENU_MESSAGE.MAIN[status].MEDICAL],
                    [MENU_MESSAGE.MAIN[status].BN_CARD, MENU_MESSAGE.MAIN[status].VACATION],
                    [MENU_MESSAGE.MAIN[status].SPIN_OFF],
                    [MENU_MESSAGE.MAIN[status].SUPPORT]
                ])
            case DriverStatus.THREE:
                return this.getMenu([[MENU_MESSAGE.MAIN[status].BLOCK]])
            default:
                return this.getMenu([[MENU_MESSAGE.MAIN[DriverStatus.ONE].CREATE_EMPLOYMENT], [MENU_MESSAGE.SHARED.ABOUT]])
        }
    }
}
