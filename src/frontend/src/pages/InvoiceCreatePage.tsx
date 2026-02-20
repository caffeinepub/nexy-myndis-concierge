import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useCreateInvoice } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import PageLayout from '../components/layout/PageLayout';
import { Button } from '../components/ui/button';
import { Plus, Trash2, Loader2 } from 'lucide-react';
import { Principal } from '@icp-sdk/core/principal';
import { toast } from 'sonner';
import type { Invoice, InvoiceLineItem, InvoiceStatus } from '../backend';

interface LineItem {
  description: string;
  quantity: number;
  price: number;
}

export default function InvoiceCreatePage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const createInvoice = useCreateInvoice();

  const [participantId, setParticipantId] = useState('');
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { description: '', quantity: 1, price: 0 },
  ]);

  const addLineItem = () => {
    setLineItems([...lineItems, { description: '', quantity: 1, price: 0 }]);
  };

  const removeLineItem = (index: number) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter((_, i) => i !== index));
    }
  };

  const updateLineItem = (index: number, field: keyof LineItem, value: string | number) => {
    const updated = [...lineItems];
    updated[index] = { ...updated[index], [field]: value };
    setLineItems(updated);
  };

  const calculateTotal = () => {
    return lineItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!identity) {
      toast.error('Authentication required');
      return;
    }

    try {
      const participantPrincipal = Principal.fromText(participantId);
      
      const invoiceItems: InvoiceLineItem[] = lineItems.map(item => ({
        description: item.description,
        quantity: BigInt(item.quantity),
        price: BigInt(Math.round(item.price * 100)),
      }));

      const invoice: Invoice = {
        number: `INV-${Date.now()}`,
        provider: identity.getPrincipal(),
        participant: participantPrincipal,
        items: invoiceItems,
        status: 'pending' as InvoiceStatus,
        totalAmount: BigInt(Math.round(calculateTotal() * 100)),
      };

      await createInvoice.mutateAsync(invoice);
      toast.success('Invoice created successfully!');
      navigate({ to: '/dashboard' });
    } catch (error: any) {
      console.error('Invoice creation error:', error);
      toast.error(error.message || 'Failed to create invoice');
    }
  };

  return (
    <PageLayout title="Create Invoice">
      <div className="max-w-4xl mx-auto">
        <div className="bg-card rounded-2xl shadow-layer-2 p-8 border border-border">
          <h1 className="text-3xl font-bold text-foreground mb-6">Create New Invoice</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Participant Principal ID *
              </label>
              <input
                type="text"
                value={participantId}
                onChange={(e) => setParticipantId(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-input rounded-xl text-sm transition-all focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 bg-background font-mono"
                placeholder="Enter participant's principal ID"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Line Items</h2>
                <Button type="button" onClick={addLineItem} variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Button>
              </div>

              {lineItems.map((item, index) => (
                <div key={index} className="bg-muted rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      Item {index + 1}
                    </span>
                    {lineItems.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeLineItem(index)}
                        variant="ghost"
                        size="sm"
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Description *
                    </label>
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateLineItem(index, 'description', e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-input rounded-lg text-sm bg-background"
                      placeholder="Service description"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Quantity *
                      </label>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateLineItem(index, 'quantity', Number(e.target.value))}
                        required
                        min="1"
                        className="w-full px-3 py-2 border border-input rounded-lg text-sm bg-background"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Price (AUD) *
                      </label>
                      <input
                        type="number"
                        value={item.price}
                        onChange={(e) => updateLineItem(index, 'price', Number(e.target.value))}
                        required
                        min="0"
                        step="0.01"
                        className="w-full px-3 py-2 border border-input rounded-lg text-sm bg-background"
                      />
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-semibold text-foreground">
                      Subtotal: ${(item.quantity * item.price).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-primary/10 rounded-xl p-6 border border-primary/20">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-foreground">Total Amount</span>
                <span className="text-2xl font-bold text-primary">
                  ${calculateTotal().toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate({ to: '/dashboard' })}
                className="flex-1"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={createInvoice.isPending || !participantId || lineItems.some(item => !item.description)}
                className="flex-1"
              >
                {createInvoice.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Invoice...
                  </>
                ) : (
                  'Create Invoice'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  );
}
