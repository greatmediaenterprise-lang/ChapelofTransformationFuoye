import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin } from "lucide-react";
import { useLiveTable } from "@/hooks/use-live-table";
import ChapelLoader from "@/components/ui/chapel-loader";

interface Event {
  id: string;
  title: string;
  description: string | null;
  event_date: string | null;
  location: string | null;
  image_url: string | null;
  created_at: string;
}

const Events = () => {
  const { data: events, loading } = useLiveTable<Event>("events", "event_date", true);

  return (
    <section id="events" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Events</Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary mb-6">
            Upcoming Events
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Stay updated with our upcoming programs, services, and special events.
          </p>
        </div>

        {loading ? (
          <ChapelLoader label="Loading events" />
        ) : events.length === 0 ? (
          <div className="text-center py-16">
            <CalendarDays className="h-16 w-16 mx-auto text-muted-foreground/40 mb-4" />
            <p className="text-muted-foreground text-lg">No upcoming events. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card key={event.id} className="overflow-hidden border-0 shadow-gentle hover:shadow-divine transition-divine">
                {event.image_url && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={event.image_url}
                      alt={event.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
                <CardContent className="p-5">
                  <h3 className="font-serif font-bold text-primary text-lg mb-2">{event.title}</h3>
                  {event.description && (
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{event.description}</p>
                  )}
                  <div className="flex flex-col gap-2">
                    {event.event_date && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarDays className="h-4 w-4 text-primary" />
                        <span>{new Date(event.event_date).toLocaleDateString("en-US", {
                          weekday: "long", year: "numeric", month: "long", day: "numeric",
                          hour: "2-digit", minute: "2-digit"
                        })}</span>
                      </div>
                    )}
                    {event.location && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;
