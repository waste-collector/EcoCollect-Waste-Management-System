import { Card } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingDown, TrendingUp, FileText, Download } from 'lucide-react';
import { mockTours } from '../data/mockData';
import { exportTourReportsToXML, downloadXML } from '../utils/xmlHandler';
import { toast } from 'sonner';

export function Reports() {
  // Data for monthly collection report
  const monthlyCollection = [
    { month: 'Apr', general: 12500, recyclable: 8200, glass: 3100, organic: 5400 },
    { month: 'May', general: 13200, recyclable: 8900, glass: 3400, organic: 5800 },
    { month: 'Jun', general: 12800, recyclable: 9200, glass: 3500, organic: 6100 },
    { month: 'Jul', general: 13500, recyclable: 9800, glass: 3700, organic: 6400 },
    { month: 'Aug', general: 12900, recyclable: 10100, glass: 3900, organic: 6700 },
    { month: 'Sep', general: 13100, recyclable: 10500, glass: 4100, organic: 7000 }
  ];

  // Comparative emissions data
  const comparativeEmissions = [
    { month: 'Apr', diesel: 320, hybrid: 180, electric: 0 },
    { month: 'May', diesel: 310, hybrid: 175, electric: 0 },
    { month: 'Jun', diesel: 298, hybrid: 170, electric: 0 },
    { month: 'Jul', diesel: 285, hybrid: 165, electric: 0 },
    { month: 'Aug', diesel: 272, hybrid: 160, electric: 0 },
    { month: 'Sep', diesel: 260, hybrid: 155, electric: 0 }
  ];

  // Tour performance data
  const tourPerformance = [
    { week: 'W38', scheduled: 42, completed: 41, efficiency: 98 },
    { week: 'W39', scheduled: 45, completed: 44, efficiency: 98 },
    { week: 'W40', scheduled: 43, completed: 42, efficiency: 98 },
    { week: 'W41', scheduled: 46, completed: 45, efficiency: 98 },
    { week: 'W42', scheduled: 44, completed: 43, efficiency: 98 }
  ];

  const handleExportTourReports = () => {
    const xmlContent = exportTourReportsToXML(mockTours);
    downloadXML(xmlContent, 'tour-reports.xml');
    toast.success('Tour reports exported successfully');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Reports and Analysis</h1>
          <p className="text-muted-foreground">Statistics and environmental analysis</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="6months">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleExportTourReports}>
            <Download className="h-4 w-4 mr-2" />
            Export Tour Reports XML
          </Button>
        </div>
      </div>

      {/* Key performance indicators */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Collected</p>
              <div className="text-2xl mt-1">78.4 t</div>
              <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                <TrendingUp className="h-3 w-3" />
                +8.2% vs previous month
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Recycling Rate</p>
              <div className="text-2xl mt-1">68%</div>
              <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                <TrendingUp className="h-3 w-3" />
                +5% vs previous month
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">CO₂ Emissions</p>
              <div className="text-2xl mt-1">245.7 kg</div>
              <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                <TrendingDown className="h-3 w-3" />
                -12.3% vs previous month
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Tour Efficiency</p>
              <div className="text-2xl mt-1">97.8%</div>
              <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                <TrendingUp className="h-3 w-3" />
                +2.1% vs previous month
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Monthly collection chart */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3>Monthly Collection by Waste Type</h3>
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Details
          </Button>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={monthlyCollection}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="general" fill="#6b7280" name="General" radius={[4, 4, 0, 0]} />
            <Bar dataKey="recyclable" fill="#22c55e" name="Recyclable" radius={[4, 4, 0, 0]} />
            <Bar dataKey="glass" fill="#3b82f6" name="Glass" radius={[4, 4, 0, 0]} />
            <Bar dataKey="organic" fill="#f59e0b" name="Organic" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Emissions chart */}
        <Card className="p-6">
          <h3 className="mb-4">CO₂ Emissions by Vehicle Type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={comparativeEmissions}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="diesel" stroke="#6b7280" strokeWidth={2} name="Diesel" />
              <Line type="monotone" dataKey="hybrid" stroke="#3b82f6" strokeWidth={2} name="Hybrid" />
              <Line type="monotone" dataKey="electric" stroke="#22c55e" strokeWidth={2} name="Electric" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Performance chart */}
        <Card className="p-6">
          <h3 className="mb-4">Tour Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={tourPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="scheduled" fill="#94a3b8" name="Scheduled" radius={[4, 4, 0, 0]} />
              <Bar dataKey="completed" fill="#22c55e" name="Completed" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Environmental goals */}
      <Card className="p-6">
        <h3 className="mb-4">Environmental Goals 2025</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span>CO₂ Emissions Reduction (-20%)</span>
              <span className="text-green-600">72% achieved</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-green-500" style={{ width: '72%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span>Recycling Rate (75%)</span>
              <span className="text-blue-600">91% achieved</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-blue-500" style={{ width: '91%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span>Electric Vehicles (50% of fleet)</span>
              <span className="text-orange-600">40% achieved</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-orange-500" style={{ width: '40%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span>Tour Optimization (-15% distance)</span>
              <span className="text-green-600">85% achieved</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-green-500" style={{ width: '85%' }} />
            </div>
          </div>
        </div>
      </Card>

      {/* Monthly summary */}
      <Card className="p-6">
        <h3 className="mb-4">October Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Tours Completed</div>
            <div className="text-2xl">178</div>
            <div className="text-sm text-green-600">+12 vs September</div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Collection Points Serviced</div>
            <div className="text-2xl">892</div>
            <div className="text-sm text-green-600">+5.2%</div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Total Distance Traveled</div>
            <div className="text-2xl">2,847 km</div>
            <div className="text-sm text-green-600">-8.3% vs September</div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Average Time per Tour</div>
            <div className="text-2xl">3h 42min</div>
            <div className="text-sm text-green-600">-15min vs September</div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Average Fill Rate</div>
            <div className="text-2xl">74%</div>
            <div className="text-sm text-muted-foreground">optimal</div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Average Cost per Ton</div>
            <div className="text-2xl">$127</div>
            <div className="text-sm text-green-600">-$8 vs September</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
