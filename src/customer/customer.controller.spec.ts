import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerEntity } from './entities/customer.entity';

describe('CustomerController', () => {
  let controller: CustomerController;
  let service: CustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [
        {
          provide: CustomerService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CustomerController>(CustomerController);
    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a customer', async () => {
      const createCustomerDto: CreateCustomerDto = {
        name: 'Pam Beesley',
        email: 'pam.b@dundermifflin.com',
        phone: '570-555-5678',
      };
      const result: CustomerEntity = {
        id: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        ...createCustomerDto,
      };

      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createCustomerDto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(createCustomerDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of customers', async () => {
      const result: CustomerEntity[] = [
        {
          id: '1',
          name: 'Pam Beesley',
          email: 'pam.b@dundermifflin.com',
          phone: '570-555-5678',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toEqual(result);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single customer', async () => {
      const result = {
        id: '1',
        name: 'Pam Beesley',
        email: 'pam.b@dundermifflin.com',
        phone: '570-555-5678',
        createdAt: new Date(),
        updatedAt: new Date(),
        vehicles: [],
        reservations: [],
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne('1')).toEqual(result);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('remove', () => {
    it('should remove a customer', async () => {
      const result: CustomerEntity = {
        id: '1',
        name: 'Pam Beesley',
        email: 'pam.b@dundermifflin.com',
        phone: '570-555-5678',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'remove').mockResolvedValue(result);

      expect(await controller.remove('1')).toEqual(result);
      expect(service.remove).toHaveBeenCalledWith('1');
    });
  });
});
