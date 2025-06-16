import { fetchInventoryItems, updateStockQuantity as apiUpdateStockQuantity } from '@/lib/mock-data';
import type { InventoryItem } from '@/types';
import InventoryListClientWrapper from './client-wrapper';

export const revalidate = 0; // Ensure data is fetched on every request for dynamic content

async function updateStockAction(itemId: string, newQuantity: number): Promise<void> {
  "use server";
  try {
    await apiUpdateStockQuantity(itemId, newQuantity);
    // Optionally: revalidatePath('/inventory') if not relying on client-side state updates alone
  } catch (error) {
    console.error("Failed to update stock:", error);
    throw new Error("Failed to update stock quantity on the server.");
  }
}

export default async function InventoryPage() {
  const initialItems: InventoryItem[] = await fetchInventoryItems();
  const categories = Array.from(new Set(initialItems.map(item => item.category)));

  return (
    <div className="space-y-8">
      <h1 className="font-headline text-4xl font-bold tracking-tight">Inventory Management</h1>
      <InventoryListClientWrapper 
        initialItems={initialItems} 
        categories={categories}
        updateStockAction={updateStockAction}
      />
    </div>
  );
}
