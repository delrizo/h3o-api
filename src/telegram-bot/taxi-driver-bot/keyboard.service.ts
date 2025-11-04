import { Injectable } from '@nestjs/common'
import { Markup } from 'telegraf'
import { DriverStatus, HEARS } from '~/constants/shared'

@Injectable()
export class KeyboardService {
    private getMenu(menu: string[][]) {
        return Markup.keyboard(menu).resize().oneTime()
    }

    resetMenu() {
        return Markup.removeKeyboard()
    }

    mainMenu(status?: DriverStatus) {
        switch (status) {
            case DriverStatus.ONE:
                return this.getMenu([[HEARS.CREATE_EMPLOYMENT], [HEARS.ABOUT]])
            case DriverStatus.TWO:
                return this.getMenu([
                    [HEARS.CABINET],
                    [HEARS.FINANCE, HEARS.CHECKS],
                    [HEARS.MEDICAL],
                    [HEARS.BN_CARD, HEARS.VACATION],
                    [HEARS.SPIN_OFF],
                    [HEARS.SUPPORT]
                ])
            case DriverStatus.BLOCK:
                return this.getMenu([[HEARS.WHAT]])
            default:
                return this.getMenu([[HEARS.CREATE_EMPLOYMENT], [HEARS.ABOUT]])
        }
    }

    completeMenu() {
        return this.getMenu([[HEARS.COMPLETE]])
    }
}
