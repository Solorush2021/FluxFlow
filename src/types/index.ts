
import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon; // Ensure LucideIcon is used here
  label?: string;
  disabled?: boolean;
}

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  lowStockThreshold: number;
  criticalStockThreshold: number;
  lastRestockDate: string; // ISO date string
  supplier: string;
  purchasePrice: number;
  salePrice: number;
  imageUrl?: string;
  aiHint?: string; // for placeholder images
}

export interface LogisticsWorkflowItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  quantity: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'In Transit' | 'Delivered' | 'Delayed';
  estimatedDelivery: string; // ISO date string
  actualDelivery?: string; // ISO date string
  carrier: string;
  trackingNumber?: string;
  origin: string;
  destination: string;
}

export interface ProductRecord {
  productId: string;
  value: number;
}
