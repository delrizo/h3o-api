import { Controller, Get, Query } from '@nestjs/common'
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { APPLICATION_TYPES, ApplicationType, DRIVER_STATUSES, DriverStatus } from '~/constants'
import { DriverModel } from './driver.model'
import { DriverService } from './driver.service'

@ApiTags('Driver')
// @ApiBearerAuth()
@Controller('driver')
// @UseGuards(JwtAuthGuard)
export class DriverController {
    constructor(private driverService: DriverService) {}

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
        enum: APPLICATION_TYPES,
        description: 'Filter drivers by application type'
    })
    @Get()
    getDrivers(@Query('driver_status') driver_status?: DriverStatus, @Query('application_type') application_type?: ApplicationType) {
        return this.driverService.getDrivers({
            driver_status,
            application_type
        })
    }
}
