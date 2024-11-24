import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const ChartSkeleton = () => (
  <Card className="w-full h-[444px]">
    <CardHeader className="pb-6 pt-6">
      <Skeleton className="h-8 w-1/3" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-[300px] w-full" />
    </CardContent>
  </Card>
);
