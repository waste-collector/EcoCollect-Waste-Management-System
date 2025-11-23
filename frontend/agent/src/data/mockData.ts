import { Employe, PointCollecte, Vehicule, Tournee, TacheCollecte } from '../types';

// Current logged-in agent
export const currentAgent: Employe = {
  id: 'emp001',
  nom: 'Johnson',
  prenom: 'Mike',
  role: 'collector',
  telephone: '+1 (555) 123-4567',
  email: 'm.johnson@wastemanagement.com',
  vehiculeAssigne: 'veh001'
};

export const employes: Employe[] = [
  currentAgent,
  {
    id: 'emp002',
    nom: 'Smith',
    prenom: 'Sarah',
    role: 'driver',
    telephone: '+1 (555) 234-5678',
    email: 's.smith@wastemanagement.com',
    vehiculeAssigne: 'veh001'
  },
  {
    id: 'emp003',
    nom: 'Davis',
    prenom: 'Robert',
    role: 'supervisor',
    telephone: '+1 (555) 345-6789',
    email: 'r.davis@wastemanagement.com'
  }
];

export const vehicules: Vehicule[] = [
  {
    id: 'veh001',
    immatriculation: 'WM-12345',
    type: 'garbage_truck',
    capacite: 5000,
    niveauCarburant: 75,
    kilometrage: 45230,
    statut: 'in_service',
    emissions: 0.85
  },
  {
    id: 'veh002',
    immatriculation: 'WM-67890',
    type: 'recycling_truck',
    capacite: 3500,
    niveauCarburant: 45,
    kilometrage: 32100,
    statut: 'available',
    emissions: 0.72
  }
];

export const pointsCollecte: PointCollecte[] = [
  {
    id: 'pc001',
    adresse: '123 Main Street, Downtown District',
    latitude: 40.7128,
    longitude: -74.0060,
    typeDechet: 'household_waste',
    niveauRemplissage: 85,
    capacite: 1100,
    statut: 'pending',
    derniereCollecte: new Date('2025-11-20')
  },
  {
    id: 'pc002',
    adresse: '456 Oak Avenue, Riverside',
    latitude: 40.7589,
    longitude: -73.9851,
    typeDechet: 'recyclable',
    niveauRemplissage: 65,
    capacite: 800,
    statut: 'pending',
    derniereCollecte: new Date('2025-11-19')
  },
  {
    id: 'pc003',
    adresse: '789 Elm Boulevard, Westside',
    latitude: 40.7489,
    longitude: -73.9680,
    typeDechet: 'glass',
    niveauRemplissage: 40,
    capacite: 500,
    statut: 'pending',
    derniereCollecte: new Date('2025-11-17')
  },
  {
    id: 'pc004',
    adresse: '321 Pine Street, Eastwood',
    latitude: 40.7282,
    longitude: -74.0776,
    typeDechet: 'household_waste',
    niveauRemplissage: 92,
    capacite: 1100,
    statut: 'in_progress',
    derniereCollecte: new Date('2025-11-19')
  },
  {
    id: 'pc005',
    adresse: '654 Maple Drive, Parkview',
    latitude: 40.7831,
    longitude: -73.9712,
    typeDechet: 'organic',
    niveauRemplissage: 70,
    capacite: 660,
    statut: 'pending',
    derniereCollecte: new Date('2025-11-20')
  },
  {
    id: 'pc006',
    adresse: '987 Cedar Lane, Hillside',
    latitude: 40.7580,
    longitude: -73.9855,
    typeDechet: 'recyclable',
    niveauRemplissage: 55,
    capacite: 800,
    statut: 'collected',
    derniereCollecte: new Date('2025-11-22')
  }
];

export const tournees: Tournee[] = [
  {
    id: 'tour001',
    date: new Date('2025-11-23'),
    heureDebut: '06:00',
    heureFin: '10:30',
    vehiculeId: 'veh001',
    chauffeurId: 'emp002',
    agentsIds: ['emp001'],
    pointsCollecte: ['pc001', 'pc004', 'pc005'],
    statut: 'in_progress',
    distanceTotale: 18.5,
    tempsEstime: 270,
    pointsCollectes: 1,
    emissionsEstimees: 15.7
  },
  {
    id: 'tour002',
    date: new Date('2025-11-23'),
    heureDebut: '11:00',
    heureFin: '14:30',
    vehiculeId: 'veh001',
    chauffeurId: 'emp002',
    agentsIds: ['emp001'],
    pointsCollecte: ['pc002', 'pc003'],
    statut: 'planned',
    distanceTotale: 12.3,
    tempsEstime: 210,
    pointsCollectes: 0,
    emissionsEstimees: 10.5
  },
  {
    id: 'tour003',
    date: new Date('2025-11-22'),
    heureDebut: '06:00',
    heureFin: '13:30',
    vehiculeId: 'veh001',
    chauffeurId: 'emp002',
    agentsIds: ['emp001'],
    pointsCollecte: ['pc006'],
    statut: 'completed',
    distanceTotale: 8.2,
    tempsEstime: 120,
    pointsCollectes: 1,
    emissionsEstimees: 7.0
  }
];

export const taches: TacheCollecte[] = [
  // Tour001 tasks (in_progress)
  {
    id: 'task001',
    pointCollecteId: 'pc001',
    tourneeId: 'tour001',
    ordre: 1,
    statut: 'pending'
  },
  {
    id: 'task002',
    pointCollecteId: 'pc004',
    tourneeId: 'tour001',
    ordre: 2,
    heureArrivee: new Date('2025-11-23T07:30:00'),
    statut: 'in_progress',
    quantiteCollectee: 980
  },
  {
    id: 'task003',
    pointCollecteId: 'pc005',
    tourneeId: 'tour001',
    ordre: 3,
    statut: 'pending'
  },
  // Tour002 tasks (planned)
  {
    id: 'task004',
    pointCollecteId: 'pc002',
    tourneeId: 'tour002',
    ordre: 1,
    statut: 'pending'
  },
  {
    id: 'task005',
    pointCollecteId: 'pc003',
    tourneeId: 'tour002',
    ordre: 2,
    statut: 'pending'
  },
  // Tour003 tasks (completed)
  {
    id: 'task006',
    pointCollecteId: 'pc006',
    tourneeId: 'tour003',
    ordre: 1,
    heureArrivee: new Date('2025-11-22T06:30:00'),
    heureDepart: new Date('2025-11-22T06:45:00'),
    statut: 'completed',
    quantiteCollectee: 440
  }
];