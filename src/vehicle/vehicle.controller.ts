import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { VehicleEntity } from './entities/vehicle.entity';

@Controller('vehicle')
@ApiTags('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  @ApiCreatedResponse({ type: VehicleEntity })
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehicleService.create(createVehicleDto);
  }

  @Get()
  @ApiOkResponse({ type: VehicleEntity, isArray: true })
  findAll() {
    return this.vehicleService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: VehicleEntity })
  findOne(@Param('id') id: string) {
    return this.vehicleService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: VehicleEntity })
  update(@Param('id') id: string, @Body() updateVehicleDto: CreateVehicleDto) {
    return this.vehicleService.update(id, updateVehicleDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: VehicleEntity })
  remove(@Param('id') id: string) {
    return this.vehicleService.remove(id);
  }
}
