import { Info, Clock, MapPin, Fuel, TrendingUp } from "lucide-react";
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
import { Tournee } from "../types";

interface RouteDetailsDialogProps {
  tournee: Tournee;
}

export function RouteDetailsDialog({ tournee }: RouteDetailsDialogProps) {
  const getStatusBadge = (statut: string) => {
    switch (statut) {
      case 'completed':
        return { variant: 'default' as const, label: 'Completed', className: 'bg-green-100 text-green-800 border-green-200' };
      case 'in_progress':
        return { variant: 'default' as const, label: 'In Progress', className: 'bg-orange-100 text-orange-800 border-orange-200' };
      case 'planned':
        return { variant: 'default' as const, label: 'Planned', className: 'bg-blue-100 text-blue-800 border-blue-200' };
      default:
        return { variant: 'outline' as const, label: 'Cancelled', className: 'bg-red-100 text-red-800 border-red-200' };
    }
  };

  const statusBadge = getStatusBadge(tournee.statut);

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
            <span>Route Details</span>
            <Badge className={statusBadge.className}>{statusBadge.label}</Badge>
          </DialogTitle>
          <DialogDescription>
            Complete information about this route
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Route ID</p>
              <p className="font-mono text-sm">{tournee.id}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="text-sm">{tournee.date.toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
              })}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="flex-1 space-y-1">
                <p className="text-sm">Schedule</p>
                <p className="text-sm text-muted-foreground">
                  {tournee.heureDebut} - {tournee.heureFin} ({Math.floor(tournee.tempsEstime / 60)}h {tournee.tempsEstime % 60}min)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="flex-1 space-y-1">
                <p className="text-sm">Collection Points</p>
                <p className="text-sm text-muted-foreground">
                  {tournee.pointsCollectes} / {tournee.pointsCollecte.length} completed
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Fuel className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="flex-1 space-y-1">
                <p className="text-sm">Distance</p>
                <p className="text-sm text-muted-foreground">{tournee.distanceTotale} km</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <TrendingUp className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="flex-1 space-y-1">
                <p className="text-sm">Estimated Emissions</p>
                <p className="text-sm text-muted-foreground">{tournee.emissionsEstimees} kg CO₂</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Vehicle ID:</span>
              <span className="font-mono">{tournee.vehiculeId}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Driver ID:</span>
              <span className="font-mono">{tournee.chauffeurId}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Agents:</span>
              <span className="font-mono">{tournee.agentsIds.join(', ')}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
