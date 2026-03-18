import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const Leadership = () => {
  const [leaders, setLeaders] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("leaders").select("*").order("display_order").then(({ data }) => {
      if (data && data.length > 0) setLeaders(data);
      else setLeaders([
        { name: "Daddy Agu", position: "Council", description: "Leading with wisdom and spiritual insight.", image_url: "/lovable-uploads/9e3dd2a8-3f58-4614-a163-6471441dd79c.png" },
        { name: "Daddy Osamaka", position: "Chaplain", description: "Our beloved Chaplain shepherds the congregation.", image_url: "/lovable-uploads/57c095bd-1e50-443f-8680-f414f5cb9b9a.png" },
      ]);
    });
  }, []);

  return (
    <section id="leadership" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Leadership</Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary mb-6">Our Leadership</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Meet the dedicated leaders who guide Chapel of Transformation with wisdom, love, and spiritual insight.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {leaders.map((leader, index) => (
            <Card key={leader.id || index} className="group hover:shadow-divine transition-divine border-0 overflow-hidden">
              <CardContent className="p-0">
                {leader.image_url && (
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={leader.image_url} alt={`${leader.name} - ${leader.position}`} className="w-full h-full object-cover group-hover:scale-105 transition-divine" />
                  </div>
                )}
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-2xl font-serif font-semibold text-primary">{leader.name}</h3>
                    <Badge variant="outline" className="border-church-gold text-church-gold">{leader.position}</Badge>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{leader.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Card className="inline-block max-w-2xl shadow-gentle border-0">
            <CardContent className="p-8">
              <div className="mb-6">
                <img src="/lovable-uploads/5e63f4a9-403e-420d-ac60-9536527b0e49.png" alt="Chapel Parents" className="w-full h-auto rounded-lg shadow-gentle" />
              </div>
              <h3 className="text-2xl font-serif font-semibold text-primary mb-4">Our Chapel Parents</h3>
              <p className="text-muted-foreground leading-relaxed">
                We honor and appreciate our spiritual fathers and mothers who continue to labor in love for the growth and development of Chapel of Transformation.
              </p>
              <div className="mt-6">
                <Badge variant="secondary" className="text-sm font-medium">We Are One Big Family!</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Leadership;
