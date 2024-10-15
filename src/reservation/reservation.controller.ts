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
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationEntity } from './entities/reservation.entity';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Controller('reservation')
@ApiTags('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @ApiCreatedResponse({ type: ReservationEntity })
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationService.create(createReservationDto);
  }

  @Get()
  @ApiOkResponse({ type: ReservationEntity, isArray: true })
  findAll() {
    return this.reservationService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ReservationEntity })
  findOne(@Param('id') id: string) {
    return this.reservationService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ReservationEntity })
  update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationService.update(id, updateReservationDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ReservationEntity })
  remove(@Param('id') id: string) {
    return this.reservationService.remove(id);
  }
}
