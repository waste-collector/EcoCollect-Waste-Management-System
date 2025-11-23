import { Info, Truck, Gauge, Fuel, TrendingDown } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Vehicule } from "../types";

interface VehicleDetailsDialogProps {
  vehicule: Vehicule;
}

export function VehicleDetailsDialog({ vehicule }: VehicleDetailsDialogProps) {
  const getStatusBadge = (statut: string) => {
    switch (statut) {
      case 'in_service':
        return { className: 'bg-green-100 text-green-800 border-green-200', label: 'In Service' };
      case 'available':
        return { className: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Available' };
      case 'maintenance':
        return { className: 'bg-orange-100 text-orange-800 border-orange-200', label: 'Maintenance' };
      default:
        return { className: 'bg-red-100 text-red-800 border-red-200', label: 'Out of Service' };
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'garbage_truck':
        return 'Garbage Truck';
      case 'recycling_truck':
        return 'Recycling Truck';
      case 'small_utility':
        return 'Small Utility';
      default:
        return type;
    }
  };

  const getFuelColor = (niveau: number) => {
    if (niveau < 30) return "bg-red-500";
    if (niveau < 50) return "bg-orange-500";
    return "bg-green-500";
  };

  const statusBadge = getStatusBadge(vehicule.statut);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Info className="h-4 w-4" />
          Details
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Vehicle Details</span>
            <Badge className={statusBadge.className}>{statusBadge.label}</Badge>
          </DialogTitle>
          <DialogDescription>
            Complete information about this vehicle
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Vehicle ID</p>
              <p className="font-mono text-sm">{vehicule.id}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">License Plate</p>
              <p className="font-mono text-sm">{vehicule.immatriculation}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Truck className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="flex-1 space-y-1">
                <p className="text-sm">Vehicle Type</p>
                <p className="text-sm text-muted-foreground">{getTypeLabel(vehicule.type)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Gauge className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="flex-1 space-y-1">
                <p className="text-sm">Capacity</p>
                <p className="text-sm text-muted-foreground">{vehicule.capacite} kg</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Fuel className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="flex-1 space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Fuel Level</span>
                    <span className={vehicule.niveauCarburant < 30 ? 'text-red-600' : vehicule.niveauCarburant < 50 ? 'text-orange-600' : 'text-green-600'}>
                      {vehicule.niveauCarburant}%
                    </span>
                  </div>
                  <Progress value={vehicule.niveauCarburant} indicatorClassName={getFuelColor(vehicule.niveauCarburant)} className="h-2" />
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <TrendingDown className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="flex-1 space-y-1">
                <p className="text-sm">Emissions Rate</p>
                <p className="text-sm text-muted-foreground">{vehicule.emissions} kg CO₂/km</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Current Mileage:</span>
              <span>{vehicule.kilometrage.toLocaleString()} km</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Status:</span>
              <span className="capitalize">{vehicule.statut.replace('_', ' ')}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
