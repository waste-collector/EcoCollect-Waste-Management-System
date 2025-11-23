import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { AlertTriangle, CheckCircle2, Clock, Calendar } from "lucide-react";
import { Badge } from "./ui/badge";

interface DashboardProps {
  userName: string;
}

export function Dashboard({ userName }: DashboardProps) {
  const stats = [
    {
      title: "Next Collection",
      value: "Mon Oct 21",
      description: "Household Waste",
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Active Reports",
      value: "2",
      description: "Being processed",
      icon: AlertTriangle,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "Resolved Reports",
      value: "5",
      description: "This month",
      icon: CheckCircle2,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
  ];

  const recentReports = [
    {
      id: "SIG-12345678",
      type: "Missed Collection",
      date: "Oct 18, 2025",
      status: "In Progress",
    },
    {
      id: "SIG-12345677",
      type: "Overflowing Container",
      date: "Oct 15, 2025",
      status: "In Progress",
    },
    {
      id: "SIG-12345676",
      type: "Illegal Dumping",
      date: "Oct 10, 2025",
      status: "Resolved",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div>
        <h1 className="text-gray-900 mb-2">Hello, {userName} 👋</h1>
        <p className="text-gray-600">Welcome to your dashboard</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-600">{stat.title}</p>
                    <p className="text-gray-900">{stat.value}</p>
                    <p className="text-gray-500">{stat.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>Your latest reports</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentReports.map((report) => (
            <div
              key={report.id}
              className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1">
                <p className="text-gray-900">{report.type}</p>
                <p className="text-gray-600">{report.id}</p>
                <p className="text-gray-500">{report.date}</p>
              </div>
              <Badge
                variant={report.status === "Resolved" ? "default" : "secondary"}
              >
                {report.status}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="bg-green-600 p-2 rounded-lg">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-green-900 mb-1">Important Reminder</h3>
              <p className="text-green-800">
                Don't forget to put your bins out the evening before collection day,
                no later than 8:00 PM.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}