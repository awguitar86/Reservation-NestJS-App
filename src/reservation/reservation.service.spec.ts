import { Test, TestingModule } from '@nestjs/testing';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { PrismaService } from '../prisma/prisma.service';

describe('ReservationService', () => {
  let service: ReservationService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationService,
        {
          provide: PrismaService,
          useValue: {
            reservation: {
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

    service = module.get<ReservationService>(ReservationService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a reservation', async () => {
    const createReservationDto: CreateReservationDto = {
      customerId: '1',
      vehicleId: '1',
      timeSlot: new Date(),
    };

    (prisma.reservation.create as jest.Mock).mockResolvedValue(
      createReservationDto,
    );

    expect(await service.create(createReservationDto)).toEqual(
      createReservationDto,
    );
    expect(prisma.reservation.create).toHaveBeenCalledWith({
      data: createReservationDto,
    });
  });

  it('should return an array of reservations', async () => {
    const reservations = [
      {
        id: '1',
        customerId: '1',
        vehicleId: '1',
        timeSlot: new Date(),
      },
      {
        id: '2',
        customerId: '2',
        vehicleId: '2',
        timeSlot: new Date(),
      },
    ];

    (prisma.reservation.findMany as jest.Mock).mockResolvedValue(reservations);

    expect(await service.findAll()).toEqual(reservations);
    expect(prisma.reservation.findMany).toHaveBeenCalled();
  });

  it('should return a reservation with customer and vehicle', async () => {
    const reservation = {
      id: '1',
      customerId: '1',
      vehicleId: '1',
      timeSlot: new Date(),
      customer: {
        id: '1',
        name: 'Michael Scott',
        email: 'michael.s@dundermifflin.com',
        phone: '570-555-7890',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      vehicle: {
        id: '1',
        make: 'Crystler',
        model: 'Sebring',
        year: 2007,
        vin: '1HGCM82633A123456',
        customerId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };

    (prisma.reservation.findUnique as jest.Mock).mockResolvedValue(reservation);

    expect(await service.findOne('1')).toEqual(reservation);
    expect(prisma.reservation.findUnique).toHaveBeenCalledWith({
      where: { id: '1' },
      include: {
        customer: true,
        vehicle: true,
      },
    });
  });

  it('should update a reservation', async () => {
    const updatedReservation = {
      timeSlot: new Date('2024-10-18T10:00:00Z'),
    };
    const reservation = {
      id: '1',
      customerId: '1',
      vehicleId: '1',
      timeSlot: new Date('2024-10-18T10:00:00Z'),
      customer: {
        id: '1',
        name: 'Michael Scott',
        email: 'michael.s@dundermifflin.com',
        phone: '570-555-7890',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      vehicle: {
        id: '1',
        make: 'Crystler',
        model: 'Sebring',
        year: 2007,
        vin: '1HGCM82633A123456',
        customerId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };

    (prisma.reservation.update as jest.Mock).mockResolvedValue(reservation);

    expect(await service.update('1', updatedReservation)).toEqual(reservation);
    expect(prisma.reservation.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: updatedReservation,
    });
  });

  it('should remove a reservation', async () => {
    const reservation = {
      id: '1',
      customerId: '1',
      vehicleId: '1',
      timeSlot: new Date(),
    };

    (prisma.reservation.delete as jest.Mock).mockResolvedValue(reservation);

    expect(await service.remove('1')).toEqual(reservation);
    expect(prisma.reservation.delete).toHaveBeenCalledWith({
      where: { id: '1' },
    });
  });
});
