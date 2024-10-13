import { Vehicle } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class VehicleEntity implements Vehicle {
  @ApiProperty()
  id: string;

  @ApiProperty()
  make: string;

  @ApiProperty()
  model: string;

  @ApiProperty()
  year: number;

  @ApiProperty()
  vin: string;

  @ApiProperty()
  customerId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
