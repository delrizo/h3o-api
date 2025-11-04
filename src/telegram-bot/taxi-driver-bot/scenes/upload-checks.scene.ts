// scenes/upload-checks.scene.ts
import { Scene, SceneEnter, On, Ctx, Message } from 'nestjs-telegraf'
import { Context } from 'telegraf'
import type { SceneContext } from 'telegraf/scenes'
import { ACTION } from '~/constants/shared'
import { KeyboardService } from '../keyboard.service'
import { MessageService } from '~/message/message.service'
import { UseGuards } from '@nestjs/common'
import { TelegramDriverGuard } from '~/telegram-bot/guards/telegram-driver.guard'
import { TelegramDriverEmployedGuard } from '~/telegram-bot/guards/telegram-driver-employed.guard'
import { TelegramDriverBlockGuard } from '~/telegram-bot/guards/telegram-driver-block.guard'
import { TelegramDriver } from '~/telegram-bot/decorators/telegram-driver.decorator'
import { DriverModel } from '~/entity/driver/driver.model'
import { CheckService } from '~/entity/check/check.service'

@Scene(ACTION.UPLOAD_CHECKS)
export class UploadChecksScene {
    constructor(
        private readonly keyboardService: KeyboardService,
        private readonly messageService: MessageService,
        private readonly checkService: CheckService
    ) {}

    @SceneEnter()
    @UseGuards(TelegramDriverGuard, TelegramDriverEmployedGuard, TelegramDriverBlockGuard)
    async onSceneEnter(@Ctx() ctx: Context & SceneContext) {
        const message = '📸 Отправьте фотографии чеков. Вы можете отправить одну или несколько фотографий, либо отменить данное действие.'
        const keyboard = this.keyboardService.completeMenu()

        await ctx.reply(message, keyboard)
    }

    @On('text')
    @UseGuards(TelegramDriverGuard, TelegramDriverEmployedGuard, TelegramDriverBlockGuard)
    async onText(@TelegramDriver() driver: DriverModel, @Ctx() ctx: Context & SceneContext) {
        await ctx.reply('Вы заверщили загрузку чеков', this.keyboardService.mainMenu(driver.status))
        await ctx.scene.leave()
    }

    @On('photo')
    @UseGuards(TelegramDriverGuard, TelegramDriverEmployedGuard, TelegramDriverBlockGuard)
    async onPhoto(@TelegramDriver() driver: DriverModel, @Ctx() ctx: Context & SceneContext, @Message('photo') photos: any[]) {
        if (!photos || !Array.isArray(photos)) {
            await ctx.reply('❌ Ошибка при обработке фото')
            return
        }

        try {
            await this.checkService.createTelegramCheck(driver, photos)

            const bestQualityPhoto = photos[photos.length - 1]

            await ctx.replyWithPhoto(bestQualityPhoto.file_id, {
                caption:
                    `📷 Ваш чек сохранен в системе\n` +
                    `Размер: ${bestQualityPhoto.width}x${bestQualityPhoto.height}\n` +
                    `Вес: ${Math.round(bestQualityPhoto.file_size / 1024)} КБ`
            })
        } catch (error) {
            console.error('Error saving check:', error)
            await ctx.reply('❌ Ошибка при сохранении чека')
        }
    }
}
