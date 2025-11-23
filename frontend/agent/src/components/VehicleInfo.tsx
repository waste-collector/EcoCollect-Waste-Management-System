import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Truck, Fuel, Gauge, AlertTriangle } from "lucide-react";
import { Vehicule } from "../types";
import { Badge } from "./ui/badge";
import { VehicleDetailsDialog } from "./VehicleDetailsDialog";

interface VehicleInfoProps {
  vehicule: Vehicule;
}

export function VehicleInfo({ vehicule }: VehicleInfoProps) {
  const getStatusBadge = (statut: Vehicule['statut']) => {
    const variants: Record<Vehicule['statut'], { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
      available: { label: "Available", variant: "secondary" },
      in_service: { label: "In Service", variant: "default" },
      maintenance: { label: "Maintenance", variant: "outline" },
      out_of_service: { label: "Out of Service", variant: "destructive" }
    };
    return variants[statut];
  };

  const getTypeLabel = (type: Vehicule['type']) => {
    const labels: Record<Vehicule['type'], string> = {
      garbage_truck: "Garbage Truck",
      recycling_truck: "Recycling Truck",
      small_utility: "Small Utility"
    };
    return labels[type];
  };

  const getFuelColor = (niveau: number) => {
    if (niveau < 30) return "bg-red-500";
    if (niveau < 50) return "bg-orange-500";
    return "bg-green-500";
  };

  const statusBadge = getStatusBadge(vehicule.statut);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Assigned Vehicle
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
            <VehicleDetailsDialog vehicule={vehicule} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">License Plate</span>
            <span>{vehicule.immatriculation}</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">Type</span>
            <span>{getTypeLabel(vehicule.type)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Capacity</span>
            <span>{vehicule.capacite} kg</span>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-sm">
                <Fuel className="h-4 w-4 text-muted-foreground" />
                <span>Fuel Level</span>
              </div>
              <span className={`text-sm ${vehicule.niveauCarburant < 30 ? 'text-red-600' : vehicule.niveauCarburant < 50 ? 'text-orange-600' : 'text-green-600'}`}>
                {vehicule.niveauCarburant}%
              </span>
            </div>
            <Progress value={vehicule.niveauCarburant} indicatorClassName={getFuelColor(vehicule.niveauCarburant)} className="h-2" />
            {vehicule.niveauCarburant < 30 && (
              <div className="flex items-center gap-1 mt-1 text-xs text-red-600">
                <AlertTriangle className="h-3 w-3" />
                Low level - Refueling recommended
              </div>
            )}
            {vehicule.niveauCarburant >= 30 && vehicule.niveauCarburant < 50 && (
              <div className="flex items-center gap-1 mt-1 text-xs text-orange-600">
                <AlertTriangle className="h-3 w-3" />
                Medium level - Refueling soon
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Gauge className="h-4 w-4 text-muted-foreground" />
              <span>Mileage</span>
            </div>
            <span>{vehicule.kilometrage.toLocaleString()} km</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}