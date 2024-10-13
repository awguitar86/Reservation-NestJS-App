import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601 } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReservationDto {
  @ApiProperty()
  customerId: string;

  @ApiProperty()
  vehicleId: string;

  @ApiProperty()
  @IsISO8601()
  @Type(() => Date)
  timeSlot: Date;
}
