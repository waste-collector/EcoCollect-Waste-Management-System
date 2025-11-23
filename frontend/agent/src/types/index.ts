// Type definitions for the waste management system

export interface Employe {
  id: string;
  nom: string;
  prenom: string;
  role: 'driver' | 'collector' | 'supervisor';
  telephone: string;
  email: string;
  vehiculeAssigne?: string;
}

export interface PointCollecte {
  id: string;
  adresse: string;
  latitude: number;
  longitude: number;
  typeDechet: 'household_waste' | 'recyclable' | 'glass' | 'organic';
  niveauRemplissage: number; // 0-100
  capacite: number; // in liters
  statut: 'pending' | 'in_progress' | 'collected' | 'issue';
  derniereCollecte?: Date;
}

export interface Vehicule {
  id: string;
  immatriculation: string;
  type: 'garbage_truck' | 'recycling_truck' | 'small_utility';
  capacite: number; // in kg
  niveauCarburant: number; // 0-100
  kilometrage: number;
  statut: 'available' | 'in_service' | 'maintenance' | 'out_of_service';
  emissions: number; // kg CO2/km
}

export interface Tournee {
  id: string;
  date: Date;
  heureDebut: string;
  heureFin: string;
  vehiculeId: string;
  chauffeurId: string;
  agentsIds: string[];
  pointsCollecte: string[];
  statut: 'planned' | 'in_progress' | 'completed' | 'cancelled';
  distanceTotale: number; // in km
  tempsEstime: number; // in minutes
  pointsCollectes: number;
  emissionsEstimees: number; // kg CO2
}

export interface TacheCollecte {
  id: string;
  pointCollecteId: string;
  tourneeId: string;
  ordre: number;
  heureArrivee?: Date;
  heureDepart?: Date;
  statut: 'pending' | 'in_progress' | 'completed' | 'issue';
  notes?: string;
  quantiteCollectee?: number;
}

export interface Incident {
  id: string;
  type: 'blocked_access' | 'equipment_failure' | 'safety_hazard' | 'overfilled' | 'contamination' | 'other';
  description: string;
  pointCollecteId?: string;
  tourneeId: string;
  reportedBy: string;
  reportedAt: Date;
  status: 'reported' | 'acknowledged' | 'resolved';
  priority: 'low' | 'medium' | 'high';
}