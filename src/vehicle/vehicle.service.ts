import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VehicleService {
  constructor(private prisma: PrismaService) {}

  async create(createVehicleDto: CreateVehicleDto) {
    return await this.prisma.vehicle.create({ data: createVehicleDto });
  }

  async findAll() {
    return await this.prisma.vehicle.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.vehicle.findUnique({
      where: { id },
      include: {
        customer: true,
        reservations: {
          where: {
            vehicleId: id,
          },
        },
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.vehicle.delete({ where: { id } });
  }
}
