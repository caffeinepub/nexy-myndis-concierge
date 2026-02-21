import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import PageLayout from '../components/layout/PageLayout';
import AILineItemSuggestions from '../components/invoice/AILineItemSuggestions';
import AIPricingValidator from '../components/invoice/AIPricingValidator';
import AICompletenessChecker from '../components/invoice/AICompletenessChecker';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LineItemState {
  description: string;
  quantity: number;
  price: number;
}

export default function InvoiceCreatePage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [invoiceNumber, setInvoiceNumber] = useState<string>('');
  const [participantPrincipalStr, setParticipantPrincipalStr] = useState<string>('');
  const [lineItems, setLineItems] = useState<LineItemState[]>([
    { description: '', quantity: 1, price: 0 },
  ]);

  const addLineItem = () => {
    setLineItems([...lineItems, { description: '', quantity: 1, price: 0 }]);
  };

  const removeLineItem = (index: number) => {
    setLineItems(lineItems.filter((_, i) => i !== index));
  };

  const updateLineItem = (index: number, field: keyof LineItemState, value: string | number) => {
    const updated = [...lineItems];
    updated[index] = { ...updated[index], [field]: value };
    setLineItems(updated);
  };

  const handleSuggestionSelect = (suggestion: { description: string; quantity: number; price: number }) => {
    setLineItems([...lineItems, suggestion]);
  };

  const totalAmount = lineItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!identity || !participantPrincipalStr) return;

    setIsSubmitting(true);

    // Mock invoice creation
    setTimeout(() => {
      setIsSubmitting(false);
      navigate({ to: '/dashboard' });
    }, 1000);
  };

  return (
    <PageLayout title="Create Invoice">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Create Invoice</h1>
          <p className="text-lg text-muted-foreground">
            Generate an invoice for services provided with AI assistance
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 shadow-layer-2 border border-border space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="invoiceNumber">Invoice Number</Label>
                  <Input
                    id="invoiceNumber"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    placeholder="INV-2024-001"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="participant">Participant Principal</Label>
                  <Input
                    id="participant"
                    value={participantPrincipalStr}
                    onChange={(e) => setParticipantPrincipalStr(e.target.value)}
                    placeholder="Enter participant principal ID"
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Line Items</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addLineItem}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Item
                  </Button>
                </div>

                {lineItems.map((item, index) => (
                  <div key={index} className="p-4 rounded-xl border border-border bg-muted/30 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="flex-1 space-y-3">
                        <Input
                          placeholder="Service description"
                          value={item.description}
                          onChange={(e) => updateLineItem(index, 'description', e.target.value)}
                          required
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <Input
                            type="number"
                            placeholder="Quantity"
                            value={item.quantity}
                            onChange={(e) => updateLineItem(index, 'quantity', Number(e.target.value))}
                            min="1"
                            required
                          />
                          <Input
                            type="number"
                            placeholder="Price"
                            value={item.price}
                            onChange={(e) => updateLineItem(index, 'price', Number(e.target.value))}
                            min="0"
                            required
                          />
                        </div>
                        <AIPricingValidator price={item.price} serviceType={item.description} />
                      </div>
                      {lineItems.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeLineItem(index)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-border">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total Amount:</span>
                  <span>${totalAmount.toLocaleString()}</span>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating Invoice...' : 'Create Invoice'}
              </Button>
            </form>
          </div>

          <div className="space-y-6">
            <AILineItemSuggestions onSelectSuggestion={handleSuggestionSelect} />
            <AICompletenessChecker />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
