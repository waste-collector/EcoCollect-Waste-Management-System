import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Route, Clock, MapPin, Leaf, Package } from "lucide-react";
import { Tournee, TacheCollecte } from "../types";
import { RouteDetailsDialog } from "./RouteDetailsDialog";

interface RouteProgressProps {
  tournee: Tournee;
  taches?: TacheCollecte[];
}

export function RouteProgress({ tournee, taches }: RouteProgressProps) {
  const progress = (tournee.pointsCollectes / tournee.pointsCollecte.length) * 100;
  
  const getStatusBadge = (statut: Tournee['statut']) => {
    const variants: Record<Tournee['statut'], { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
      planned: { label: "Planned", variant: "secondary" },
      in_progress: { label: "In Progress", variant: "default" },
      completed: { label: "Completed", variant: "outline" },
      cancelled: { label: "Cancelled", variant: "destructive" }
    };
    return variants[statut];
  };

  const getProgressColor = (progress: number) => {
    if (progress === 0) return "bg-red-500";
    if (progress < 50) return "bg-orange-500";
    if (progress < 100) return "bg-yellow-500";
    return "bg-green-500";
  };

  const statusBadge = getStatusBadge(tournee.statut);

  // Calculate total collected quantity
  const totalCollected = taches?.reduce((sum, t) => sum + (t.quantiteCollectee || 0), 0) || 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Route className="h-5 w-5" />
            Today's Route
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
            <RouteDetailsDialog tournee={tournee} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className={progress === 0 ? "text-red-600" : progress < 50 ? "text-orange-600" : progress < 100 ? "text-yellow-600" : "text-green-600"}>
              {tournee.pointsCollectes} / {tournee.pointsCollecte.length} points
            </span>
          </div>
          <Progress value={progress} indicatorClassName={getProgressColor(progress)} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="text-sm">Schedule</span>
            </div>
            <p className="text-sm">{tournee.heureDebut} - {tournee.heureFin}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">Distance</span>
            </div>
            <p className="text-sm">{tournee.distanceTotale} km</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Leaf className="h-4 w-4" />
              <span className="text-sm">CO₂ Emissions</span>
            </div>
            <p className="text-sm">{tournee.emissionsEstimees.toFixed(1)} kg</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="text-sm">Estimated Time</span>
            </div>
            <p className="text-sm">{Math.floor(tournee.tempsEstime / 60)}h {tournee.tempsEstime % 60}min</p>
          </div>
        </div>

        {totalCollected > 0 && (
          <div className="pt-2 border-t">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Package className="h-4 w-4" />
                <span className="text-sm">Total Collected</span>
              </div>
              <p className="text-green-600">{totalCollected} L</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}