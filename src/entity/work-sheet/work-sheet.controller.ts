import { Body, Controller, Param, ParseIntPipe, Patch, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { WorkSheetService } from './work-sheet.service'
import { WorkSheetModel } from './work-sheet.model'
import { WorkSheetUpdateDto } from './work-sheet.dto'

@ApiTags('Worksheet')
// @ApiBearerAuth()
@Controller('worksheet')
// @UseGuards(JwtAuthGuard)
export class WorkSheetController {
    constructor(private service: WorkSheetService) {}

    @ApiOperation({ summary: 'Create Worksheet for Driver' })
    @ApiResponse({ status: 201, type: WorkSheetModel })
    @ApiParam({ name: 'driverId', type: Number })
    @Post(':driverId')
    create(@Param('driverId', ParseIntPipe) driverId: number) {
        return this.service.create(driverId)
    }

    @ApiOperation({ summary: 'Update Driver Worksheet' })
    @ApiResponse({ status: 200, type: WorkSheetModel })
    @ApiParam({ name: 'id', type: Number })
    @ApiBody({
        type: WorkSheetUpdateDto,
        description: 'Worksheet update data',
        examples: {
            updateLastName: {
                summary: 'Update last name only',
                value: {
                    last_name: 'Lastname'
                }
            },
            updateFirstName: {
                summary: 'Update first name only',
                value: {
                    first_name: 'Firstname'
                }
            },
            updateMiddleName: {
                summary: 'Update middle name only',
                value: {
                    middle_name: 'Middlename'
                }
            },
            fullUpdate: {
                summary: 'Update all fields',
                value: {
                    last_name: 'Lastname',
                    first_name: 'Firstname',
                    middle_name: 'Middlename'
                }
            },
            partialUpdate: {
                summary: 'Update multiple fields',
                value: {
                    last_name: 'Lastname',
                    first_name: 'Firstname'
                }
            }
        }
    })
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: WorkSheetUpdateDto) {
        return this.service.update(id, dto)
    }
}
