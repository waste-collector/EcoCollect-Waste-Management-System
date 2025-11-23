import { CollectionPoint, Vehicle, Employee, Tour, GlobalStatistics } from '../types';

export const mockCollectionPoints: CollectionPoint[] = [
  {
    id: '1',
    name: 'Downtown A',
    address: '15 Republic Street',
    latitude: 48.8566,
    longitude: 2.3522,
    wasteType: 'general',
    capacity: 1100,
    fillLevel: 85,
    lastCollection: new Date('2025-10-14'),
    status: 'full'
  },
  {
    id: '2',
    name: 'Municipal Park',
    address: 'Flowers Avenue',
    latitude: 48.8606,
    longitude: 2.3376,
    wasteType: 'recyclable',
    capacity: 800,
    fillLevel: 45,
    lastCollection: new Date('2025-10-13'),
    status: 'active'
  },
  {
    id: '3',
    name: 'North District',
    address: '42 Victor Hugo Boulevard',
    latitude: 48.8738,
    longitude: 2.3254,
    wasteType: 'glass',
    capacity: 500,
    fillLevel: 92,
    lastCollection: new Date('2025-10-10'),
    status: 'full'
  },
  {
    id: '4',
    name: 'Central Market',
    address: 'Market Square',
    latitude: 48.8516,
    longitude: 2.3647,
    wasteType: 'organic',
    capacity: 1500,
    fillLevel: 68,
    lastCollection: new Date('2025-10-14'),
    status: 'active'
  },
  {
    id: '5',
    name: 'Industrial Zone',
    address: 'Industry Street',
    latitude: 48.8456,
    longitude: 2.3789,
    wasteType: 'recyclable',
    capacity: 2000,
    fillLevel: 34,
    lastCollection: new Date('2025-10-15'),
    status: 'active'
  }
];

export const mockVehicles: Vehicle[] = [
  {
    id: 'v1',
    registration: 'AB-123-CD',
    type: 'truck',
    capacity: 8000,
    currentCapacity: 2400,
    fuel: 'diesel',
    fuelLevel: 75,
    status: 'available',
    co2Emissions: 280,
    lastMaintenance: new Date('2025-09-15')
  },
  {
    id: 'v2',
    registration: 'EF-456-GH',
    type: 'compactor',
    capacity: 12000,
    currentCapacity: 8500,
    fuel: 'diesel',
    fuelLevel: 45,
    status: 'in_service',
    co2Emissions: 320,
    lastMaintenance: new Date('2025-08-22')
  },
  {
    id: 'v3',
    registration: 'IJ-789-KL',
    type: 'truck',
    capacity: 6000,
    currentCapacity: 0,
    fuel: 'electric',
    fuelLevel: 90,
    status: 'available',
    co2Emissions: 0,
    lastMaintenance: new Date('2025-10-01')
  },
  {
    id: 'v4',
    registration: 'MN-012-OP',
    type: 'van',
    capacity: 3000,
    currentCapacity: 0,
    fuel: 'hybrid',
    fuelLevel: 82,
    status: 'available',
    co2Emissions: 120,
    lastMaintenance: new Date('2025-09-28')
  },
  {
    id: 'v5',
    registration: 'QR-345-ST',
    type: 'truck',
    capacity: 8000,
    currentCapacity: 0,
    fuel: 'diesel',
    fuelLevel: 15,
    status: 'maintenance',
    co2Emissions: 290,
    lastMaintenance: new Date('2025-07-12')
  }
];

export const mockEmployees: Employee[] = [
  {
    id: 'e1',
    lastName: 'Dubois',
    firstName: 'Pierre',
    employeeNumber: 'EMP001',
    role: 'driver',
    phone: '06 12 34 56 78',
    email: 'p.dubois@city.com',
    status: 'available'
  },
  {
    id: 'e2',
    lastName: 'Martin',
    firstName: 'Sophie',
    employeeNumber: 'EMP002',
    role: 'collector',
    phone: '06 23 45 67 89',
    email: 's.martin@city.com',
    status: 'in_service'
  },
  {
    id: 'e3',
    lastName: 'Bernard',
    firstName: 'Luc',
    employeeNumber: 'EMP003',
    role: 'supervisor',
    phone: '06 34 56 78 90',
    email: 'l.bernard@city.com',
    status: 'available'
  },
  {
    id: 'e4',
    lastName: 'Petit',
    firstName: 'Marie',
    employeeNumber: 'EMP004',
    role: 'driver',
    phone: '06 45 67 89 01',
    email: 'm.petit@city.com',
    status: 'in_service'
  },
  {
    id: 'e5',
    lastName: 'Moreau',
    firstName: 'Jean',
    employeeNumber: 'EMP005',
    role: 'collector',
    phone: '06 56 78 90 12',
    email: 'j.moreau@city.com',
    status: 'available'
  },
  {
    id: 'e6',
    lastName: 'Leroy',
    firstName: 'Claire',
    employeeNumber: 'EMP006',
    role: 'collector',
    phone: '06 67 89 01 23',
    email: 'c.leroy@city.com',
    status: 'off_duty'
  }
];

export const mockTours: Tour[] = [
  {
    id: 't1',
    name: 'Downtown Morning Tour',
    date: new Date('2025-10-15'),
    startTime: '07:00',
    endTime: '11:30',
    vehicleId: 'v2',
    employeeIds: ['e2', 'e4'],
    collectionPointIds: ['1', '2'],
    totalDistance: 15.5,
    estimatedDuration: 180,
    status: 'in_progress',
    estimatedEmissions: 4.34,
    collectedAmount: 850
  },
  {
    id: 't2',
    name: 'North Tour',
    date: new Date('2025-10-15'),
    startTime: '08:00',
    endTime: '12:00',
    vehicleId: 'v1',
    employeeIds: ['e1', 'e5'],
    collectionPointIds: ['3', '4'],
    totalDistance: 22.3,
    estimatedDuration: 240,
    status: 'scheduled',
    estimatedEmissions: 6.24
  },
  {
    id: 't3',
    name: 'Recycling Tour',
    date: new Date('2025-10-15'),
    startTime: '14:00',
    endTime: '17:00',
    vehicleId: 'v3',
    employeeIds: ['e1', 'e2'],
    collectionPointIds: ['2', '5'],
    totalDistance: 18.7,
    estimatedDuration: 180,
    status: 'scheduled',
    estimatedEmissions: 0
  },
  {
    id: 't4',
    name: 'Industrial Zone Tour',
    date: new Date('2025-10-14'),
    startTime: '06:00',
    endTime: '10:30',
    vehicleId: 'v2',
    employeeIds: ['e4', 'e5'],
    collectionPointIds: ['5'],
    totalDistance: 12.8,
    estimatedDuration: 150,
    status: 'completed',
    estimatedEmissions: 4.10,
    collectedAmount: 1200
  }
];

export const mockStatistics: GlobalStatistics = {
  totalCollectionPoints: 45,
  fullPoints: 8,
  availableVehicles: 3,
  activeEmployees: 12,
  toursToday: 6,
  monthlyEmissions: 245.7,
  recyclingRate: 68
};
