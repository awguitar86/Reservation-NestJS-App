import { Test, TestingModule } from '@nestjs/testing';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationEntity } from './entities/reservation.entity';

describe('ReservationController', () => {
  let controller: ReservationController;
  let service: ReservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationController],
      providers: [
        {
          provide: ReservationService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ReservationController>(ReservationController);
    service = module.get<ReservationService>(ReservationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a reservation', async () => {
      const createReservationDto: CreateReservationDto = {
        vehicleId: '1',
        customerId: '1',
        timeSlot: new Date(),
      };
      const result: ReservationEntity = {
        id: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        ...createReservationDto,
      };

      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createReservationDto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(createReservationDto);
    });
  });
  describe('findAll', () => {
    it('should return an array of reservations', async () => {
      const result: ReservationEntity[] = [
        {
          id: '1',
          vehicleId: '1',
          customerId: '1',
          timeSlot: new Date(),
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
    it('should return a single reservation', async () => {
      const result = {
        id: '1',
        vehicleId: '1',
        customerId: '1',
        timeSlot: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        customer: {
          id: '1',
          name: 'Oscar Martinez',
          email: 'oscar.m@dundermifflin.com',
          phone: '570-555-1234',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        vehicle: {
          id: '1',
          make: 'Toyota',
          model: 'Camry',
          year: 2015,
          vin: '1ABCD2E3FGHI45678',
          customerId: '1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne('1')).toEqual(result);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });
  describe('remove', () => {
    it('should remove a reservation', async () => {
      const result: ReservationEntity = {
        id: '1',
        vehicleId: '1',
        customerId: '1',
        timeSlot: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'remove').mockResolvedValue(result);

      expect(await controller.remove('1')).toEqual(result);
      expect(service.remove).toHaveBeenCalledWith('1');
    });
  });
});
