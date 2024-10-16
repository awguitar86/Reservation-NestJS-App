import { Test, TestingModule } from '@nestjs/testing';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { PrismaService } from '../prisma/prisma.service';

describe('VehicleService', () => {
  let service: VehicleService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehicleService,
        {
          provide: PrismaService,
          useValue: {
            vehicle: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<VehicleService>(VehicleService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a vehicle', async () => {
    const createVehicleDto: CreateVehicleDto = {
      make: 'Toyota',
      model: 'Tacoma',
      year: 2024,
      vin: '1ABCDE2FGHI345678',
      customerId: '1',
    };

    (prisma.vehicle.create as jest.Mock).mockResolvedValue(createVehicleDto);

    expect(await service.create(createVehicleDto)).toEqual(createVehicleDto);
    expect(prisma.vehicle.create).toHaveBeenCalledWith({
      data: createVehicleDto,
    });
  });

  it('should return an array of vehicles', async () => {
    const vehicles = [
      {
        id: '1',
        make: 'Toyota',
        model: 'Tacoma',
        year: 2024,
        vin: '1ABCD2E3FGHI45678',
        customerId: '1',
      },
      {
        id: '2',
        make: 'Ford',
        model: 'F-150',
        year: 2023,
        vin: '1JKLM2N3OPQR98765',
        customerId: '2',
      },
    ];

    (prisma.vehicle.findMany as jest.Mock).mockResolvedValue(vehicles);

    expect(await service.findAll()).toEqual(vehicles);
    expect(prisma.vehicle.findMany).toHaveBeenCalled();
  });

  it('should return a vehicle with a customer and reservations', async () => {
    const vehicle = {
      id: '1',
      make: 'Toyota',
      model: 'Tacoma',
      year: 2024,
      vin: '1ABCD2E3FGHI45678',
      customerId: '1',
      customer: {
        id: '1',
        name: 'Jim Halpert',
        email: 'jim.h@dundermifflin.com',
        phone: '570-555-2468',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      reservations: [],
    };

    (prisma.vehicle.findUnique as jest.Mock).mockResolvedValue(vehicle);

    expect(await service.findOne('1')).toEqual(vehicle);
    expect(prisma.vehicle.findUnique).toHaveBeenCalledWith({
      where: { id: '1' },
      include: {
        customer: true,
        reservations: {
          where: {
            vehicleId: '1',
          },
        },
      },
    });
  });

  it('should update a vehicle', async () => {
    const updatedVehicle = {
      make: 'Toyota',
      model: '4Runner',
      year: 2005,
      vin: '1LMNO9P8QRST76543',
    };
    const vehicle = {
      id: '1',
      make: 'Toyota',
      model: '4Runner',
      year: 2005,
      vin: '1LMNO9P8QRST76543',
      customerId: '1',
    };

    (prisma.vehicle.update as jest.Mock).mockResolvedValue(vehicle);

    expect(await service.update('1', updatedVehicle)).toEqual(vehicle);
    expect(prisma.vehicle.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: updatedVehicle,
    });
  });

  it('should remove a vehicle', async () => {
    const vehicle = {
      id: '1',
      make: 'Toyota',
      model: 'Tacoma',
      year: 2024,
      vin: '1ABCD2E3FGHI45678',
      customerId: '1',
    };

    (prisma.vehicle.delete as jest.Mock).mockResolvedValue(vehicle);

    expect(await service.remove('1')).toEqual(vehicle);
    expect(prisma.vehicle.delete).toHaveBeenCalledWith({ where: { id: '1' } });
  });
});
