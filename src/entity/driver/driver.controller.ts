import { Body, Controller, Get, Param, ParseIntPipe, Patch, Query } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { APPLICATION_TYPES_WITH_ALL, ApplicationTypeWithAll, DRIVER_STATUSES, DriverStatus } from '~/constants'
import { DriverModel } from './driver.model'
import { DriverService } from './driver.service'
import { DriverUpdateDto } from './driver.dto'

@ApiTags('Driver')
// @ApiBearerAuth()
@Controller('driver')
// @UseGuards(JwtAuthGuard)
export class DriverController {
    constructor(private service: DriverService) {}

    @ApiOperation({ summary: 'Get drivers with optional filters' })
    @ApiResponse({ status: 200, type: [DriverModel] })
    @ApiQuery({
        name: 'driver_status',
        required: false,
        enum: DRIVER_STATUSES,
        description: 'Filter drivers by status'
    })
    @ApiQuery({
        name: 'application_type',
        required: false,
        enum: APPLICATION_TYPES_WITH_ALL,
        description: 'Filter drivers by application type or all'
    })
    @Get()
    getDrivers(@Query('driver_status') driver_status?: DriverStatus, @Query('application_type') application_type?: ApplicationTypeWithAll) {
        return this.service.getDrivers({
            driver_status,
            application_type
        })
    }

    @ApiOperation({ summary: 'Update Driver Application' })
    @ApiResponse({ status: 200, type: DriverModel })
    @ApiParam({ name: 'id', type: Number })
    @ApiBody({
        type: DriverUpdateDto,
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
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: DriverUpdateDto) {
        return this.service.update(id, dto)
    }
}
