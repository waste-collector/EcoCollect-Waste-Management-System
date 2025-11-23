import { Card } from './ui/card';
import { Trash2, Truck, Users, MapPin, TrendingDown, Recycle } from 'lucide-react';
import { mockStatistics, mockTours, mockCollectionPoints } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

export function Dashboard() {
  const stats = mockStatistics;
  
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

  // Data for emissions evolution
  const emissionsData = [
    { month: 'May', emissions: 285 },
    { month: 'Jun', emissions: 270 },
    { month: 'Jul', emissions: 265 },
    { month: 'Aug', emissions: 258 },
    { month: 'Sep', emissions: 252 },
    { month: 'Oct', emissions: 246 }
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1>Dashboard</h1>
        <p className="text-muted-foreground">Overview of urban waste management</p>
      </div>

      {/* Main statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground">Collection Points</p>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl">{stats.totalCollectionPoints}</span>
                <span className="text-destructive">{stats.fullPoints} full</span>
              </div>
            </div>
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground">Available Vehicles</p>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl">{stats.availableVehicles}</span>
                <span className="text-muted-foreground">/ 5 total</span>
              </div>
            </div>
            <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Truck className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground">Active Employees</p>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl">{stats.activeEmployees}</span>
                <span className="text-green-600">In service</span>
              </div>
            </div>
            <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground">Tours Today</p>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl">{stats.toursToday}</span>
                <span className="text-muted-foreground">scheduled</span>
              </div>
            </div>
            <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Trash2 className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground">Recycling Rate</p>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl">{stats.recyclingRate}%</span>
                <span className="text-green-600">+5% this month</span>
              </div>
            </div>
            <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center">
              <Recycle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground">CO₂ Emissions (month)</p>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl">{stats.monthlyEmissions}</span>
                <span className="text-muted-foreground">kg</span>
              </div>
            </div>
            <div className="h-12 w-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <TrendingDown className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

      <Card className="p-6">
        <h3 className="mb-4">CO₂ Emissions Evolution (Last 6 Months)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={emissionsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="emissions" stroke="#22c55e" strokeWidth={2} dot={{ fill: '#22c55e', r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Collection points requiring attention */}
      <Card className="p-6">
        <h3 className="mb-4">Collection Points Requiring Attention</h3>
        <div className="space-y-3">
          {mockCollectionPoints
            .filter(p => p.fillLevel > 80)
            .map(point => (
              <div key={point.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    point.fillLevel > 90 ? 'bg-destructive/10' : 'bg-orange-500/10'
                  }`}>
                    <Trash2 className={`h-5 w-5 ${
                      point.fillLevel > 90 ? 'text-destructive' : 'text-orange-600'
                    }`} />
                  </div>
                  <div>
                    <div>{point.name}</div>
                    <div className="text-sm text-muted-foreground">{point.address}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={point.fillLevel > 90 ? 'text-destructive' : 'text-orange-600'}>
                    {point.fillLevel}% full
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {point.wasteType}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </Card>
    </div>
  );
}
