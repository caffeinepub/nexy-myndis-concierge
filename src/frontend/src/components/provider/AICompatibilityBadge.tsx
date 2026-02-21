import { Star } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { generateCompatibilityScore } from '../../utils/fakeAIData';

interface AICompatibilityBadgeProps {
  participantId?: string;
}

export default function AICompatibilityBadge({ participantId }: AICompatibilityBadgeProps) {
  const score = generateCompatibilityScore();

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-success bg-success/10 border-success/20';
    if (score >= 70) return 'text-warning bg-warning/10 border-warning/20';
    return 'text-destructive bg-destructive/10 border-destructive/20';
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full border ${getScoreColor(score)}`}>
            <Star className="w-3 h-3" />
            <span className="text-xs font-semibold">{score}%</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">AI Compatibility Score</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
