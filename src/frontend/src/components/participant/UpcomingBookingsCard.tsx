import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Badge } from '../ui/badge';
import type { Booking } from '../../types/mock-types';

interface UpcomingBookingsCardProps {
  bookings: Booking[];
  isLoading?: boolean;
}

export default function UpcomingBookingsCard({ bookings, isLoading }: UpcomingBookingsCardProps) {
  if (isLoading) {
    return (
      <Card className="shadow-layer-2 border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="text-primary" />
            Upcoming Bookings
          </CardTitle>
          <CardDescription>Loading...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (bookings.length === 0) {
    return (
      <Card className="shadow-layer-2 border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="text-primary" />
            Upcoming Bookings
          </CardTitle>
          <CardDescription>No upcoming bookings</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge variant="default">Confirmed</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card className="shadow-layer-2 border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="text-primary" />
          Upcoming Bookings
        </CardTitle>
        <CardDescription>{bookings.length} booking{bookings.length !== 1 ? 's' : ''}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {bookings.map((booking, index) => {
          const startTime = new Date(Number(booking.timeSlot.start) / 1000000);
          
          return (
            <div key={index} className="p-4 rounded-xl border border-border bg-muted/30">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-foreground">{booking.serviceType}</p>
                  <p className="text-sm text-muted-foreground">
                    Provider: {booking.provider.toString().slice(0, 8)}...
                  </p>
                </div>
                {getStatusBadge(booking.status)}
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{startTime.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{startTime.toLocaleTimeString()}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className="text-muted-foreground">Price:</span>
                  <span className="font-semibold text-foreground">${Number(booking.price).toLocaleString()}</span>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
