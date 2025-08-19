import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users, Play } from "lucide-react";

const Services = () => {
  const serviceInfo = [
    {
      icon: Calendar,
      title: "Sunday Service",
      details: "Every Sunday",
      description: "Join us for worship, fellowship, and the Word"
    },
    {
      icon: Clock,
      title: "Service Time",
      details: "8:00 AM - 11:30 AM",
      description: "Experience transformation through worship"
    },
    {
      icon: Calendar,
      title: "Bible Study",
      details: "Every Wednesday",
      description: "5:30 PM - 6:30 PM"
    },
    {
      icon: Calendar,
      title: "Prayer Meeting",
      details: "Every Friday",
      description: "5:30 PM - 6:30 PM"
    },
    {
      icon: MapPin,
      title: "Location",
      details: "Phase One, Main Auditorium",
      description: "Federal University Oye Ekiti"
    },
    {
      icon: Users,
      title: "Fellowship",
      details: "All Are Welcome",
      description: "Interdenominational Christian community"
    }
  ];

  return (
    <section id="services" className="py-20 blessing-gradient">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Services
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary mb-6">
            Join Our Services
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Come and experience the transforming power of God in fellowship, worship, and the Word.
          </p>
        </div>

        {/* Service Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {serviceInfo.map((info, index) => (
            <Card key={index} className="group hover:shadow-divine transition-divine border-0 bg-background">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-primary-foreground rounded-full mb-4 group-hover:scale-110 transition-divine">
                  <info.icon className="h-8 w-8" />
                </div>
                <h4 className="text-lg font-serif font-semibold text-primary mb-2">
                  {info.title}
                </h4>
                <p className="text-lg font-semibold text-church-gold mb-2">
                  {info.details}
                </p>
                <p className="text-sm text-muted-foreground">
                  {info.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Video Section */}
        <div className="text-center mb-12">
          <Card className="inline-block max-w-4xl shadow-divine border-0 bg-background">
            <CardContent className="p-8">
              <h3 className="text-2xl md:text-3xl font-serif font-semibold text-primary mb-6">
                Experience Our Chapel
              </h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Get a glimpse of the worship, fellowship, and transformational experiences 
                that await you at Chapel of Transformation.
              </p>
              
              {/* Video Preview */}
              <div className="relative mb-6">
                <a 
                  href="https://www.facebook.com/share/v/16jXBxWpMJ/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
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

              <Button 
                asChild
                size="lg" 
                variant="default"
                className="shadow-gentle hover:shadow-divine transition-divine"
              >
                <a 
                  href="https://www.facebook.com/share/v/16jXBxWpMJ/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch on Facebook
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="inline-block shadow-gentle border-0 bg-church-gold text-church-gold-foreground">
            <CardContent className="p-8">
              <h3 className="text-2xl font-serif font-semibold mb-4 text-white">
                Ready to Join Us?
              </h3>
               <p className="text-lg mb-6 text-white/90">
                 Worship with us @ Chapel of Transformation, Phase one, Main Auditorium.
               </p>
               <Button 
                 asChild
                 size="lg" 
                 variant="secondary"
                 className="bg-white text-church-gold hover:bg-white/90 transition-divine"
               >
                 <a 
                   href="https://linktr.ee/cotfuoye" 
                   target="_blank" 
                   rel="noopener noreferrer"
                 >
                   Join Us
                 </a>
               </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Services;