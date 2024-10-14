import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from '../prisma/prisma.service';

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

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return await this.prisma.customer.update({
      where: { id },
      data: updateCustomerDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.customer.delete({ where: { id } });
  }
}
