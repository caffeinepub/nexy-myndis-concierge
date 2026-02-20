interface LoadingSkeletonProps {
  width?: string;
  height?: string;
  className?: string;
}

export default function LoadingSkeleton({ 
  width = '100%', 
  height = '20px',
  className = '' 
}: LoadingSkeletonProps) {
  return (
    <div
      className={`bg-gradient-to-r from-muted via-muted-foreground/20 to-muted bg-[length:200%_100%] animate-shimmer-skeleton rounded-lg ${className}`}
      style={{ width, height }}
    />
  );
}
