import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSiteContent } from "@/hooks/use-site-content";

const Services = () => {
  const [services, setServices] = useState<any[]>([]);
  const { get } = useSiteContent();

  useEffect(() => {
    supabase.from("service_times").select("*").order("display_order").then(({ data }) => {
      if (data && data.length > 0) setServices(data);
      else setServices([
        { title: "Sunday Service", day: "Every Sunday", time: "8:00 AM - 11:30 AM", description: "Join us for worship" },
        { title: "Bible Study", day: "Every Wednesday", time: "5:30 PM - 6:30 PM", description: "Deep dive into God's Word" },
        { title: "Prayer Meeting", day: "Every Friday", time: "5:30 PM - 6:30 PM", description: "Corporate prayer" },
      ]);
    });
  }, []);

  const iconMap: Record<number, any> = { 0: Calendar, 1: Clock, 2: Calendar };
  const videoUrl = get("services", "video_url", "https://www.facebook.com/share/v/16jXBxWpMJ/");

  return (
    <section id="services" className="py-20 blessing-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Services</Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary mb-6">Join Our Services</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Come and experience the transforming power of God in fellowship, worship, and the Word.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((s, index) => {
            const Icon = iconMap[index % 3] || Calendar;
            return (
              <Card key={s.id || index} className="group hover:shadow-divine transition-divine border-0 bg-background">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-primary-foreground rounded-full mb-4 group-hover:scale-110 transition-divine">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h4 className="text-lg font-serif font-semibold text-primary mb-2">{s.title}</h4>
                  <p className="text-lg font-semibold text-church-gold mb-2">{s.day}</p>
                  <p className="text-sm text-muted-foreground">{s.time} {s.description ? `— ${s.description}` : ""}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mb-12">
          <Card className="inline-block max-w-4xl shadow-divine border-0 bg-background">
            <CardContent className="p-8">
              <h3 className="text-2xl md:text-3xl font-serif font-semibold text-primary mb-6">Experience Our Chapel</h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Get a glimpse of the worship, fellowship, and transformational experiences that await you.
              </p>
              <div className="relative mb-6">
                <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="block">
                  <div className="aspect-video bg-church-light-blue rounded-lg flex items-center justify-center group cursor-pointer hover:bg-church-blue/10 transition-divine">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-primary text-primary-foreground rounded-full mb-4 group-hover:scale-110 transition-divine">
                        <Play className="h-10 w-10 ml-1" />
                      </div>
                      <p className="text-primary font-semibold">Watch Our Chapel Preview</p>
                    </div>
                  </div>
                </a>
              </div>
              <Button asChild size="lg" variant="default" className="shadow-gentle hover:shadow-divine transition-divine">
                <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                  <Play className="mr-2 h-5 w-5" />Watch on Facebook
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Card className="inline-block shadow-gentle border-0 bg-church-gold text-church-gold-foreground">
            <CardContent className="p-8">
              <h3 className="text-2xl font-serif font-semibold mb-4 text-white">Ready to Join Us?</h3>
              <p className="text-lg mb-6 text-white/90">Worship with us @ Chapel of Transformation, Phase one, Main Auditorium.</p>
              <Button asChild size="lg" variant="secondary" className="bg-white text-church-gold hover:bg-white/90 transition-divine">
                <a href="https://linktr.ee/cotfuoye" target="_blank" rel="noopener noreferrer">Join Us</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Services;
