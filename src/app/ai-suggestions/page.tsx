"use client"; // Top-level client component to manage state between form and results

import { useState } from 'react';
import AISuggestionForm from '@/components/ai/suggestion-form';
import SuggestionResults from '@/components/ai/suggestion-results';
import type { AISuggestionFormState } from '@/lib/actions';

export default function AISuggestionsPage() {
  const [suggestionData, setSuggestionData] = useState<AISuggestionFormState | null>(null);

  const handleFormSuccess = (data: AISuggestionFormState) => {
    setSuggestionData(data);
  };

  return (
    <div className="space-y-8">
      <h1 className="font-headline text-4xl font-bold tracking-tight">AI Inventory Optimization</h1>
      <AISuggestionForm onFormSubmitSuccess={handleFormSuccess} />
      <SuggestionResults results={suggestionData?.data} />
    </div>
  );
}
