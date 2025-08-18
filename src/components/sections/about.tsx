import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book, Users, Heart, Star } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Holiness",
      description: "Perfecting holiness in the fear of God"
    },
    {
      icon: Users,
      title: "Unity",
      description: "Interdenominational Christian fellowship"
    },
    {
      icon: Book,
      title: "Teaching",
      description: "Kingdom propagation through God's Word"
    },
    {
      icon: Star,
      title: "Excellence",
      description: "Serving the university community since 2012"
    }
  ];

  return (
    <section id="about" className="py-20 bg-church-light-blue">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            About Us
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary mb-6">
            About Chapel of Transformation
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We are an interdenominational Christian body for the propagation of the kingdom.
            Perfecting holiness in the fear of God.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="mb-16">
          <Card className="shadow-gentle border-0 bg-background">
            <CardContent className="p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-serif font-semibold text-primary mb-6 text-center">
                Our Mission
              </h3>
              <p className="text-lg leading-relaxed text-center max-w-4xl mx-auto">
                Since 2012, Chapel of Transformation has been a beacon of faith at{" "}
                <span className="font-semibold text-primary">Federal University Oye Ekiti</span>.
                As a university chapel, we serve the academic community with a heart for spiritual 
                growth and transformation.
              </p>
              <p className="text-lg leading-relaxed text-center max-w-4xl mx-auto mt-4">
                Our interdenominational approach welcomes believers from all Christian backgrounds, 
                fostering unity in diversity as we pursue holiness and spiritual maturity together.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {values.map((value, index) => (
            <Card key={index} className="group hover:shadow-divine transition-divine border-0 bg-background">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-church-gold text-white rounded-full mb-4 group-hover:scale-110 transition-divine">
                  <value.icon className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-serif font-semibold text-primary mb-2">
                  {value.title}
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="inline-block shadow-gentle border-0 bg-primary text-primary-foreground">
            <CardContent className="p-8">
              <h3 className="text-2xl font-serif font-semibold mb-4">
                Join Our Community
              </h3>
              <p className="text-lg mb-6 opacity-90">
                Experience transformation through fellowship, worship, and the Word of God
              </p>
              <a 
                href="https://linktr.ee/cotfuoye" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/90 transition-divine"
              >
                Connect With Us Today
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;