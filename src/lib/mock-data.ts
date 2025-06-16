import type { InventoryItem, LogisticsWorkflowItem } from '@/types';
import { subDays, addDays, formatISO } from 'date-fns';

const today = new Date();

export const mockInventoryItems: InventoryItem[] = [
  {
    id: 'prod_001',
    name: 'Quantum Widget',
    sku: 'QW-1001',
    category: 'Widgets',
    quantity: 75,
    lowStockThreshold: 50,
    criticalStockThreshold: 20,
    lastRestockDate: formatISO(subDays(today, 15)),
    supplier: 'Alpha Supplies',
    purchasePrice: 12.50,
    salePrice: 29.99,
    imageUrl: 'https://placehold.co/300x200.png',
    aiHint: 'tech gadget',
  },
  {
    id: 'prod_002',
    name: 'Nova Gear',
    sku: 'NG-2002',
    category: 'Gears',
    quantity: 30,
    lowStockThreshold: 40,
    criticalStockThreshold: 15,
    lastRestockDate: formatISO(subDays(today, 30)),
    supplier: 'Beta Components',
    purchasePrice: 25.00,
    salePrice: 59.99,
    imageUrl: 'https://placehold.co/300x200.png',
    aiHint: 'mechanical part',
  },
  {
    id: 'prod_003',
    name: 'Echo Module',
    sku: 'EM-3003',
    category: 'Modules',
    quantity: 120,
    lowStockThreshold: 100,
    criticalStockThreshold: 40,
    lastRestockDate: formatISO(subDays(today, 5)),
    supplier: 'Gamma Electronics',
    purchasePrice: 5.75,
    salePrice: 14.99,
    imageUrl: 'https://placehold.co/300x200.png',
    aiHint: 'electronic component',
  },
  {
    id: 'prod_004',
    name: 'Pulsar Core',
    sku: 'PC-4004',
    category: 'Cores',
    quantity: 18,
    lowStockThreshold: 25,
    criticalStockThreshold: 10,
    lastRestockDate: formatISO(subDays(today, 45)),
    supplier: 'Delta Innovations',
    purchasePrice: 75.00,
    salePrice: 149.99,
    imageUrl: 'https://placehold.co/300x200.png',
    aiHint: 'advanced tech',
  },
  {
    id: 'prod_005',
    name: 'Cryo Coolant',
    sku: 'CC-5005',
    category: 'Consumables',
    quantity: 200,
    lowStockThreshold: 150,
    criticalStockThreshold: 75,
    lastRestockDate: formatISO(subDays(today, 7)),
    supplier: 'Epsilon Fluids',
    purchasePrice: 2.00,
    salePrice: 5.99,
    imageUrl: 'https://placehold.co/300x200.png',
    aiHint: 'liquid solution',
  },
];

export const mockLogisticsWorkflow: LogisticsWorkflowItem[] = [
  {
    id: 'log_001',
    orderId: 'ORD-101',
    productId: 'prod_001',
    productName: 'Quantum Widget',
    quantity: 50,
    status: 'In Transit',
    estimatedDelivery: formatISO(addDays(today, 3)),
    carrier: 'FastShip Logistics',
    trackingNumber: 'FS123456789',
    origin: 'Alpha Warehouse',
    destination: 'Main Hub',
  },
  {
    id: 'log_002',
    orderId: 'ORD-102',
    productId: 'prod_004',
    productName: 'Pulsar Core',
    quantity: 20,
    status: 'Processing',
    estimatedDelivery: formatISO(addDays(today, 7)),
    carrier: 'SecureFreight',
    origin: 'Delta Factory',
    destination: 'Main Hub',
  },
  {
    id: 'log_003',
    orderId: 'ORD-103',
    productId: 'prod_002',
    productName: 'Nova Gear',
    quantity: 30,
    status: 'Delivered',
    estimatedDelivery: formatISO(subDays(today, 2)),
    actualDelivery: formatISO(subDays(today, 2)),
    carrier: 'QuickHaul',
    trackingNumber: 'QH987654321',
    origin: 'Beta Workshop',
    destination: 'Main Hub',
  },
   {
    id: 'log_004',
    orderId: 'ORD-104',
    productId: 'prod_005',
    productName: 'Cryo Coolant',
    quantity: 100,
    status: 'Shipped',
    estimatedDelivery: formatISO(addDays(today, 5)),
    carrier: 'Epsilon Express',
    trackingNumber: 'EE10101010',
    origin: 'Epsilon Plant',
    destination: 'Storage Facility B',
  },
];

// Simulate API delay
const apiDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchInventoryItems(): Promise<InventoryItem[]> {
  await apiDelay(500);
  return JSON.parse(JSON.stringify(mockInventoryItems)); // Deep copy to simulate immutability
}

export async function fetchLogisticsWorkflow(): Promise<LogisticsWorkflowItem[]> {
  await apiDelay(700);
  return JSON.parse(JSON.stringify(mockLogisticsWorkflow));
}

export async function updateStockQuantity(productId: string, newQuantity: number): Promise<InventoryItem | undefined> {
  await apiDelay(300);
  const itemIndex = mockInventoryItems.findIndex(item => item.id === productId);
  if (itemIndex !== -1) {
    mockInventoryItems[itemIndex].quantity = newQuantity;
    return { ...mockInventoryItems[itemIndex] };
  }
  return undefined;
}
