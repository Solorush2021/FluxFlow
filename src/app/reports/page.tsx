
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ClipboardList, AlertTriangle, Users, TruckIcon, BarChart3 } from 'lucide-react';

interface ReportCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  actionText?: string;
}

function ReportPlaceholderCard({ title, description, icon: Icon, actionText = "Generate Report (Coming Soon)" }: ReportCardProps) {
  return (
    <Card className="liquid-glass">
      <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
        <Icon className="h-8 w-8 text-primary" />
        <div>
          <CardTitle className="font-headline text-xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Detailed insights for this report will be available soon.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" disabled className="w-full">
          {actionText}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function ReportsPage() {
  const reportPlaceholders: ReportCardProps[] = [
    {
      title: "Inventory Summary",
      description: "Overall stock levels, total value, and item counts.",
      icon: ClipboardList,
    },
    {
      title: "Low & Critical Stock",
      description: "Highlights items below set low or critical thresholds.",
      icon: AlertTriangle,
    },
    {
      title: "Supplier Performance",
      description: "Track supplier lead times and item quality (future).",
      icon: Users,
    },
    {
      title: "Logistics Overview",
      description: "Summary of shipment statuses and delivery timelines.",
      icon: TruckIcon,
    },
    {
      title: "Sales & Demand Analysis",
      description: "Analyze sales trends and predict future demand (future).",
      icon: BarChart3,
    },
     {
      title: "Aging Inventory Report",
      description: "Identifies items that have been in stock for extended periods.",
      icon: ClipboardList, // Consider a more specific icon like Clock if available
    }
  ];

  return (
    <div className="space-y-8">
      <h1 className="font-headline text-4xl font-bold tracking-tight">FluxFlow Reports</h1>
      <p className="text-muted-foreground">
        Gain valuable insights into your inventory and operations with our comprehensive reports. 
        More detailed reports and customization options are on the way!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportPlaceholders.map((report) => (
          <ReportPlaceholderCard
            key={report.title}
            title={report.title}
            description={report.description}
            icon={report.icon}
          />
        ))}
      </div>
    </div>
  );
}
