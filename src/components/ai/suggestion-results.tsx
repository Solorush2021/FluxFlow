"use client";

import type { InventoryOptimizationOutput } from "@/ai/flows/inventory-optimization";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, PackageCheck, Clock } from "lucide-react";

interface SuggestionResultsProps {
  results?: InventoryOptimizationOutput;
}

export default function SuggestionResults({ results }: SuggestionResultsProps) {
  if (!results || !results.restockSuggestions || Object.keys(results.restockSuggestions).length === 0) {
    return (
        <Card className="mt-8 liquid-glass">
            <CardHeader>
                <CardTitle className="font-headline flex items-center"><Lightbulb className="mr-2 h-5 w-5 text-primary"/>Awaiting Suggestions</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Submit the form above to get AI-powered inventory optimization suggestions.</p>
            </CardContent>
        </Card>
    );
  }

  return (
    <Card className="mt-8 liquid-glass">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center"><Lightbulb className="mr-2 h-6 w-6 text-primary"/>AI Restock Suggestions</CardTitle>
        <CardDescription>
          Based on your input, here are the AI-powered suggestions to optimize your inventory.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {Object.entries(results.restockSuggestions).map(([productId, suggestion], index) => (
            <AccordionItem value={`item-${index}`} key={productId} className="border-border/50">
              <AccordionTrigger className="hover:no-underline text-lg font-semibold">
                Product: <span className="text-primary ml-2 font-headline">{productId}</span>
              </AccordionTrigger>
              <AccordionContent className="space-y-3 p-4 bg-background/30 rounded-md">
                <div className="flex items-center gap-2">
                  <PackageCheck className="h-5 w-5 text-accent" />
                  <strong>Suggested Restock Quantity:</strong>
                  <span>{suggestion.quantity} units</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-accent" />
                  <strong>Suggested Restock Timeline:</strong>
                  <span>{suggestion.timeline}</span>
                </div>
                <div>
                  <strong className="block mb-1 text-muted-foreground">Rationale:</strong>
                  <p className="text-sm bg-muted/30 p-3 rounded-md">{suggestion.rationale}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
