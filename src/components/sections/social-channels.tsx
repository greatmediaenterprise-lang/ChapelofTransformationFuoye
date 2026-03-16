import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Youtube, ExternalLink } from "lucide-react";

const SocialChannels = () => {
  const channels = [
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://www.facebook.com/cotfuoye/",
      description: "Follow us for updates, live services, and community posts.",
      color: "bg-[#1877F2]",
      buttonText: "Follow on Facebook",
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: "https://www.youtube.com/@chapeloftransformation",
      description: "Watch sermons, worship sessions, and special programs.",
      color: "bg-[#FF0000]",
      buttonText: "Subscribe on YouTube",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/cot.fuoye/",
      description: "See our highlights, stories, and behind-the-scenes moments.",
      color: "bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]",
      buttonText: "Follow on Instagram",
    },
    {
      name: "Linktree",
      icon: ExternalLink,
      url: "https://linktr.ee/cotfuoye",
      description: "Access all our links and resources in one place.",
      color: "bg-[#43E660]",
      buttonText: "Visit Linktree",
    },
  ];

  return (
    <section id="socials" className="py-20 bg-church-light-blue">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Connect
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary mb-6">
            Stay Connected
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Join our online community. Follow us on social media for updates, sermons, and fellowship.
          </p>
        </div>

        {/* Social Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {channels.map((channel) => (
            <Card key={channel.name} className="border-0 shadow-gentle hover:shadow-divine transition-divine group">
              <CardContent className="p-6 text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 ${channel.color} text-white rounded-full mb-4 group-hover:scale-110 transition-divine`}>
                  <channel.icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-serif font-semibold text-primary mb-2">
                  {channel.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {channel.description}
                </p>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <a href={channel.url} target="_blank" rel="noopener noreferrer">
                    {channel.buttonText}
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialChannels;
