import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';
import type { BudgetValidationResult } from '../../types/mock-types';

interface ValidationExplanationModalProps {
  isOpen: boolean;
  onClose: () => void;
  validation: BudgetValidationResult;
  transactionDetails?: {
    category: string;
    amount: number;
  };
}

export default function ValidationExplanationModal({
  isOpen,
  onClose,
  validation,
  transactionDetails,
}: ValidationExplanationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            {validation.valid ? (
              <CheckCircle className="w-6 h-6 text-success" />
            ) : (
              <XCircle className="w-6 h-6 text-destructive" />
            )}
            AI Validation Explanation
          </DialogTitle>
          <DialogDescription>
            Detailed breakdown of the budget validation decision
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Transaction Details */}
          {transactionDetails && (
            <div className="bg-muted rounded-lg p-4">
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Info className="w-4 h-4" />
                Transaction Details
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Category:</span>
                  <p className="font-medium">{transactionDetails.category}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Amount:</span>
                  <p className="font-medium">${transactionDetails.amount.toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}

          {/* Validation Decision */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Validation Decision</h3>
            <Badge 
              variant={validation.valid ? "default" : "destructive"}
              className="text-sm px-3 py-1"
            >
              {validation.valid ? 'APPROVED' : 'REJECTED'}
            </Badge>
          </div>

          <Separator />

          {/* Reasons for Rejection */}
          {validation.reasons.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <XCircle className="w-4 h-4 text-destructive" />
                Reasons for Rejection
              </h3>
              <ul className="space-y-2">
                {validation.reasons.map((reason, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm bg-destructive/5 rounded-lg p-3">
                    <span className="text-destructive mt-0.5">•</span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Warnings */}
          {validation.warnings.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-warning" />
                Warnings
              </h3>
              <ul className="space-y-2">
                {validation.warnings.map((warning, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm bg-warning/5 rounded-lg p-3">
                    <span className="text-warning mt-0.5">•</span>
                    <span>{warning}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Recommended Adjustments */}
          {validation.recommendedAdjustments.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Recommended Adjustments</h3>
              <div className="space-y-2">
                {validation.recommendedAdjustments.map(([category, amount], index) => (
                  <div key={index} className="flex items-center justify-between bg-muted rounded-lg p-3">
                    <span className="text-sm font-medium">{category}</span>
                    <Badge variant="outline" className="text-sm">
                      ${Number(amount).toLocaleString()}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Predicted Depletion Date */}
          {validation.predictedDepletionDate && (
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-foreground mb-2">Budget Projection</h3>
              <p className="text-sm text-muted-foreground">
                Based on current spending patterns, this budget category is projected to be depleted by{' '}
                <span className="font-semibold text-foreground">
                  {new Date(Number(validation.predictedDepletionDate) / 1000000).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </p>
            </div>
          )}

          {/* AI Confidence Note */}
          <div className="bg-muted/50 rounded-lg p-4 text-xs text-muted-foreground">
            <p>
              This validation was performed by our AI budget monitoring system. The decision is based on your current
              budget allocation, spending patterns, and NDIS compliance requirements. If you believe this decision is
              incorrect, please contact your plan manager.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
