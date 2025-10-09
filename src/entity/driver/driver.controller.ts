import { Controller, Get, Query } from '@nestjs/common'
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { DRIVER_STATUSES, DriverStatus } from '~/constants'
import { DriverModel } from './driver.model'
import { DriverService } from './driver.service'

@ApiTags('Driver')
// @ApiBearerAuth()
@Controller('driver')
// @UseGuards(JwtAuthGuard)
export class DriverController {
    constructor(private driverService: DriverService) {}

    @ApiOperation({ summary: 'Get drivers with optional status filter' })
    @ApiResponse({ status: 200, type: [DriverModel] })
    @ApiQuery({
        name: 'status',
        required: false,
        enum: DRIVER_STATUSES,
        description: 'Filter drivers by status'
    })
    @Get()
    getDrivers(@Query('status') status?: DriverStatus) {
        return this.driverService.getDrivers(status)
    }
}
