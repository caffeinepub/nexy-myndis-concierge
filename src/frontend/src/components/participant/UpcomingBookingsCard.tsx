import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Calendar, Clock } from 'lucide-react';
import type { Booking } from '../../backend';
import LoadingState from '../common/LoadingState';

interface UpcomingBookingsCardProps {
  bookings: Booking[];
  isLoading: boolean;
}

export default function UpcomingBookingsCard({ bookings, isLoading }: UpcomingBookingsCardProps) {
  const upcomingBookings = bookings
    .filter(b => b.status === 'confirmed' || b.status === 'pending')
    .slice(0, 5);

  return (
    <Card className="shadow-layer-2 border-border bg-gradient-to-br from-card to-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="text-primary" />
          Upcoming Bookings
        </CardTitle>
        <CardDescription>Your scheduled appointments</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <LoadingState message="Loading bookings..." />
        ) : upcomingBookings.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              No upcoming bookings yet
            </p>
            <p className="text-sm text-muted-foreground">
              Search for providers to book your first appointment
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingBookings.map((booking, index) => {
              const startDate = new Date(Number(booking.timeSlot.start) / 1000000);
              const statusColor = booking.status === 'confirmed' ? 'success' : 'warning';
              
              return (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 bg-muted/50 rounded-lg border-l-4 transition-smooth hover:shadow-md hover:scale-102 ${
                    booking.status === 'confirmed' ? 'border-success' : 'border-warning'
                  }`}
                >
                  <div className="flex-1">
                    <p className="font-medium text-foreground">
                      {booking.serviceType}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Clock size={14} />
                      <span>{startDate.toLocaleString()}</span>
                    </div>
                  </div>
                  <Badge
                    variant={booking.status === 'confirmed' ? 'default' : 'outline'}
                    className={`${booking.status === 'confirmed' ? 'bg-success text-success-foreground' : 'border-warning text-warning'} rounded-full font-medium`}
                  >
                    {booking.status}
                  </Badge>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
