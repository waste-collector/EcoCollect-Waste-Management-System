import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MapPin, CheckCircle2, Clock, TrendingUp } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description?: string;
  colorClass?: string;
}

function StatCard({ title, value, icon, description, colorClass }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className={`text-2xl ${colorClass || ''}`}>{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}

interface DashboardStatsProps {
  totalPoints: number;
  pointsCompletes: number;
  pointsEnCours: number;
  tempsRestant: string;
}

export function DashboardStats({
  totalPoints,
  pointsCompletes,
  pointsEnCours,
  tempsRestant
}: DashboardStatsProps) {
  const completionPercentage = Math.round((pointsCompletes / totalPoints) * 100);
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Points to Collect"
        value={totalPoints.toString()}
        icon={<MapPin className="h-4 w-4 text-muted-foreground" />}
        description="Today"
      />
      <StatCard
        title="Completed Points"
        value={pointsCompletes.toString()}
        icon={<CheckCircle2 className="h-4 w-4 text-green-600" />}
        description={`${completionPercentage}% completed`}
        colorClass="text-green-600"
      />
      <StatCard
        title="In Progress"
        value={pointsEnCours.toString()}
        icon={<Clock className="h-4 w-4 text-orange-600" />}
        description="Current point"
        colorClass="text-orange-600"
      />
      <StatCard
        title="Time Remaining"
        value={tempsRestant}
        icon={<TrendingUp className="h-4 w-4 text-blue-600" />}
        description="Estimate"
        colorClass="text-blue-600"
      />
    </div>
  );
}