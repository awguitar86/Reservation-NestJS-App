import { Test, TestingModule } from '@nestjs/testing';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { VehicleEntity } from './entities/vehicle.entity';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

describe('VehicleController', () => {
  let controller: VehicleController;
  let service: VehicleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehicleController],
      providers: [
        {
          provide: VehicleService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<VehicleController>(VehicleController);
    service = module.get<VehicleService>(VehicleService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a vehicle', async () => {
      const createVehicleDto: CreateVehicleDto = {
        make: 'Mazda',
        model: 'Mazda3',
        year: 2011,
        vin: '1ABCD2E3FGHI45678',
        customerId: '1',
      };
      const result: VehicleEntity = {
        id: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        ...createVehicleDto,
      };

      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createVehicleDto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(createVehicleDto);
    });
  });
  describe('findAll', () => {
    it('should return an array of vehicles', async () => {
      const result: VehicleEntity[] = [
        {
          id: '1',
          make: 'Toyota',
          model: 'Corolla',
          year: 2020,
          vin: '',
          customerId: '',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          make: 'Honda',
          model: 'Civic',
          year: 2019,
          vin: '',
          customerId: '',
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
    it('should return a single vehicle', async () => {
      const result = {
        id: '1',
        make: 'Mazda',
        model: 'Mazda3',
        year: 2011,
        vin: '1ABCD2E3FGHI45678',
        customerId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        reservations: [],
        customer: {
          id: '1',
          name: 'Kevin Malone',
          email: 'kevin.m@dundermifflin.com',
          phone: '570-555-7890',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne('1')).toEqual(result);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should update a vehicle', async () => {
      const updateVehicleDto: UpdateVehicleDto = {
        make: 'Toyota',
        model: '4Runner',
        year: 2005,
        vin: '1LMNO9P8QRST76543',
      };

      const updatedVehicle: VehicleEntity = {
        id: '1',
        make: 'Toyota',
        model: '4Runner',
        year: 2005,
        vin: '1LMNO9P8QRST76543',
        customerId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'update').mockResolvedValue(updatedVehicle);

      expect(await controller.update('1', updateVehicleDto)).toEqual(
        updatedVehicle,
      );
      expect(service.update).toHaveBeenCalledWith('1', updateVehicleDto);
    });
  });

  describe('remove', () => {
    it('should remove a vehicle', async () => {
      const result: VehicleEntity = {
        id: '1',
        make: 'Mazda',
        model: 'Mazda3',
        year: 2011,
        vin: '1ABCD2E3FGHI45678',
        customerId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'remove').mockResolvedValue(result);

      expect(await controller.remove('1')).toEqual(result);
      expect(service.remove).toHaveBeenCalledWith('1');
    });
  });
});
