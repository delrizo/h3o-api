import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Post } from '@nestjs/common'
import { TelegramModel, TelegramModelDto } from '~/db/models/telegram.model'
import { TelegramService } from '~/modules/telegram/telegram.service'

@ApiTags('Bot')
@ApiBearerAuth()
@Controller('telegram')
export class TelegramController {
    constructor(private telegramService: TelegramService) {}

    @ApiOperation({ summary: 'Create telegram' })
    @ApiResponse({ status: 201, type: TelegramModel })
    @Post()
    create(@Body() dto: TelegramModelDto) {
        return this.telegramService.create(dto)
    }
}
