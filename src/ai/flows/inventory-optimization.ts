'use server';

/**
 * @fileOverview An AI agent that provides inventory optimization suggestions.
 *
 * - getInventoryOptimizationSuggestions - A function that handles the inventory optimization process.
 * - InventoryOptimizationInput - The input type for the getInventoryOptimizationSuggestions function.
 * - InventoryOptimizationOutput - The return type for the getInventoryOptimizationSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InventoryOptimizationInputSchema = z.object({
  currentInventoryLevels: z
    .record(z.number())
    .describe('A map of product IDs to their current inventory levels.'),
  predictedDemand: z
    .record(z.number())
    .describe('A map of product IDs to their predicted demand for the next period.'),
  leadTimes: z
    .record(z.number())
    .describe(
      'A map of product IDs to their lead times (in days) for restock. Represent the average lead time for each product, taking into account variability.'
    ),
  holdingCosts: z
    .record(z.number())
    .describe('A map of product IDs to their holding costs per unit per period.'),
  stockoutCosts: z
    .record(z.number())
    .describe('A map of product IDs to their estimated stockout costs per unit.'),
});
export type InventoryOptimizationInput = z.infer<typeof InventoryOptimizationInputSchema>;

const InventoryOptimizationOutputSchema = z.object({
  restockSuggestions: z.record(z.object({
    quantity: z.number().describe('The suggested restock quantity for the product.'),
    timeline: z.string().describe('The suggested restock timeline for the product (e.g., number of days until restock).'),
    rationale: z.string().describe('Explanation of why the quantity/timeline were suggested.'),
  })).describe('Suggestions for when and how much to restock for each product, including rationale.'),
});
export type InventoryOptimizationOutput = z.infer<typeof InventoryOptimizationOutputSchema>;

export async function getInventoryOptimizationSuggestions(
  input: InventoryOptimizationInput
): Promise<InventoryOptimizationOutput> {
  return inventoryOptimizationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'inventoryOptimizationPrompt',
  input: {schema: InventoryOptimizationInputSchema},
  output: {schema: InventoryOptimizationOutputSchema},
  prompt: `You are an expert logistics manager. Analyze the following data to provide optimal restock timelines and quantities for each product.

Current Inventory Levels: {{{currentInventoryLevels}}}
Predicted Demand: {{{predictedDemand}}}
Lead Times: {{{leadTimes}}}
Holding Costs: {{{holdingCosts}}}
Stockout Costs: {{{stockoutCosts}}}

Based on this information, suggest optimal restock timelines and quantities to minimize stockouts and reduce holding costs. Provide a rationale for each suggestion.

Your analysis should take into account:
* The cost of holding excess inventory.
* The risk and cost of stockouts.
* The lead times required to restock each product.
* Fluctuations in demand.

Return the restock suggestions in the following format:
{{{output schema=InventoryOptimizationOutputSchema}}}`,
});

const inventoryOptimizationFlow = ai.defineFlow(
  {
    name: 'inventoryOptimizationFlow',
    inputSchema: InventoryOptimizationInputSchema,
    outputSchema: InventoryOptimizationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
