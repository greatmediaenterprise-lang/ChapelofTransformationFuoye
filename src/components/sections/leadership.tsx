import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Leadership = () => {
  const leaders = [
    {
      name: "Daddy Agu",
      position: "Council",
      image: "/lovable-uploads/9e3dd2a8-3f58-4614-a163-6471441dd79c.png",
      description: "Leading with wisdom and spiritual insight, Daddy Agu serves as our Council, guiding the chapel with dedication and love for God's people."
    },
    {
      name: "Daddy Osamaka",
      position: "Chaplain", 
      image: "/lovable-uploads/57c095bd-1e50-443f-8680-f414f5cb9b9a.png",
      description: "Our beloved Chaplain, Daddy Osamaka, shepherds the congregation with pastoral care and teaches with power and authority from God's Word."
    }
  ];

  return (
    <section id="leadership" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Leadership
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary mb-6">
            Our Leadership
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Meet the dedicated leaders who guide Chapel of Transformation with wisdom, love, and spiritual insight.
          </p>
        </div>

        {/* Leadership Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {leaders.map((leader, index) => (
            <Card key={index} className="group hover:shadow-divine transition-divine border-0 overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={leader.image}
                    alt={`${leader.name} - ${leader.position}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-divine"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-2xl font-serif font-semibold text-primary">
                      {leader.name}
                    </h3>
                    <Badge variant="outline" className="border-church-gold text-church-gold">
                      {leader.position}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {leader.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Chapel Parents Section */}
        <div className="text-center">
          <Card className="inline-block max-w-2xl shadow-gentle border-0">
            <CardContent className="p-8">
              <div className="mb-6">
                <img 
                  src="/lovable-uploads/5e63f4a9-403e-420d-ac60-9536527b0e49.png"
                  alt="Chapel Parents - Thank You Fathers & Mothers"
                  className="w-full h-auto rounded-lg shadow-gentle"
                />
              </div>
              <h3 className="text-2xl font-serif font-semibold text-primary mb-4">
                Our Chapel Parents
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                We honor and appreciate our spiritual fathers and mothers who continue to labor 
                in love for the growth and development of Chapel of Transformation. Their dedication 
                and service are the foundation of our chapel family.
              </p>
              <div className="mt-6">
                <Badge variant="secondary" className="text-sm font-medium">
                  We Are One Big Family!
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Leadership;