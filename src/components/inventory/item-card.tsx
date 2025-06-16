"use client";

import type { InventoryItem } from '@/types';
import { LiquidCard, LiquidCardContent, LiquidCardHeader, LiquidCardTitle, LiquidCardFooter, LiquidCardDescription } from '@/components/ui/liquid-card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Package, TrendingUp, AlertTriangle, CalendarDays, DollarSign, Tag } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import StockAdjuster from './stock-adjuster';
import { useState } from 'react';

interface InventoryItemCardProps {
  item: InventoryItem;
  onStockUpdate: (itemId: string, newQuantity: number) => Promise<void>;
}

export default function InventoryItemCard({ item: initialItem, onStockUpdate }: InventoryItemCardProps) {
  const [item, setItem] = useState<InventoryItem>(initialItem);

  const stockStatus = () => {
    if (item.quantity < item.criticalStockThreshold) return 'critical';
    if (item.quantity < item.lowStockThreshold) return 'low';
    return 'normal';
  };

  const status = stockStatus();

  const handleSuccessfulUpdate = (newQuantity: number) => {
    setItem(prevItem => ({ ...prevItem, quantity: newQuantity }));
  };

  return (
    <LiquidCard className="flex flex-col h-full group transition-all duration-300 hover:shadow-primary/20 hover:shadow-2xl">
      <LiquidCardHeader>
        {item.imageUrl && (
          <div className="relative h-48 w-full mb-4 overflow-hidden rounded-md">
            <Image 
              src={item.imageUrl} 
              alt={item.name} 
              data-ai-hint={item.aiHint || 'product image'}
              fill
              style={{ objectFit: 'cover' }}
              className="transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        )}
        <div className="flex justify-between items-start">
            <div>
                <LiquidCardTitle className="font-headline text-2xl mb-1">{item.name}</LiquidCardTitle>
                <LiquidCardDescription className="text-sm text-muted-foreground">SKU: {item.sku}</LiquidCardDescription>
            </div>
             <Badge 
                variant={status === 'critical' ? 'destructive' : status === 'low' ? 'secondary' : 'default'}
                className={cn(
                    "font-semibold",
                    status === 'low' && 'bg-yellow-500/80 text-yellow-950 border-yellow-600',
                    status === 'critical' && 'bg-red-500/80 text-red-950 border-red-600'
                )}
            >
                {status === 'critical' ? 'Critical' : status === 'low' ? 'Low Stock' : `${item.quantity} In Stock`}
            </Badge>
        </div>
      </LiquidCardHeader>
      <LiquidCardContent className="flex-grow space-y-3 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Package size={16} /> Category: <span className="text-foreground">{item.category}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <TrendingUp size={16} /> Current Stock: <span className="text-foreground font-semibold text-lg">{item.quantity}</span>
        </div>
         <div className="flex items-center gap-2 text-muted-foreground">
          <AlertTriangle size={16} /> Low Stock Threshold: <span className="text-foreground">{item.lowStockThreshold}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <CalendarDays size={16} /> Last Restock: <span className="text-foreground">{format(parseISO(item.lastRestockDate), 'MMM dd, yyyy')}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Tag size={16} /> Supplier: <span className="text-foreground">{item.supplier}</span>
        </div>
        <div className="flex items-center gap-2 text-primary">
          <DollarSign size={16} /> Sale Price: <span className="text-foreground font-semibold">${item.salePrice.toFixed(2)}</span>
        </div>
      </LiquidCardContent>
      <LiquidCardFooter>
        <StockAdjuster 
            itemId={item.id} 
            currentQuantity={item.quantity} 
            onStockUpdate={onStockUpdate}
            onSuccessfulUpdate={handleSuccessfulUpdate}
        />
      </LiquidCardFooter>
    </LiquidCard>
  );
}
