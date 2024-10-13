import { Customer } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CustomerEntity implements Customer {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
