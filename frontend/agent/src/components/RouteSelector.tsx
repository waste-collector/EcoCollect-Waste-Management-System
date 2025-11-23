import { Clock, MapPin, CheckCircle2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";
import { Tournee } from "../types";

interface RouteSelectorProps {
  routes: Tournee[];
  selectedRouteId: string;
  onSelectRoute: (routeId: string) => void;
}

export function RouteSelector({ routes, selectedRouteId, onSelectRoute }: RouteSelectorProps) {
  const getStatusBadge = (statut: string) => {
    switch (statut) {
      case 'completed':
        return { className: 'bg-green-100 text-green-800 border-green-200', label: 'Completed' };
      case 'in_progress':
        return { className: 'bg-orange-100 text-orange-800 border-orange-200', label: 'In Progress' };
      case 'planned':
        return { className: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Planned' };
      default:
        return { className: 'bg-red-100 text-red-800 border-red-200', label: 'Cancelled' };
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm text-muted-foreground">Select Route</label>
      <Select value={selectedRouteId} onValueChange={onSelectRoute}>
        <SelectTrigger className="w-full h-16 px-4 flex items-center" style={{ height: '60px', padding: '0 16px' }}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {routes.map((route) => {
            const statusBadge = getStatusBadge(route.statut);
            return (
              <SelectItem key={route.id} value={route.id} className="h-20">
                <div className="flex items-center gap-3 py-1">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-sm">{route.id}</span>
                      <Badge className={`${statusBadge.className} text-xs`}>
                        {statusBadge.label}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{route.heureDebut} - {route.heureFin}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{route.pointsCollecte.length} points</span>
                      </div>
                      {route.statut === 'completed' && (
                        <div className="flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>Done</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
