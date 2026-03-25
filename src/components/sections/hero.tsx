import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Users } from "lucide-react";
import { useSiteContent } from "@/hooks/use-site-content";

const Hero = () => {
  const { get } = useSiteContent();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-0">
      <div className="absolute inset-0 hero-gradient"></div>
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-white/5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="mb-4">
          <img src="/lovable-uploads/cot_logo.png" alt="Chapel of Transformation Logo" className="h-32 w-32 mx-auto mb-2 drop-shadow-lg object-contain" />
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight">
          Welcome to
          <span className="block text-secondary mt-2">Chapel of Transformation</span>
        </h1>

        <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed opacity-90">
          {get("hero", "subtitle", "An interdenominational Christian body at Federal University Oye Ekiti, dedicated to the propagation of the kingdom and perfecting holiness in the fear of God.")}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-12">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-secondary" />
            <span className="text-sm font-medium">Serving since 2012</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-secondary" />
            <span className="text-sm font-medium">Interdenominational Fellowship</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-3 shadow-gentle hover:shadow-divine transition-divine">
            <a href={`tel:${get("hero", "phone", "08082513103")}`}>
              Learn More About Us
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild className="text-lg px-8 py-3 bg-white/10 border-white/20 text-white hover:bg-white/20 transition-divine">
            <a href={get("hero", "cta_link", "https://linktr.ee/cotfuoye")} target="_blank" rel="noopener noreferrer">
              Join Our Services
            </a>
          </Button>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
