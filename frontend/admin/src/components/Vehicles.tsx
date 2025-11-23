import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Truck, Fuel, Plus, Wrench } from 'lucide-react';
import { mockVehicles } from '../data/mockData';
import { Vehicle } from '../types';

export function Vehicles() {
  const [vehicles] = useState<Vehicle[]>(mockVehicles);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'in_service': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'maintenance': return 'bg-orange-500/10 text-orange-600 border-orange-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getFuelColor = (fuel: string) => {
    switch (fuel) {
      case 'electric': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'hybrid': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'diesel': return 'bg-gray-500/10 text-gray-700 border-gray-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getVehicleType = (type: string) => {
    switch (type) {
      case 'truck': return 'Truck';
      case 'compactor': return 'Compactor';
      case 'van': return 'Van';
      default: return type;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'available': return 'Available';
      case 'in_service': return 'In Service';
      case 'maintenance': return 'Maintenance';
      default: return status;
    }
  };

  const getFuelLevelColor = (level: number) => {
    if (level < 20) return 'bg-destructive';
    if (level < 50) return 'bg-orange-500';
    return 'bg-green-500';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Vehicles</h1>
          <p className="text-muted-foreground">Manage collection vehicle fleet</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Vehicle
        </Button>
      </div>

      {/* Quick statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Total Vehicles</div>
          <div className="text-2xl mt-1">{vehicles.length}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Available</div>
          <div className="text-2xl mt-1 text-green-600">
            {vehicles.filter(v => v.status === 'available').length}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">In Service</div>
          <div className="text-2xl mt-1 text-blue-600">
            {vehicles.filter(v => v.status === 'in_service').length}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">In Maintenance</div>
          <div className="text-2xl mt-1 text-orange-600">
            {vehicles.filter(v => v.status === 'maintenance').length}
          </div>
        </Card>
      </div>

      {/* Vehicle list */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {vehicles.map((vehicle) => (
          <Card key={vehicle.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`h-14 w-14 rounded-lg flex items-center justify-center ${
                    vehicle.status === 'available' ? 'bg-green-500/10' :
                    vehicle.status === 'in_service' ? 'bg-blue-500/10' : 'bg-orange-500/10'
                  }`}>
                    <Truck className={`h-7 w-7 ${
                      vehicle.status === 'available' ? 'text-green-600' :
                      vehicle.status === 'in_service' ? 'text-blue-600' : 'text-orange-600'
                    }`} />
                  </div>
                  <div>
                    <div className="text-lg">{vehicle.registration}</div>
                    <div className="text-sm text-muted-foreground">
                      {getVehicleType(vehicle.type)}
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className={getStatusColor(vehicle.status)}>
                  {getStatusLabel(vehicle.status)}
                </Badge>
              </div>

              <div className="flex gap-2">
                <Badge variant="outline" className={getFuelColor(vehicle.fuel)}>
                  {vehicle.fuel}
                </Badge>
                {vehicle.co2Emissions === 0 ? (
                  <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                    0 emissions
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-gray-500/10 text-gray-700 border-gray-500/20">
                    {vehicle.co2Emissions} g/km CO₂
                  </Badge>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Fuel</div>
                  <div className="flex items-center gap-2">
                    <Fuel className="h-4 w-4 text-muted-foreground" />
                    <span>{vehicle.fuelLevel}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden mt-2">
                    <div
                      className={`h-full transition-all ${getFuelLevelColor(vehicle.fuelLevel)}`}
                      style={{ width: `${vehicle.fuelLevel}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Load</div>
                  <div className="flex items-center gap-2">
                    <span>{((vehicle.currentCapacity / vehicle.capacity) * 100).toFixed(0)}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden mt-2">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${(vehicle.currentCapacity / vehicle.capacity) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Capacity</span>
                  <span>{vehicle.capacity} kg</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Current Load</span>
                  <span>{vehicle.currentCapacity} kg</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Wrench className="h-3 w-3" />
                    Last Maintenance
                  </span>
                  <span>{new Date(vehicle.lastMaintenance).toLocaleDateString('en-US')}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" size="sm">
                  Details
                </Button>
                <Button variant="outline" className="flex-1" size="sm">
                  Schedule Maintenance
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
