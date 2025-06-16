"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFormState, useFormStatus } from 'react-dom';
import { submitAISuggestionForm, type AISuggestionFormState } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Trash2, Loader2, Wand2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useEffect } from "react";
import { mockInventoryItems } from "@/lib/mock-data"; // For default product IDs

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

type FormData = z.infer<typeof formSchema>;

const initialProducts = mockInventoryItems.slice(0, 2).map(item => ({ productId: item.id, name: item.name }));

const defaultValues: FormData = {
  currentInventoryLevels: initialProducts.map(p => ({ productId: p.productId, value: 0 })),
  predictedDemand: initialProducts.map(p => ({ productId: p.productId, value: 0 })),
  leadTimes: initialProducts.map(p => ({ productId: p.productId, value: 0 })),
  holdingCosts: initialProducts.map(p => ({ productId: p.productId, value: 0 })),
  stockoutCosts: initialProducts.map(p => ({ productId: p.productId, value: 0 })),
};

interface AISuggestionFormProps {
  onFormSubmitSuccess: (data: AISuggestionFormState) => void;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
      Get AI Suggestions
    </Button>
  );
}

const FieldArrayComponent = ({ control, name, labelPrefix, errors }: {
  control: any, // Control type from react-hook-form
  name: keyof FormData,
  labelPrefix: string,
  errors: any // Field errors from react-hook-form
}) => {
  const { fields, append, remove } = useFieldArray({ control, name });

  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <div key={field.id} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-3 items-end p-3 border rounded-md bg-secondary/30">
          <div className="md:col-span-2 grid grid-cols-2 gap-3">
             <div>
                <Label htmlFor={`${name}.${index}.productId`}>Product ID</Label>
                 <Controller
                    name={`${name}.${index}.productId`}
                    control={control}
                    render={({ field: controllerField }) => (
                        <Input 
                            {...controllerField} 
                            placeholder="e.g., prod_001" 
                            defaultValue={initialProducts[index]?.productId || ''}
                            readOnly={index < initialProducts.length} // Make predefined product IDs read-only
                            className={index < initialProducts.length ? 'bg-muted cursor-not-allowed' : ''}
                        />
                    )}
                />
                {errors?.[name]?.[index]?.productId && <p className="text-xs text-destructive mt-1">{errors[name][index].productId.message}</p>}
             </div>
              <div>
                <Label htmlFor={`${name}.${index}.value`}>{labelPrefix} Value</Label>
                <Controller
                    name={`${name}.${index}.value`}
                    control={control}
                    render={({ field: controllerField }) => <Input type="number" {...controllerField} placeholder="0" />}
                />
                {errors?.[name]?.[index]?.value && <p className="text-xs text-destructive mt-1">{errors[name][index].value.message}</p>}
              </div>
          </div>
          {index >= initialProducts.length && ( // Only allow removing dynamically added products
            <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)} className="text-destructive hover:bg-destructive/10">
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
      {/* <Button type="button" variant="outline" onClick={() => append({ productId: "", value: 0 })} className="text-sm">
        <PlusCircle className="mr-2 h-4 w-4" /> Add Product for {labelPrefix}
      </Button> */}
    </div>
  );
};


export default function AISuggestionForm({ onFormSubmitSuccess }: AISuggestionFormProps) {
  const [state, formAction] = useFormState<AISuggestionFormState, FormData>(submitAISuggestionForm as any, { status: 'idle' });
  
  const { control, handleSubmit, formState: { errors: clientErrors, isValid, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    if (state.status === 'success') {
      onFormSubmitSuccess(state);
      reset(defaultValues); // Reset form on successful submission
    }
  }, [state, onFormSubmitSuccess, reset]);


  return (
    <Card className="w-full max-w-3xl mx-auto liquid-glass">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">AI Inventory Optimization</CardTitle>
        <CardDescription>
          Provide your current inventory data. Our AI will analyze it and suggest optimal restock timelines and quantities.
          Default product IDs are pre-filled for: {initialProducts.map(p => `${p.name} (${p.productId})`).join(', ')}.
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-6">
          {state.status === 'error' && state.message && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{state.message}</AlertDescription>
              {state.errors && (
                <ul className="list-disc list-inside mt-2 text-xs">
                  {state.errors.map((err, i) => <li key={i}>{err.path.join('.')} : {err.message}</li>)}
                </ul>
              )}
            </Alert>
          )}

          <div>
            <h3 className="text-lg font-semibold font-headline mb-2">Current Inventory Levels</h3>
            <FieldArrayComponent control={control} name="currentInventoryLevels" labelPrefix="Inventory" errors={clientErrors} />
          </div>
          <Separator />
          <div>
            <h3 className="text-lg font-semibold font-headline mb-2">Predicted Demand (Next Period)</h3>
            <FieldArrayComponent control={control} name="predictedDemand" labelPrefix="Demand" errors={clientErrors} />
          </div>
          <Separator />
          <div>
            <h3 className="text-lg font-semibold font-headline mb-2">Lead Times (Days)</h3>
            <FieldArrayComponent control={control} name="leadTimes" labelPrefix="Lead Time" errors={clientErrors} />
          </div>
          <Separator />
           <div>
            <h3 className="text-lg font-semibold font-headline mb-2">Holding Costs (Per Unit Per Period)</h3>
            <FieldArrayComponent control={control} name="holdingCosts" labelPrefix="Holding Cost" errors={clientErrors} />
          </div>
          <Separator />
           <div>
            <h3 className="text-lg font-semibold font-headline mb-2">Stockout Costs (Per Unit)</h3>
            <FieldArrayComponent control={control} name="stockoutCosts" labelPrefix="Stockout Cost" errors={clientErrors} />
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}
