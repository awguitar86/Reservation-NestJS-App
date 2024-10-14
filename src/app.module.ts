import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CustomerModule } from './customer/customer.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [PrismaModule, CustomerModule, VehicleModule, ReservationModule],
})
export class AppModule {}
