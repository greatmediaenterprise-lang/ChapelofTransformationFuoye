import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Youtube, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const iconMap: Record<string, any> = {
  Facebook,
  YouTube: Youtube,
  Instagram,
  Linktree: ExternalLink,
};

const colorMap: Record<string, string> = {
  Facebook: "bg-[#1877F2]",
  YouTube: "bg-[#FF0000]",
  Instagram: "bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]",
  Linktree: "bg-[#43E660]",
};

const SocialChannels = () => {
  const [channels, setChannels] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("social_links").select("*").order("display_order").then(({ data }) => {
      if (data && data.length > 0) setChannels(data);
      else setChannels([
        { platform: "Facebook", url: "https://www.facebook.com/cotfuoye/", description: "Follow us for updates." },
        { platform: "YouTube", url: "https://www.youtube.com/@chapeloftransformation", description: "Watch sermons." },
        { platform: "Instagram", url: "https://www.instagram.com/cot.fuoye/", description: "See our highlights." },
        { platform: "Linktree", url: "https://linktr.ee/cotfuoye", description: "All our links in one place." },
      ]);
    });
  }, []);

  return (
    <section id="socials" className="py-20 bg-church-light-blue">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Connect</Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary mb-6">Stay Connected</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Join our online community. Follow us on social media for updates, sermons, and fellowship.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {channels.map((channel) => {
            const Icon = iconMap[channel.platform] || ExternalLink;
            const color = colorMap[channel.platform] || "bg-primary";
            return (
              <Card key={channel.id || channel.platform} className="border-0 shadow-gentle hover:shadow-divine transition-divine group">
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${color} text-white rounded-full mb-4 group-hover:scale-110 transition-divine`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-primary mb-2">{channel.platform}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{channel.description}</p>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <a href={channel.url} target="_blank" rel="noopener noreferrer">Follow on {channel.platform}</a>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SocialChannels;
