import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async create(createCustomerDto: CreateCustomerDto) {
    return await this.prisma.customer.create({ data: createCustomerDto });
  }

  async findAll() {
    return await this.prisma.customer.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.customer.findUnique({
      where: { id },
      include: {
        vehicles: {
          where: {
            customerId: id,
          },
        },
        reservations: {
          where: {
            customerId: id,
          },
        },
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.customer.delete({ where: { id } });
  }
}
