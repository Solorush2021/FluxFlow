import { fetchLogisticsWorkflow } from '@/lib/mock-data';
import LogisticsCard from '@/components/logistics/logistics-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { LogisticsWorkflowItem } from '@/types';

export const revalidate = 0;

const filterItemsByStatus = (items: LogisticsWorkflowItem[], statuses: LogisticsWorkflowItem['status'][]) => {
  return items.filter(item => statuses.includes(item.status));
};

export default async function LogisticsPage() {
  const logisticsItems = await fetchLogisticsWorkflow();

  const activeItems = filterItemsByStatus(logisticsItems, ['Pending', 'Processing', 'Shipped', 'In Transit']);
  const completedItems = filterItemsByStatus(logisticsItems, ['Delivered']);
  const delayedItems = filterItemsByStatus(logisticsItems, ['Delayed']);

  return (
    <div className="space-y-8">
      <h1 className="font-headline text-4xl font-bold tracking-tight">Logistics Workflow</h1>
      
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6 bg-card">
          <TabsTrigger value="active" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Active ({activeItems.length})</TabsTrigger>
          <TabsTrigger value="completed" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Completed ({completedItems.length})</TabsTrigger>
          <TabsTrigger value="delayed" className="data-[state=active]:bg-destructive data-[state=active]:text-destructive-foreground">Delayed ({delayedItems.length})</TabsTrigger>
          <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">All ({logisticsItems.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          {activeItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
              {activeItems.map(item => <LogisticsCard key={item.id} item={item} />)}
            </div>
          ) : <p className="text-muted-foreground text-center py-8">No active shipments.</p>}
        </TabsContent>
        <TabsContent value="completed">
          {completedItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
              {completedItems.map(item => <LogisticsCard key={item.id} item={item} />)}
            </div>
          ) : <p className="text-muted-foreground text-center py-8">No completed shipments yet.</p>}
        </TabsContent>
        <TabsContent value="delayed">
          {delayedItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
              {delayedItems.map(item => <LogisticsCard key={item.id} item={item} />)}
            </div>
          ) : <p className="text-muted-foreground text-center py-8">No delayed shipments.</p>}
        </TabsContent>
        <TabsContent value="all">
          {logisticsItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
              {logisticsItems.map(item => <LogisticsCard key={item.id} item={item} />)}
            </div>
          ) : <p className="text-muted-foreground text-center py-8">No shipment data available.</p>}
        </TabsContent>
      </Tabs>
    </div>
  );
}
