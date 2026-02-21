import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Badge } from '../ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { AlertTriangle, CheckCircle, XCircle, ChevronDown, Calendar } from 'lucide-react';
import type { BudgetValidationResult } from '../../types/mock-types';
import { useState } from 'react';

interface BudgetValidationAlertProps {
  validation: BudgetValidationResult;
  className?: string;
}

export default function BudgetValidationAlert({ validation, className = '' }: BudgetValidationAlertProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasWarnings = validation.warnings.length > 0;
  const hasReasons = validation.reasons.length > 0;
  const hasRecommendations = validation.recommendedAdjustments.length > 0;

  return (
    <Alert 
      className={`${className} ${
        !validation.valid ? 'border-destructive bg-destructive/5' : 
        hasWarnings ? 'border-warning bg-warning/5' : 
        'border-success bg-success/5'
      }`}
    >
      <div className="flex items-start gap-3">
        {!validation.valid ? (
          <XCircle className="w-5 h-5 text-destructive mt-0.5" />
        ) : hasWarnings ? (
          <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
        ) : (
          <CheckCircle className="w-5 h-5 text-success mt-0.5" />
        )}
        
        <div className="flex-1 space-y-2">
          <AlertTitle className="text-base font-semibold">
            {!validation.valid ? 'Budget Validation Failed' : 
             hasWarnings ? 'Budget Warning' : 
             'Budget Validation Passed'}
          </AlertTitle>

          <AlertDescription className="space-y-3">
            {/* Reasons for rejection */}
            {hasReasons && (
              <div className="space-y-1">
                {validation.reasons.map((reason, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <XCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                    <span>{reason}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Warnings */}
            {hasWarnings && (
              <div className="space-y-1">
                {validation.warnings.map((warning, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <AlertTriangle className="w-4 h-4 text-warning mt-0.5 shrink-0" />
                    <span>{warning}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Predicted depletion date */}
            {validation.predictedDepletionDate && (
              <div className="flex items-center gap-2 text-sm bg-muted rounded-lg p-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>
                  Predicted budget depletion: {new Date(Number(validation.predictedDepletionDate) / 1000000).toLocaleDateString()}
                </span>
              </div>
            )}

            {/* Expandable details */}
            {hasRecommendations && (
              <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
                <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                  <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  View Recommended Adjustments
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2 space-y-2">
                  {validation.recommendedAdjustments.map(([category, amount], index) => (
                    <div key={index} className="flex items-center justify-between text-sm bg-muted rounded-lg p-2">
                      <span className="font-medium">{category}</span>
                      <Badge variant="outline">${Number(amount).toLocaleString()}</Badge>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            )}
          </AlertDescription>
        </div>
      </div>
    </Alert>
  );
}
