import { fetchInventoryItems, fetchLogisticsWorkflow } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Package, Truck, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { LiquidCard, LiquidCardContent, LiquidCardHeader, LiquidCardTitle } from '@/components/ui/liquid-card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default async function DashboardPage() {
  const inventoryItems = await fetchInventoryItems();
  const logisticsWorkflow = await fetchLogisticsWorkflow();

  const totalItems = inventoryItems.reduce((sum, item) => sum + item.quantity, 0);
  const lowStockItems = inventoryItems.filter(item => item.quantity < item.lowStockThreshold && item.quantity >= item.criticalStockThreshold).length;
  const criticalStockItems = inventoryItems.filter(item => item.quantity < item.criticalStockThreshold).length;
  
  const upcomingDeliveries = logisticsWorkflow.filter(item => item.status === 'In Transit' || item.status === 'Shipped' || item.status === 'Processing').length;
  const deliveredItems = logisticsWorkflow.filter(item => item.status === 'Delivered').length;
  const delayedItems = logisticsWorkflow.filter(item => item.status === 'Delayed').length;

  const quickActions = [
    { title: "View Inventory", href: "/inventory", icon: Package },
    { title: "Track Shipments", href: "/logistics", icon: Truck },
    { title: "Optimize Stock", href: "/ai-suggestions", icon: BarChart },
  ];

  return (
    <div className="space-y-8">
      <section>
        <h1 className="font-headline text-4xl font-bold tracking-tight mb-6">Inventory Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <LiquidCard>
            <LiquidCardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <LiquidCardTitle className="text-sm font-medium font-body">Total Inventory Units</LiquidCardTitle>
              <Package className="h-5 w-5 text-muted-foreground" />
            </LiquidCardHeader>
            <LiquidCardContent>
              <div className="text-3xl font-bold font-headline">{totalItems.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground pt-1">Across all products</p>
            </LiquidCardContent>
          </LiquidCard>
          <LiquidCard>
            <LiquidCardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <LiquidCardTitle className="text-sm font-medium font-body">Low Stock Alerts</LiquidCardTitle>
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
            </LiquidCardHeader>
            <LiquidCardContent>
              <div className="text-3xl font-bold font-headline">{lowStockItems}</div>
              <p className="text-xs text-muted-foreground pt-1">{criticalStockItems} critical</p>
            </LiquidCardContent>
          </LiquidCard>
           <LiquidCard>
            <LiquidCardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <LiquidCardTitle className="text-sm font-medium font-body">Upcoming Deliveries</LiquidCardTitle>
              <Truck className="h-5 w-5 text-blue-400" />
            </LiquidCardHeader>
            <LiquidCardContent>
              <div className="text-3xl font-bold font-headline">{upcomingDeliveries}</div>
              <p className="text-xs text-muted-foreground pt-1">Shipments en route</p>
            </LiquidCardContent>
          </LiquidCard>
          <LiquidCard>
            <LiquidCardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <LiquidCardTitle className="text-sm font-medium font-body">Delivered This Month</LiquidCardTitle>
              <CheckCircle className="h-5 w-5 text-green-400" />
            </LiquidCardHeader>
            <LiquidCardContent>
              <div className="text-3xl font-bold font-headline">{deliveredItems}</div>
              <p className="text-xs text-muted-foreground pt-1">{delayedItems} delayed</p>
            </LiquidCardContent>
          </LiquidCard>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <h2 className="font-headline text-2xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map(action => (
                <Link href={action.href} key={action.title} passHref>
                    <Card className="hover:shadow-lg transition-shadow duration-300 bg-secondary hover:border-primary cursor-pointer">
                        <CardHeader>
                            <action.icon className="h-8 w-8 text-primary mb-2" />
                            <CardTitle className="font-headline text-lg">{action.title}</CardTitle>
                        </CardHeader>
                    </Card>
                </Link>
            ))}
            </div>
             <h2 className="font-headline text-2xl font-semibold mt-8 mb-4">Recently Added Items</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {inventoryItems.slice(0,2).map(item => (
                    <Card key={item.id} className="overflow-hidden">
                        <CardHeader className="p-0">
                             {item.imageUrl && <Image src={item.imageUrl} alt={item.name} data-ai-hint={item.aiHint || 'product'} width={400} height={200} className="w-full h-40 object-cover" />}
                        </CardHeader>
                        <CardContent className="p-4">
                            <h3 className="font-headline text-lg font-semibold">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">{item.category}</p>
                            <p className="text-lg font-bold mt-2 text-primary">{item.quantity} units</p>
                        </CardContent>
                    </Card>
                ))}
             </div>
        </div>
        <div>
            <h2 className="font-headline text-2xl font-semibold mb-4">Activity Feed</h2>
            <Card className="max-h-[400px] overflow-y-auto">
                <CardContent className="p-0">
                    <ul className="divide-y divide-border">
                        {logisticsWorkflow.slice(0,5).map(log => (
                             <li key={log.id} className="p-4 hover:bg-secondary/50 transition-colors">
                                <div className="flex items-center gap-3">
                                    {log.status === "Delivered" && <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />}
                                    {log.status === "In Transit" && <Truck className="h-5 w-5 text-blue-500 flex-shrink-0" />}
                                    {log.status === "Processing" && <Clock className="h-5 w-5 text-yellow-500 flex-shrink-0" />}
                                    {log.status === "Shipped" && <Package className="h-5 w-5 text-indigo-500 flex-shrink-0" />}
                                    {log.status === "Delayed" && <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0" />}
                                    <div>
                                        <p className="text-sm font-medium">{log.productName} ({log.quantity})</p>
                                        <p className="text-xs text-muted-foreground">Order {log.orderId} - Status: {log.status}</p>
                                    </div>
                                </div>
                             </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
      </section>
    </div>
  );
}
