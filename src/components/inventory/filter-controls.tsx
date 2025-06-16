"use client";

import { useState, type ChangeEvent, type Dispatch, type SetStateAction } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ListFilter, Search, X } from 'lucide-react';

export interface Filters {
  searchTerm: string;
  category: string;
  stockStatus: string;
  sortBy: string;
}

interface FilterControlsProps {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
  categories: string[];
}

const stockStatusOptions = [
  { value: 'all', label: 'All Stock Levels' },
  { value: 'normal', label: 'Normal' },
  { value: 'low', label: 'Low Stock' },
  { value: 'critical', label: 'Critical Stock' },
  { value: 'out_of_stock', label: 'Out of Stock' },
];

const sortOptions = [
  { value: 'name_asc', label: 'Name (A-Z)' },
  { value: 'name_desc', label: 'Name (Z-A)' },
  { value: 'quantity_asc', label: 'Quantity (Low to High)' },
  { value: 'quantity_desc', label: 'Quantity (High to Low)' },
  { value: 'category_asc', label: 'Category (A-Z)' },
];

export default function FilterControls({ filters, setFilters, categories }: FilterControlsProps) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, searchTerm: e.target.value }));
  };

  const handleSelectChange = (name: keyof Filters) => (value: string) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      category: 'all',
      stockStatus: 'all',
      sortBy: 'name_asc',
    });
  };
  
  const hasActiveFilters = filters.searchTerm || filters.category !== 'all' || filters.stockStatus !== 'all';

  return (
    <div className="mb-6 p-4 rounded-lg bg-card shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        <div>
          <label htmlFor="search-inventory" className="block text-sm font-medium text-muted-foreground mb-1">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="search-inventory"
              type="text"
              placeholder="Search by name or SKU..."
              value={filters.searchTerm}
              onChange={handleInputChange}
              className="pl-10"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="category-filter" className="block text-sm font-medium text-muted-foreground mb-1">Category</label>
          <Select value={filters.category} onValueChange={handleSelectChange('category')}>
            <SelectTrigger id="category-filter">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="stock-status-filter" className="block text-sm font-medium text-muted-foreground mb-1">Stock Status</label>
          <Select value={filters.stockStatus} onValueChange={handleSelectChange('stockStatus')}>
            <SelectTrigger id="stock-status-filter">
              <SelectValue placeholder="Select stock status" />
            </SelectTrigger>
            <SelectContent>
              {stockStatusOptions.map(opt => (
                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="sort-by" className="block text-sm font-medium text-muted-foreground mb-1">Sort By</label>
          <Select value={filters.sortBy} onValueChange={handleSelectChange('sortBy')}>
            <SelectTrigger id="sort-by">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map(opt => (
                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {hasActiveFilters && (
          <div className="md:col-span-2 lg:col-span-4 flex justify-end">
            <Button variant="ghost" onClick={clearFilters} className="text-muted-foreground hover:text-foreground">
              <X className="mr-2 h-4 w-4" /> Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
