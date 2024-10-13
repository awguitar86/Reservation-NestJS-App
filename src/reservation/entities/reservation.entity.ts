import { Reservation } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ReservationEntity implements Reservation {
  @ApiProperty()
  id: string;

  @ApiProperty()
  vehicleId: string;

  @ApiProperty()
  customerId: string;

  @ApiProperty()
  timeSlot: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
