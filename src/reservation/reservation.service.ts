import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReservationService {
  constructor(private prisma: PrismaService) {}

  async create(createReservationDto: CreateReservationDto) {
    return await this.prisma.reservation.create({ data: createReservationDto });
  }

  async findAll() {
    return await this.prisma.reservation.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.reservation.findUnique({
      where: { id },
      include: {
        customer: true,
        vehicle: true,
      },
    });
  }

  async update(id: string, updateReservationDto: CreateReservationDto) {
    return await this.prisma.customer.update({
      where: { id },
      data: updateReservationDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.reservation.delete({ where: { id } });
  }
}
