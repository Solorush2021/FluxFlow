"use client";

import { useState, useMemo, useEffect } from 'react';
import type { InventoryItem } from '@/types';
import InventoryItemCard from '@/components/inventory/item-card';
import FilterControls, { type Filters } from '@/components/inventory/filter-controls';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { PackageOpen } from 'lucide-react';

interface InventoryListClientWrapperProps {
  initialItems: InventoryItem[];
  categories: string[];
  updateStockAction: (itemId: string, newQuantity: number) => Promise<void>;
}

export default function InventoryListClientWrapper({ 
  initialItems, 
  categories,
  updateStockAction
}: InventoryListClientWrapperProps) {
  const [items, setItems] = useState<InventoryItem[]>(initialItems);
  const [isLoading, setIsLoading] = useState(true); // Initial loading state
  const [filters, setFilters] = useState<Filters>({
    searchTerm: '',
    category: 'all',
    stockStatus: 'all',
    sortBy: 'name_asc',
  });

  useEffect(() => {
    // Simulate initial data load finishing
    setItems(initialItems);
    setIsLoading(false);
  }, [initialItems]);

  const filteredAndSortedItems = useMemo(() => {
    let processedItems = [...items];

    // Filter by search term
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      processedItems = processedItems.filter(
        item =>
          item.name.toLowerCase().includes(term) ||
          item.sku.toLowerCase().includes(term)
      );
    }

    // Filter by category
    if (filters.category !== 'all') {
      processedItems = processedItems.filter(item => item.category === filters.category);
    }

    // Filter by stock status
    if (filters.stockStatus !== 'all') {
      processedItems = processedItems.filter(item => {
        if (filters.stockStatus === 'out_of_stock') return item.quantity === 0;
        if (filters.stockStatus === 'critical') return item.quantity > 0 && item.quantity < item.criticalStockThreshold;
        if (filters.stockStatus === 'low') return item.quantity >= item.criticalStockThreshold && item.quantity < item.lowStockThreshold;
        if (filters.stockStatus === 'normal') return item.quantity >= item.lowStockThreshold;
        return true;
      });
    }

    // Sort items
    switch (filters.sortBy) {
      case 'name_asc':
        processedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name_desc':
        processedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'quantity_asc':
        processedItems.sort((a, b) => a.quantity - b.quantity);
        break;
      case 'quantity_desc':
        processedItems.sort((a, b) => b.quantity - a.quantity);
        break;
      case 'category_asc':
        processedItems.sort((a, b) => a.category.localeCompare(b.category));
        break;
    }

    return processedItems;
  }, [items, filters]);

  const handleStockUpdate = async (itemId: string, newQuantity: number) => {
    await updateStockAction(itemId, newQuantity);
    // Optimistically update client-side state. 
    // The parent InventoryPage can re-fetch or rely on this.
    // For this example, StockAdjuster itself updates its parent item card's state.
    // If a full re-fetch is needed, manage that state here or lift it higher.
    setItems(currentItems => 
        currentItems.map(item => 
            item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
    );
  };

  if (isLoading && initialItems.length === 0) { // Show skeletons only if initialItems are not yet loaded (or empty during initial phase)
    return (
      <>
        <FilterControls filters={filters} setFilters={setFilters} categories={categories} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="space-y-3 p-4 liquid-glass">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-10 w-full mt-4" />
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <FilterControls filters={filters} setFilters={setFilters} categories={categories} />
      {filteredAndSortedItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-500">
          {filteredAndSortedItems.map(item => (
            <InventoryItemCard key={item.id} item={item} onStockUpdate={handleStockUpdate} />
          ))}
        </div>
      ) : (
        <Alert className="liquid-glass">
          <PackageOpen className="h-5 w-5" />
          <AlertTitle className="font-headline">No Items Found</AlertTitle>
          <AlertDescription>
            No inventory items match your current filter criteria. Try adjusting your filters or add new items.
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}
