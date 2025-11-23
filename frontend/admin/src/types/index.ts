// Types for urban waste management

export interface CollectionPoint {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  wasteType: 'general' | 'recyclable' | 'glass' | 'organic';
  capacity: number; // in liters
  fillLevel: number; // percentage
  lastCollection: Date;
  status: 'active' | 'full' | 'maintenance';
}

export interface Vehicle {
  id: string;
  registration: string;
  type: 'truck' | 'compactor' | 'van';
  capacity: number; // in kg
  currentCapacity: number; // in kg
  fuel: 'diesel' | 'electric' | 'hybrid';
  fuelLevel: number; // percentage
  status: 'available' | 'in_service' | 'maintenance';
  co2Emissions: number; // g/km
  lastMaintenance: Date;
}

export interface Employee {
  id: string;
  lastName: string;
  firstName: string;
  employeeNumber: string;
  role: 'driver' | 'collector' | 'supervisor';
  phone: string;
  email: string;
  status: 'available' | 'in_service' | 'off_duty';
  photo?: string;
}

export interface Tour {
  id: string;
  name: string;
  date: Date;
  startTime: string;
  endTime: string;
  vehicleId: string;
  employeeIds: string[];
  collectionPointIds: string[];
  totalDistance: number; // in km
  estimatedDuration: number; // in minutes
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  estimatedEmissions: number; // in kg CO2
  collectedAmount?: number; // in kg
}

export interface GlobalStatistics {
  totalCollectionPoints: number;
  fullPoints: number;
  availableVehicles: number;
  activeEmployees: number;
  toursToday: number;
  monthlyEmissions: number;
  recyclingRate: number;
}
