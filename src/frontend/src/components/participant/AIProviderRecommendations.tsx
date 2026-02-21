import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Star, Calendar, ArrowRight } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { generateProviderRecommendations } from '../../utils/fakeAIData';

export default function AIProviderRecommendations() {
  const navigate = useNavigate();
  const recommendations = generateProviderRecommendations();

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-success';
    if (score >= 80) return 'text-primary';
    return 'text-warning';
  };

  return (
    <Card className="shadow-layer-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          AI Provider Matches
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((provider, index) => (
          <div
            key={index}
            className="p-4 rounded-xl border border-border bg-card hover:shadow-md transition-all cursor-pointer"
            onClick={() => navigate({ to: '/providers' })}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-semibold text-foreground">{provider.name}</h4>
                <p className="text-sm text-muted-foreground">{provider.specialty}</p>
              </div>
              <div className="flex items-center gap-1">
                <Star className={`w-4 h-4 ${getScoreColor(provider.matchScore)}`} />
                <span className={`font-bold ${getScoreColor(provider.matchScore)}`}>
                  {provider.matchScore}%
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{provider.reason}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                {provider.availability}
              </div>
              <ArrowRight className="w-4 h-4 text-primary" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
