import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

describe('CustomerService', () => {
  let service: CustomerService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: PrismaService,
          useValue: {
            customer: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a customer', async () => {
    const createCustomerDto: CreateCustomerDto = {
      name: 'John Smith',
      email: 'john.smith@testmail.com',
      phone: '801-555-1234',
    };

    (prisma.customer.create as jest.Mock).mockResolvedValue(createCustomerDto);

    expect(await service.create(createCustomerDto)).toEqual(createCustomerDto);
    expect(prisma.customer.create).toHaveBeenCalledWith({
      data: createCustomerDto,
    });
  });

  it('should return an array of customers', async () => {
    const customers = [
      {
        id: '1',
        name: 'Mike Walters',
        email: 'mike@walters.com',
        phone: '801-555-6789',
      },
      {
        id: '1',
        name: 'Sally Frank',
        email: 'sally.f@testmail.com',
        phone: '801-555-1928',
      },
    ];

    (prisma.customer.findMany as jest.Mock).mockResolvedValue(customers);

    expect(await service.findAll()).toEqual(customers);
    expect(prisma.customer.findMany).toHaveBeenCalled();
  });

  it('should return a customer with vehicles and reservations', async () => {
    const customer = {
      id: '1',
      name: 'Mike Walters',
      email: 'mike@walters.com',
      phone: '801-555-6789',
      vehicles: [],
      reservations: [],
    };

    (prisma.customer.findUnique as jest.Mock).mockResolvedValue(customer);

    expect(await service.findOne('1')).toEqual(customer);
    expect(prisma.customer.findUnique).toHaveBeenCalledWith({
      where: { id: '1' },
      include: {
        vehicles: {
          where: {
            customerId: '1',
          },
        },
        reservations: {
          where: {
            customerId: '1',
          },
        },
      },
    });
  });

  it('should delete a customer', async () => {
    const customer = {
      id: '1',
      name: 'Mike Walters',
      email: 'mike@walters.com',
      phone: '801-555-6789',
    };

    (prisma.customer.delete as jest.Mock).mockResolvedValue(customer);

    expect(await service.remove('1')).toEqual(customer);
    expect(prisma.customer.delete).toHaveBeenCalledWith({ where: { id: '1' } });
  });
});
