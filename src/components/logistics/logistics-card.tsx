"use client";

import type { LogisticsWorkflowItem } from '@/types';
import { LiquidCard, LiquidCardContent, LiquidCardHeader, LiquidCardTitle, LiquidCardDescription } from '@/components/ui/liquid-card';
import { Badge } from '@/components/ui/badge';
import { Truck, Package, CalendarDays, MapPin, CheckCircle, AlertCircle, Clock, Anchor } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';

interface LogisticsCardProps {
  item: LogisticsWorkflowItem;
}

const statusIcons: Record<LogisticsWorkflowItem['status'], React.ElementType> = {
  'Pending': Clock,
  'Processing': Clock,
  'Shipped': Package,
  'In Transit': Truck,
  'Delivered': CheckCircle,
  'Delayed': AlertCircle,
};

const statusColors: Record<LogisticsWorkflowItem['status'], string> = {
  'Pending': 'bg-gray-500/80 text-gray-950 border-gray-600',
  'Processing': 'bg-yellow-500/80 text-yellow-950 border-yellow-600',
  'Shipped': 'bg-blue-500/80 text-blue-950 border-blue-600',
  'In Transit': 'bg-indigo-500/80 text-indigo-950 border-indigo-600',
  'Delivered': 'bg-green-500/80 text-green-950 border-green-600',
  'Delayed': 'bg-red-500/80 text-red-950 border-red-600',
};

export default function LogisticsCard({ item }: LogisticsCardProps) {
  const Icon = statusIcons[item.status] || Package;

  return (
    <LiquidCard className="flex flex-col h-full">
      <LiquidCardHeader>
        <div className="flex justify-between items-start">
            <LiquidCardTitle className="font-headline text-xl mb-1">{item.productName} ({item.quantity} units)</LiquidCardTitle>
            <Badge className={cn("font-semibold text-xs", statusColors[item.status])}>
                <Icon className="h-3 w-3 mr-1.5" />
                {item.status}
            </Badge>
        </div>
        <LiquidCardDescription className="text-xs text-muted-foreground">Order ID: {item.orderId}</LiquidCardDescription>
      </LiquidCardHeader>
      <LiquidCardContent className="flex-grow space-y-2 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <CalendarDays size={16} /> Est. Delivery: <span className="text-foreground">{format(parseISO(item.estimatedDelivery), 'MMM dd, yyyy')}</span>
        </div>
        {item.actualDelivery && (
             <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle size={16} className="text-green-400"/> Actual Delivery: <span className="text-foreground">{format(parseISO(item.actualDelivery), 'MMM dd, yyyy')}</span>
            </div>
        )}
        <div className="flex items-center gap-2 text-muted-foreground">
          <Truck size={16} /> Carrier: <span className="text-foreground">{item.carrier}</span>
        </div>
        {item.trackingNumber && (
            <div className="flex items-center gap-2 text-muted-foreground">
                 <Anchor size={16} /> Tracking: <span className="text-foreground font-mono text-xs">{item.trackingNumber}</span>
            </div>
        )}
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin size={16} /> Route: <span className="text-foreground">{item.origin} &rarr; {item.destination}</span>
        </div>
      </LiquidCardContent>
    </LiquidCard>
  );
}
