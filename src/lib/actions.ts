"use server";

import { getInventoryOptimizationSuggestions, type InventoryOptimizationInput, type InventoryOptimizationOutput } from '@/ai/flows/inventory-optimization';
import { z } from 'zod';
import type { ProductRecord } from '@/types';

const productRecordSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  value: z.coerce.number().min(0, "Value must be non-negative"),
});

const formSchema = z.object({
  currentInventoryLevels: z.array(productRecordSchema).min(1, "At least one product's inventory level is required."),
  predictedDemand: z.array(productRecordSchema).min(1, "At least one product's predicted demand is required."),
  leadTimes: z.array(productRecordSchema).min(1, "At least one product's lead time is required."),
  holdingCosts: z.array(productRecordSchema).min(1, "At least one product's holding cost is required."),
  stockoutCosts: z.array(productRecordSchema).min(1, "At least one product's stockout cost is required."),
});

export type AISuggestionFormState = {
  message?: string;
  errors?: z.ZodIssue[];
  data?: InventoryOptimizationOutput;
  status: 'idle' | 'loading' | 'success' | 'error';
};

function transformProductRecordsToMap(records: ProductRecord[]): Record<string, number> {
  return records.reduce((acc, record) => {
    acc[record.productId] = record.value;
    return acc;
  }, {} as Record<string, number>);
}

export async function submitAISuggestionForm(
  prevState: AISuggestionFormState,
  formData: FormData
): Promise<AISuggestionFormState> {
  
  // Helper to parse array of objects from FormData
  const parseArrayField = (baseName: string): ProductRecord[] => {
    const products: Record<string, Partial<ProductRecord>> = {};
    for (const [key, value] of formData.entries()) {
      const match = key.match(new RegExp(`^${baseName}\\[(\\d+)\\]\\.(productId|value)$`));
      if (match) {
        const index = match[1];
        const field = match[2] as keyof ProductRecord;
        if (!products[index]) products[index] = {};
        products[index][field] = value as any; // FormData values are strings or File
      }
    }
    return Object.values(products).map(p => ({
        productId: String(p.productId || ''),
        value: parseFloat(String(p.value || '0'))
    }));
  };

  const rawFormData = {
    currentInventoryLevels: parseArrayField('currentInventoryLevels'),
    predictedDemand: parseArrayField('predictedDemand'),
    leadTimes: parseArrayField('leadTimes'),
    holdingCosts: parseArrayField('holdingCosts'),
    stockoutCosts: parseArrayField('stockoutCosts'),
  };

  const validatedFields = formSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.issues,
      message: "Validation failed. Please check your inputs.",
      status: 'error',
    };
  }
  
  const aiInput: InventoryOptimizationInput = {
    currentInventoryLevels: transformProductRecordsToMap(validatedFields.data.currentInventoryLevels),
    predictedDemand: transformProductRecordsToMap(validatedFields.data.predictedDemand),
    leadTimes: transformProductRecordsToMap(validatedFields.data.leadTimes),
    holdingCosts: transformProductRecordsToMap(validatedFields.data.holdingCosts),
    stockoutCosts: transformProductRecordsToMap(validatedFields.data.stockoutCosts),
  };

  try {
    const result = await getInventoryOptimizationSuggestions(aiInput);
    return {
      message: "Successfully generated AI suggestions.",
      data: result,
      status: 'success',
    };
  } catch (error) {
    console.error("AI Suggestion Error:", error);
    return {
      message: "An error occurred while generating AI suggestions.",
      status: 'error',
    };
  }
}
