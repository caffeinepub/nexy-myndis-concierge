import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';
import { Label } from '../ui/label';
import { useUpdateAIValidationThresholds } from '../../hooks/useQueries';
import { toast } from 'sonner';
import { Save, RotateCcw, AlertTriangle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';

export default function ThresholdConfigurationPanel() {
  const updateThresholds = useUpdateAIValidationThresholds();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // Default threshold values
  const [budgetWarning75, setBudgetWarning75] = useState(75);
  const [budgetWarning90, setBudgetWarning90] = useState(90);
  const [budgetCritical, setBudgetCritical] = useState(100);
  const [anomalySensitivity, setAnomalySensitivity] = useState(70);
  const [complianceStrictness, setComplianceStrictness] = useState(85);

  const handleSave = async () => {
    try {
      const thresholds: Array<[string, number]> = [
        ['budget_warning_75', budgetWarning75 / 100],
        ['budget_warning_90', budgetWarning90 / 100],
        ['budget_critical', budgetCritical / 100],
        ['anomaly_sensitivity', anomalySensitivity / 100],
        ['compliance_strictness', complianceStrictness / 100],
      ];

      await updateThresholds.mutateAsync(thresholds);
      toast.success('AI validation thresholds updated successfully');
      setShowConfirmDialog(false);
    } catch (error: any) {
      console.error('Failed to update thresholds:', error);
      toast.error(error.message || 'Failed to update thresholds');
    }
  };

  const handleReset = () => {
    setBudgetWarning75(75);
    setBudgetWarning90(90);
    setBudgetCritical(100);
    setAnomalySensitivity(70);
    setComplianceStrictness(85);
    toast.info('Thresholds reset to defaults');
  };

  return (
    <Card className="shadow-layer-2 border-border">
      <CardHeader>
        <CardTitle>Validation Thresholds</CardTitle>
        <CardDescription>
          Adjust AI validation sensitivity and budget warning thresholds
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Budget Warning Thresholds */}
        <div className="space-y-6">
          <h3 className="text-sm font-semibold text-foreground">Budget Warning Thresholds</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="warning-75" className="text-sm">First Warning (Yellow)</Label>
              <span className="text-sm font-bold text-warning">{budgetWarning75}%</span>
            </div>
            <Slider
              id="warning-75"
              value={[budgetWarning75]}
              onValueChange={(value) => setBudgetWarning75(value[0])}
              min={50}
              max={100}
              step={5}
              className="[&>span]:bg-warning"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="warning-90" className="text-sm">Critical Warning (Orange)</Label>
              <span className="text-sm font-bold text-destructive">{budgetWarning90}%</span>
            </div>
            <Slider
              id="warning-90"
              value={[budgetWarning90]}
              onValueChange={(value) => setBudgetWarning90(value[0])}
              min={75}
              max={100}
              step={5}
              className="[&>span]:bg-destructive"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="critical" className="text-sm">Budget Exceeded (Red)</Label>
              <span className="text-sm font-bold text-destructive">{budgetCritical}%</span>
            </div>
            <Slider
              id="critical"
              value={[budgetCritical]}
              onValueChange={(value) => setBudgetCritical(value[0])}
              min={90}
              max={120}
              step={5}
              className="[&>span]:bg-destructive"
            />
          </div>
        </div>

        {/* Anomaly Detection */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">Anomaly Detection Sensitivity</h3>
          <div className="flex items-center justify-between">
            <Label htmlFor="anomaly" className="text-sm">Sensitivity Level</Label>
            <span className="text-sm font-bold text-primary">{anomalySensitivity}%</span>
          </div>
          <Slider
            id="anomaly"
            value={[anomalySensitivity]}
            onValueChange={(value) => setAnomalySensitivity(value[0])}
            min={50}
            max={100}
            step={5}
          />
          <p className="text-xs text-muted-foreground">
            Higher values increase sensitivity to unusual patterns
          </p>
        </div>

        {/* Compliance Strictness */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">Compliance Strictness</h3>
          <div className="flex items-center justify-between">
            <Label htmlFor="compliance" className="text-sm">Strictness Level</Label>
            <span className="text-sm font-bold text-primary">{complianceStrictness}%</span>
          </div>
          <Slider
            id="compliance"
            value={[complianceStrictness]}
            onValueChange={(value) => setComplianceStrictness(value[0])}
            min={50}
            max={100}
            step={5}
          />
          <p className="text-xs text-muted-foreground">
            Higher values enforce stricter NDIS compliance checks
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-4">
          <Button
            onClick={() => setShowConfirmDialog(true)}
            disabled={updateThresholds.isPending}
            className="flex-1"
          >
            <Save className="w-4 h-4 mr-2" />
            {updateThresholds.isPending ? 'Saving...' : 'Save Changes'}
          </Button>
          <Button
            variant="outline"
            onClick={handleReset}
            disabled={updateThresholds.isPending}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>

        {/* Last Modified Info */}
        <div className="text-xs text-muted-foreground pt-4 border-t border-border">
          Last modified: Never (using defaults)
        </div>
      </CardContent>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Confirm Threshold Changes
            </AlertDialogTitle>
            <AlertDialogDescription>
              Changing AI validation thresholds will affect all future budget validations and anomaly detection.
              This may impact how transactions are flagged and approved. Are you sure you want to proceed?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSave}>
              Confirm Changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
