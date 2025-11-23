import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { 
  MapPin, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Trash2,
  Recycle,
  Wine,
  Leaf
} from "lucide-react";
import { PointCollecte, TacheCollecte } from "../types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface CollectionPointsListProps {
  points: PointCollecte[];
  taches: TacheCollecte[];
  onCompleteTask: (tacheId: string, quantite: number, notes?: string) => void;
  onStartTask: (tacheId: string) => void;
}

export function CollectionPointsList({ 
  points, 
  taches,
  onCompleteTask,
  onStartTask 
}: CollectionPointsListProps) {
  const [selectedTask, setSelectedTask] = useState<TacheCollecte | null>(null);
  const [quantite, setQuantite] = useState("");
  const [notes, setNotes] = useState("");

  const getWasteIcon = (type: PointCollecte['typeDechet']) => {
    const icons: Record<PointCollecte['typeDechet'], React.ReactNode> = {
      household_waste: <Trash2 className="h-4 w-4" />,
      recyclable: <Recycle className="h-4 w-4" />,
      glass: <Wine className="h-4 w-4" />,
      organic: <Leaf className="h-4 w-4" />
    };
    return icons[type];
  };

  const getWasteLabel = (type: PointCollecte['typeDechet']) => {
    const labels: Record<PointCollecte['typeDechet'], string> = {
      household_waste: "Household Waste",
      recyclable: "Recyclable",
      glass: "Glass",
      organic: "Organic"
    };
    return labels[type];
  };

  const getStatusBadge = (statut: PointCollecte['statut']) => {
    const variants: Record<PointCollecte['statut'], { label: string; variant: "default" | "secondary" | "destructive" | "outline"; icon: React.ReactNode; colorClass: string }> = {
      pending: { 
        label: "Pending", 
        variant: "secondary",
        icon: <Clock className="h-3 w-3" />,
        colorClass: "bg-gray-100 text-gray-700 border-gray-300"
      },
      in_progress: { 
        label: "In Progress", 
        variant: "default",
        icon: <Clock className="h-3 w-3" />,
        colorClass: "bg-orange-100 text-orange-700 border-orange-300"
      },
      collected: { 
        label: "Collected", 
        variant: "outline",
        icon: <CheckCircle2 className="h-3 w-3" />,
        colorClass: "bg-green-100 text-green-700 border-green-300"
      },
      issue: { 
        label: "Issue", 
        variant: "destructive",
        icon: <AlertCircle className="h-3 w-3" />,
        colorClass: "bg-red-100 text-red-700 border-red-300"
      }
    };
    return variants[statut];
  };

  const getFillColor = (niveau: number) => {
    if (niveau >= 80) return "text-red-600";
    if (niveau >= 60) return "text-orange-600";
    if (niveau >= 40) return "text-yellow-600";
    return "text-green-600";
  };

  const getFillProgressColor = (niveau: number) => {
    if (niveau >= 80) return "bg-red-500";
    if (niveau >= 60) return "bg-orange-500";
    if (niveau >= 40) return "bg-yellow-500";
    return "bg-green-500";
  };

  const handleComplete = () => {
    if (selectedTask) {
      onCompleteTask(selectedTask.id, parseFloat(quantite) || 0, notes);
      setSelectedTask(null);
      setQuantite("");
      setNotes("");
    }
  };

  // Sort taches by ordre
  const sortedTaches = [...taches].sort((a, b) => a.ordre - b.ordre);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Collection Points
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sortedTaches.map((tache) => {
              const point = points.find(p => p.id === tache.pointCollecteId);
              if (!point) return null;
              
              const statusBadge = getStatusBadge(point.statut);
              const fillColor = getFillColor(point.niveauRemplissage);

              return (
                <div 
                  key={tache.id}
                  className="border rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs">
                          {tache.ordre}
                        </span>
                        <h4 className="truncate">{point.adresse}</h4>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        {getWasteIcon(point.typeDechet)}
                        <span>{getWasteLabel(point.typeDechet)}</span>
                      </div>
                    </div>
                    <Badge className={`flex items-center gap-1 shrink-0 ${statusBadge.colorClass}`}>
                      {statusBadge.icon}
                      {statusBadge.label}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Fill Level</span>
                      <span className={fillColor}>{point.niveauRemplissage}%</span>
                    </div>
                    <Progress value={point.niveauRemplissage} indicatorClassName={getFillProgressColor(point.niveauRemplissage)} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      Capacity: {point.capacite}L
                    </div>
                  </div>

                  {point.statut === 'pending' && (
                    <Button 
                      onClick={() => onStartTask(tache.id)}
                      className="w-full"
                      variant="outline"
                    >
                      Start Collection
                    </Button>
                  )}

                  {point.statut === 'in_progress' && (
                    <Button 
                      onClick={() => {
                        setSelectedTask(tache);
                        setQuantite(((point.niveauRemplissage / 100) * point.capacite).toString());
                      }}
                      className="w-full"
                    >
                      Mark as Completed
                    </Button>
                  )}

                  {tache.statut === 'completed' && tache.quantiteCollectee && (
                    <div className="text-sm text-green-700 bg-green-50 border border-green-200 p-2 rounded">
                      Collected quantity: {tache.quantiteCollectee}L
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Dialog open={selectedTask !== null} onOpenChange={() => setSelectedTask(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Collection</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="quantite">Collected Quantity (liters)</Label>
              <Input
                id="quantite"
                type="number"
                value={quantite}
                onChange={(e) => setQuantite(e.target.value)}
                placeholder="Ex: 850"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (optional)</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add observations..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedTask(null)}>
              Cancel
            </Button>
            <Button onClick={handleComplete}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}