import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Badge } from './ui/badge';
import { MapPin, Plus, Search, Trash2, Download, Upload } from 'lucide-react';
import { mockCollectionPoints } from '../data/mockData';
import { CollectionPoint } from '../types';
import { exportCollectionPointsToXML, importCollectionPointsFromXML, downloadXML, uploadXML } from '../utils/xmlHandler';
import { toast } from 'sonner';

export function CollectionPoints() {
  const [points, setPoints] = useState<CollectionPoint[]>(mockCollectionPoints);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredPoints = points.filter(point => {
    const matchesSearch = point.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         point.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || point.wasteType === filterType;
    return matchesSearch && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'full': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'maintenance': return 'bg-orange-500/10 text-orange-600 border-orange-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'general': return 'bg-gray-500/10 text-gray-700 border-gray-500/20';
      case 'recyclable': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'glass': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'organic': return 'bg-orange-500/10 text-orange-600 border-orange-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getFillLevelColor = (level: number) => {
    if (level >= 90) return 'bg-destructive';
    if (level >= 70) return 'bg-orange-500';
    if (level >= 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const handleExportXML = () => {
    const xmlContent = exportCollectionPointsToXML(points);
    downloadXML(xmlContent, 'collection-points.xml');
    toast.success('Collection points exported successfully');
  };

  const handleImportXML = () => {
    uploadXML((content) => {
      try {
        const importedPoints = importCollectionPointsFromXML(content);
        setPoints(importedPoints);
        toast.success(`Imported ${importedPoints.length} collection points`);
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
          <h1>Collection Points</h1>
          <p className="text-muted-foreground">Manage containers and collection points</p>
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
                New Point
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add Collection Point</DialogTitle>
              </DialogHeader>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Point Name</Label>
                    <Input id="name" placeholder="e.g., Downtown A" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Waste Type</Label>
                    <Select>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="recyclable">Recyclable</SelectItem>
                        <SelectItem value="glass">Glass</SelectItem>
                        <SelectItem value="organic">Organic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="15 Republic Street" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="latitude">Latitude</Label>
                    <Input id="latitude" type="number" step="0.0001" placeholder="48.8566" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="longitude">Longitude</Label>
                    <Input id="longitude" type="number" step="0.0001" placeholder="2.3522" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacity (liters)</Label>
                  <Input id="capacity" type="number" placeholder="1100" />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search collection points..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Waste Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="general">General</SelectItem>
            <SelectItem value="recyclable">Recyclable</SelectItem>
            <SelectItem value="glass">Glass</SelectItem>
            <SelectItem value="organic">Organic</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Points list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPoints.map((point) => (
          <Card key={point.id} className="p-5 hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                    point.status === 'full' ? 'bg-destructive/10' : 'bg-primary/10'
                  }`}>
                    <Trash2 className={`h-5 w-5 ${
                      point.status === 'full' ? 'text-destructive' : 'text-primary'
                    }`} />
                  </div>
                  <div>
                    <div>{point.name}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {point.address}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Badge variant="outline" className={getTypeColor(point.wasteType)}>
                  {point.wasteType}
                </Badge>
                <Badge variant="outline" className={getStatusColor(point.status)}>
                  {point.status}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Fill Level</span>
                  <span>{point.fillLevel}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${getFillLevelColor(point.fillLevel)}`}
                    style={{ width: `${point.fillLevel}%` }}
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-border space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Capacity</span>
                  <span>{point.capacity}L</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Last Collection</span>
                  <span>{new Date(point.lastCollection).toLocaleDateString('en-US')}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
