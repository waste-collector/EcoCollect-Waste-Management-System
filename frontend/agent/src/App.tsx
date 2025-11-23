import { useState } from "react";
import { 
  Menu, 
  Home, 
  Route, 
  MapPin, 
  Truck,
  User,
  LogOut,
  AlertTriangle
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./components/ui/sheet";
import { Avatar, AvatarFallback } from "./components/ui/avatar";
import { Toaster } from "./components/ui/sonner";
import { DashboardStats } from "./components/DashboardStats";
import { VehicleInfo } from "./components/VehicleInfo";
import { RouteProgress } from "./components/RouteProgress";
import { CollectionPointsList } from "./components/CollectionPointsList";
import { RouteSelector } from "./components/RouteSelector";
import { IncidentReportDialog } from "./components/IncidentReportDialog";
import { 
  currentAgent, 
  vehicules, 
  pointsCollecte, 
  tournees, 
  taches 
} from "./data/mockData";
import { PointCollecte, TacheCollecte, Incident } from "./types";
import { toast } from "sonner";

import { Card } from './components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

import { ReportProblem } from "./components/ReportProblem";

type TabType = "dashboard" | "route" | "points" | "vehicle" | "report";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [points, setPoints] = useState<PointCollecte[]>(pointsCollecte);
  const [tasks, setTasks] = useState<TacheCollecte[]>(taches);
  const [incidents, setIncidents] = useState<Incident[]>([]);

  // Get today's date
  const today = new Date('2025-11-23');
  
  // Get all routes for current agent on today's date
  const todayRoutes = tournees.filter(t => 
    t.agentsIds.includes(currentAgent.id) && 
    t.date.toDateString() === today.toDateString()
  );

  // Selected route state
  const [selectedRouteId, setSelectedRouteId] = useState<string>(
    todayRoutes.find(t => t.statut === 'in_progress')?.id || todayRoutes[0]?.id || ''
  );

  // Get current tournee
  const currentTournee = todayRoutes.find(t => t.id === selectedRouteId);
  
  // Get assigned vehicle
  const assignedVehicle = vehicules.find(v => v.id === currentAgent.vehiculeAssigne);

  // Get tasks for current tournee
  const currentTasks = tasks.filter(t => t.tourneeId === currentTournee?.id);

  // Get collection points for current route only
  const currentRoutePoints = points.filter(p => 
    currentTournee?.pointsCollecte.includes(p.id)
  );

  // Calculate stats
  const totalPoints = currentTasks.length;
  const pointsCompletes = currentTasks.filter(t => t.statut === 'completed').length;
  const pointsEnCours = currentTasks.filter(t => t.statut === 'in_progress').length;
  
  // Calculate remaining time (simplified)
  const tempsRestant = currentTournee 
    ? `${Math.floor((currentTournee.tempsEstime * (1 - pointsCompletes / totalPoints)) / 60)}h ${Math.floor((currentTournee.tempsEstime * (1 - pointsCompletes / totalPoints)) % 60)}min`
    : "0h 0min";

  const handleStartTask = (tacheId: string) => {
    setTasks(prev => prev.map(t => 
      t.id === tacheId 
        ? { ...t, statut: 'in_progress', heureArrivee: new Date() }
        : t
    ));
    
    setPoints(prev => prev.map(p => {
      const task = tasks.find(t => t.id === tacheId);
      return p.id === task?.pointCollecteId 
        ? { ...p, statut: 'in_progress' }
        : p;
    }));

    toast.success("Task started successfully");
  };

  const handleCompleteTask = (tacheId: string, quantite: number, notes?: string) => {
    setTasks(prev => prev.map(t => 
      t.id === tacheId 
        ? { 
            ...t, 
            statut: 'completed', 
            heureDepart: new Date(),
            quantiteCollectee: quantite,
            notes 
          }
        : t
    ));
    
    setPoints(prev => prev.map(p => {
      const task = tasks.find(t => t.id === tacheId);
      return p.id === task?.pointCollecteId 
        ? { ...p, statut: 'collected', niveauRemplissage: 0 }
        : p;
    }));

    toast.success("Collection completed successfully");
  };

  const handleReportIncident = (incident: Omit<Incident, 'id' | 'reportedAt' | 'status'>) => {
    const newIncident: Incident = {
      ...incident,
      id: `inc${incidents.length + 1}`,
      reportedAt: new Date(),
      status: 'reported'
    };
    
    setIncidents(prev => [...prev, newIncident]);
    toast.success("Incident reported successfully");
  };

 // Data for collection by type chart
  const collectionByType = [
    { type: 'General', quantity: 3200 },
    { type: 'Recyclable', quantity: 2100 },
    { type: 'Glass', quantity: 850 },
    { type: 'Organic', quantity: 1450 }
  ];

  // Data for waste distribution pie chart
  const wasteDistribution = [
    { name: 'General', value: 42, color: '#ef4444' },
    { name: 'Recyclable', value: 28, color: '#22c55e' },
    { name: 'Glass', value: 11, color: '#3b82f6' },
    { name: 'Organic', value: 19, color: '#f59e0b' }
  ];

  const MenuItems = () => (
    <nav className="flex flex-col gap-2">
      <Button
        variant={activeTab === "dashboard" ? "default" : "ghost"}
        className="justify-start"
        onClick={() => setActiveTab("dashboard")}
      >
        <Home className="mr-2 h-4 w-4" />
        Dashboard
      </Button>
      <Button
        variant={activeTab === "route" ? "default" : "ghost"}
        className="justify-start"
        onClick={() => setActiveTab("route")}
      >
        <Route className="mr-2 h-4 w-4" />
        My Route
      </Button>
      <Button
        variant={activeTab === "points" ? "default" : "ghost"}
        className="justify-start"
        onClick={() => setActiveTab("points")}
      >
        <MapPin className="mr-2 h-4 w-4" />
        Collection Points
      </Button>
      <Button
        variant={activeTab === "vehicle" ? "default" : "ghost"}
        className="justify-start"
        onClick={() => setActiveTab("vehicle")}
      >
        <Truck className="mr-2 h-4 w-4" />
        My Vehicle
      </Button>
      <Button
        variant={activeTab === "report" ? "default" : "ghost"}
        className="justify-start"
        onClick={() => setActiveTab("report")}
      >
        <AlertTriangle className="mr-2 h-4 w-4" />
        Report Incident
      </Button>
    </nav>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center gap-4 px-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <div className="py-4">
                <MenuItems />
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex items-center gap-2">
            <img 
              src="/image/logo.png"
              alt="EcoCollect Logo"
              className="h-8 w-8 object-cover"
              style={{ borderRadius: '10px' }}
            />
            <div>
                <div className="text-sm">EcoCollect</div>
                <div className="text-xs text-muted-foreground">Waste Management</div>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  {currentAgent.prenom[0]}{currentAgent.nom[0]}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-sm">
                <p>{currentAgent.prenom} {currentAgent.nom}</p>
                <p className="text-xs text-muted-foreground">Collection Agent</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden md:flex w-64 flex-col border-r bg-background p-4 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
          <MenuItems />
          
          <div className="mt-auto pt-4 border-t">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-muted">
              <User className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1 min-w-0 text-sm">
                <p className="truncate">{currentAgent.prenom} {currentAgent.nom}</p>
                <p className="text-xs text-muted-foreground truncate">{currentAgent.email}</p>
              </div>
            </div>
            <Button variant="ghost" className="w-full justify-start mt-2" size="sm">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {activeTab === "dashboard" && (
              <>
                <div>
                  <h2>Dashboard</h2>
                  <p className="text-muted-foreground">
                    Overview of your daily routes
                  </p>
                </div>

                <DashboardStats
                  totalPoints={totalPoints}
                  pointsCompletes={pointsCompletes}
                  pointsEnCours={pointsEnCours}
                  tempsRestant={tempsRestant}
                />

                <div className="grid gap-6 md:grid-cols-2">
                  {currentTournee && <RouteProgress tournee={currentTournee} taches={currentTasks} />}
                  {assignedVehicle && <VehicleInfo vehicule={assignedVehicle} />}
                </div>

                {/* Charts */}
                <div className="grid grid-cols-2 lg:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <h3 className="mb-4">Collection by Waste Type (kg)</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={collectionByType}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                        <XAxis dataKey="type" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="quantity" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </Card>

                  <Card className="p-6">
                    <h3 className="mb-4">Waste Distribution</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={wasteDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name} ${value}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {wasteDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </Card>
                </div>
              </>
            )}

            {activeTab === "route" && (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <h2>My Route</h2>
                    <p className="text-muted-foreground">
                      Details of your current route
                    </p>
                  </div>
                  {currentTournee && (
                    <IncidentReportDialog 
                      tourneeId={currentTournee.id}
                      onReportIncident={handleReportIncident}
                    />
                  )}
                </div>

                {todayRoutes.length > 1 && (
                  <RouteSelector 
                    routes={todayRoutes}
                    selectedRouteId={selectedRouteId}
                    onSelectRoute={setSelectedRouteId}
                  />
                )}

                {currentTournee && (
                  <div className="grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                      <CollectionPointsList
                        points={currentRoutePoints}
                        taches={currentTasks}
                        onCompleteTask={handleCompleteTask}
                        onStartTask={handleStartTask}
                      />
                    </div>
                    <div className="space-y-6">
                      <RouteProgress tournee={currentTournee} taches={currentTasks} />
                      {assignedVehicle && <VehicleInfo vehicule={assignedVehicle} />}
                    </div>
                  </div>
                )}
              </>
            )}

            {activeTab === "points" && (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <h2>Collection Points</h2>
                    <p className="text-muted-foreground">
                      Manage collection points for the selected route
                    </p>
                  </div>
                  {currentTournee && (
                    <IncidentReportDialog 
                      tourneeId={currentTournee.id}
                      onReportIncident={handleReportIncident}
                    />
                  )}
                </div>

                {todayRoutes.length > 1 && (
                  <RouteSelector 
                    routes={todayRoutes}
                    selectedRouteId={selectedRouteId}
                    onSelectRoute={setSelectedRouteId}
                  />
                )}

                <CollectionPointsList
                  points={currentRoutePoints}
                  taches={currentTasks}
                  onCompleteTask={handleCompleteTask}
                  onStartTask={handleStartTask}
                />
              </>
            )}

            {activeTab === "vehicle" && (
              <>
                <div>
                  <h2>My Vehicle</h2>
                  <p className="text-muted-foreground">
                    Information about your assigned vehicle
                  </p>
                </div>

                {assignedVehicle && <VehicleInfo vehicule={assignedVehicle} />}
              </>
            )}

            {activeTab === "report" && (
              <ReportProblem />
            )}
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  );
}