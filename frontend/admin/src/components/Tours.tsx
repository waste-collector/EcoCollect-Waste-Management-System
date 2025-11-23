import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Route, Plus, Calendar, Clock, MapPin, Truck, Users, TrendingDown, Download, Upload } from 'lucide-react';
import { mockTours, mockVehicles, mockEmployees, mockCollectionPoints } from '../data/mockData';
import { Tour } from '../types';
import { exportToursToXML, importToursFromXML, downloadXML, uploadXML } from '../utils/xmlHandler';
import { toast } from 'sonner';

export function Tours() {
  const [tours, setTours] = useState<Tour[]>(mockTours);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'in_progress': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'completed': return 'bg-gray-500/10 text-gray-700 border-gray-500/20';
      case 'cancelled': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'scheduled': return 'Scheduled';
      case 'in_progress': return 'In Progress';
      case 'completed': return 'Completed';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  const getVehicle = (vehicleId: string) => {
    return mockVehicles.find(v => v.id === vehicleId);
  };

  const getEmployees = (employeeIds: string[]) => {
    return mockEmployees.filter(e => employeeIds.includes(e.id));
  };

  const getPoints = (pointIds: string[]) => {
    return mockCollectionPoints.filter(p => pointIds.includes(p.id));
  };

  const handleExportXML = () => {
    const xmlContent = exportToursToXML(tours);
    downloadXML(xmlContent, 'tours.xml');
    toast.success('Tours exported successfully');
  };

  const handleImportXML = () => {
    uploadXML((content) => {
      try {
        const importedTours = importToursFromXML(content);
        setTours(importedTours);
        toast.success(`Imported ${importedTours.length} tours`);
      } catch (error) {
        toast.error('Failed to import XML file');
        console.error('Import error:', error);
      }
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Tours</h1>
          <p className="text-muted-foreground">Plan and manage collection tours</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleImportXML}>
            <Upload className="h-4 w-4 mr-2" />
            Import XML
          </Button>
          <Button variant="outline" onClick={handleExportXML}>
            <Download className="h-4 w-4 mr-2" />
            Export XML
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Tour
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Plan a New Tour</DialogTitle>
              </DialogHeader>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Tour Name</Label>
                  <Input id="name" placeholder="e.g., Downtown Morning Tour" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vehicle">Vehicle</Label>
                    <Select>
                      <SelectTrigger id="vehicle">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockVehicles.filter(v => v.status === 'available').map(v => (
                          <SelectItem key={v.id} value={v.id}>
                            {v.registration} - {v.type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input id="startTime" type="time" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime">Estimated End Time</Label>
                    <Input id="endTime" type="time" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Team (employees)</Label>
                  <div className="border border-border rounded-lg p-3 space-y-2 max-h-40 overflow-y-auto">
                    {mockEmployees.filter(e => e.status === 'available').map(e => (
                      <label key={e.id} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">
                          {e.firstName} {e.lastName} - {e.role}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Collection Points</Label>
                  <div className="border border-border rounded-lg p-3 space-y-2 max-h-48 overflow-y-auto">
                    {mockCollectionPoints.map(p => (
                      <label key={p.id} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm flex-1">
                          {p.name} - {p.fillLevel}% full
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {p.wasteType}
                        </Badge>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Schedule Tour</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Quick statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Total Tours</div>
          <div className="text-2xl mt-1">{tours.length}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">In Progress</div>
          <div className="text-2xl mt-1 text-green-600">
            {tours.filter(t => t.status === 'in_progress').length}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Scheduled</div>
          <div className="text-2xl mt-1 text-blue-600">
            {tours.filter(t => t.status === 'scheduled').length}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Completed</div>
          <div className="text-2xl mt-1 text-gray-600">
            {tours.filter(t => t.status === 'completed').length}
          </div>
        </Card>
      </div>

      {/* Tour list */}
      <div className="space-y-4">
        {tours.map((tour) => {
          const vehicle = getVehicle(tour.vehicleId);
          const employees = getEmployees(tour.employeeIds);
          const points = getPoints(tour.collectionPointIds);

          return (
            <Card key={tour.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                      tour.status === 'in_progress' ? 'bg-green-500/10' :
                      tour.status === 'scheduled' ? 'bg-blue-500/10' : 'bg-gray-500/10'
                    }`}>
                      <Route className={`h-6 w-6 ${
                        tour.status === 'in_progress' ? 'text-green-600' :
                        tour.status === 'scheduled' ? 'text-blue-600' : 'text-gray-600'
                      }`} />
                    </div>
                    <div>
                      <div className="text-lg">{tour.name}</div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(tour.date).toLocaleDateString('en-US')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {tour.startTime} - {tour.endTime}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className={getStatusColor(tour.status)}>
                    {getStatusLabel(tour.status)}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Truck className="h-3 w-3" />
                      Vehicle
                    </div>
                    <div className="text-sm">
                      {vehicle?.registration}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      Team
                    </div>
                    <div className="text-sm">
                      {employees.map(e => `${e.firstName} ${e.lastName}`).join(', ')}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      Collection Points
                    </div>
                    <div className="text-sm">
                      {points.length} point{points.length > 1 ? 's' : ''}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <TrendingDown className="h-3 w-3" />
                      CO₂ Emissions
                    </div>
                    <div className="text-sm">
                      {tour.estimatedEmissions.toFixed(2)} kg
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 pt-4 border-t border-border text-sm">
                  <div>
                    <span className="text-muted-foreground">Distance: </span>
                    <span>{tour.totalDistance} km</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Estimated Duration: </span>
                    <span>{Math.floor(tour.estimatedDuration / 60)}h {tour.estimatedDuration % 60}min</span>
                  </div>
                  {tour.collectedAmount && (
                    <div>
                      <span className="text-muted-foreground">Collected: </span>
                      <span>{tour.collectedAmount} kg</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    Optimize Route
                  </Button>
                  {tour.status === 'scheduled' && (
                    <Button variant="outline" size="sm" className="ml-auto">
                      Start
                    </Button>
                  )}
                  {tour.status === 'in_progress' && (
                    <Button variant="outline" size="sm" className="ml-auto">
                      Complete
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
