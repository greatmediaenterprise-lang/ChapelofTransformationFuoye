import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Mail, Facebook, Instagram, Youtube, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSiteContent } from "@/hooks/use-site-content";

const iconMap: Record<string, any> = {
  Facebook,
  YouTube: Youtube,
  Instagram,
  Linktree: ExternalLink,
};

const Footer = () => {
  const { get } = useSiteContent();
  const [leaders, setLeaders] = useState<any[]>([]);
  const [socials, setSocials] = useState<any[]>([]);
  const [mainBranch, setMainBranch] = useState<any>(null);

  useEffect(() => {
    supabase.from("leaders").select("name, position").order("display_order").then(({ data }) => {
      if (data) setLeaders(data);
    });
    supabase.from("social_links").select("*").order("display_order").then(({ data }) => {
      if (data) setSocials(data);
    });
    supabase.from("branches").select("*").order("display_order").then(({ data }) => {
      if (data && data.length > 0) setMainBranch(data.find((b: any) => b.is_main) || data[0]);
    });
  }, []);

  const location = mainBranch?.location || get("contact", "location", "Phase One, Main Auditorium");
  const serviceTime = mainBranch?.service_time || "Sunday: 8:00 AM - 11:30 AM";
  const email = get("contact", "email", "info@cotfuoye.org");

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Chapel Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="/lovable-uploads/cot_logo.png"
                alt="Chapel of Transformation Logo"
                className="h-14 w-14 object-contain"
              />
              <div>
                <h3 className="text-xl font-serif font-semibold">Chapel of Transformation</h3>
                <p className="text-sm opacity-80">FUOYE</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed opacity-90">
              {get("about", "description", "An interdenominational Christian body at Federal University Oye Ekiti, dedicated to the propagation of the kingdom and perfecting holiness in the fear of God.")}
            </p>
            <Badge variant="secondary" className="text-xs">Serving since 2012</Badge>
          </div>

          {/* Quick Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-serif font-semibold">Quick Info</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 opacity-80" />
                <div><p>{location}</p></div>
              </div>
              <div className="flex items-start space-x-2">
                <Clock className="h-4 w-4 mt-0.5 opacity-80" />
                <div><p>{serviceTime}</p></div>
              </div>
              <div className="flex items-start space-x-2">
                <Mail className="h-4 w-4 mt-0.5 opacity-80" />
                <div><p>{email}</p></div>
              </div>
            </div>
          </div>

          {/* Leadership */}
          <div className="space-y-4">
            <h4 className="text-lg font-serif font-semibold">Leadership</h4>
            <div className="space-y-3 text-sm">
              {leaders.length === 0 ? (
                <p className="opacity-70 text-xs">No leaders added yet</p>
              ) : (
                leaders.map((l, i) => (
                  <div key={i}>
                    <p className="font-medium">{l.name}</p>
                    <p className="opacity-80">{l.position}</p>
                  </div>
                ))
              )}
            </div>
            {socials.length > 0 && (
              <div className="pt-4">
                <h5 className="text-sm font-medium mb-3">Follow Us</h5>
                <div className="flex space-x-2 flex-wrap gap-y-2">
                  {socials.map((s) => {
                    const Icon = iconMap[s.platform] || ExternalLink;
                    return (
                      <Button
                        key={s.id}
                        variant="outline"
                        size="sm"
                        asChild
                        className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-divine"
                      >
                        <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.platform}>
                          <Icon className="h-4 w-4" />
                        </a>
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-sm opacity-80">
            © {new Date().getFullYear()} Chapel of Transformation, FUOYE.
            <span className="inline-flex items-center ml-2">Perfecting holiness in the fear of God</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
