import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Param, ParseIntPipe, Patch } from '@nestjs/common'
import { ApplicationService } from './application.service'
import { ApplicationUpdateDto } from './application.dto'
import { ApplicationModel } from './application.model'

@ApiTags('Application')
// @ApiBearerAuth()
@Controller('application')
// @UseGuards(JwtAuthGuard)
export class ApplicationController {
    constructor(private applicationService: ApplicationService) {}

    @ApiOperation({ summary: 'Update Driver Application' })
    @ApiResponse({ status: 200, type: ApplicationModel })
    @ApiParam({ name: 'id', type: Number })
    @ApiBody({
        type: ApplicationUpdateDto,
        description: 'Application update data',
        examples: {
            updateStatus: {
                summary: 'Update status only',
                value: {
                    status: 'approved'
                }
            },
            updateType: {
                summary: 'Update type only',
                value: {
                    type: 'employment'
                }
            },
            fullUpdate: {
                summary: 'Update both fields',
                value: {
                    type: 'employment',
                    status: 'in_progress'
                }
            }
        }
    })
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: ApplicationUpdateDto) {
        return this.applicationService.update(id, dto)
    }
}
