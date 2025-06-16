"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { Minus, Plus, Save } from 'lucide-react';

interface StockAdjusterProps {
  itemId: string;
  currentQuantity: number;
  onStockUpdate: (itemId: string, newQuantity: number) => Promise<void>;
  onSuccessfulUpdate: (newQuantity: number) => void;
}

export default function StockAdjuster({ itemId, currentQuantity, onStockUpdate, onSuccessfulUpdate }: StockAdjusterProps) {
  const [quantity, setQuantity] = useState(currentQuantity);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setQuantity(currentQuantity);
  }, [currentQuantity]);

  const handleQuantityChange = (value: number) => {
    if (value >= 0 && value <= 1000) { // Max stock limit for slider
      setQuantity(value);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await onStockUpdate(itemId, quantity);
      onSuccessfulUpdate(quantity); // Notify parent of successful update
      toast({
        title: "Stock Updated",
        description: `Item ${itemId} quantity set to ${quantity}.`,
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Could not update stock quantity.",
        variant: "destructive",
      });
      // Revert to original quantity on failure if desired
      // setQuantity(currentQuantity); 
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-4 p-2 rounded-md bg-background/30">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => handleQuantityChange(quantity - 1)} disabled={quantity <= 0 || isLoading}>
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          value={quantity}
          onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10) || 0)}
          className="w-20 text-center font-semibold text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          disabled={isLoading}
          min="0"
          max="1000"
        />
        <Button variant="outline" size="icon" onClick={() => handleQuantityChange(quantity + 1)} disabled={quantity >= 1000 || isLoading}>
          <Plus className="h-4 w-4" />
        </Button>
        <Button onClick={handleSubmit} disabled={isLoading || quantity === currentQuantity} className="ml-auto bg-accent hover:bg-accent/90 text-accent-foreground">
          <Save className="mr-2 h-4 w-4" />
          {isLoading ? 'Saving...' : 'Save'}
        </Button>
      </div>
      <Slider
        value={[quantity]}
        onValueChange={(value) => handleQuantityChange(value[0])}
        max={Math.max(200, currentQuantity + 50)} // Dynamic max for slider based on current stock
        step={1}
        disabled={isLoading}
        aria-label="Stock quantity slider"
        className="[&>span:first-child]:h-2 [&>span:first-child>span]:bg-primary [&>span:last-child]:bg-primary [&>span:last-child]:border-primary"
      />
    </div>
  );
}
