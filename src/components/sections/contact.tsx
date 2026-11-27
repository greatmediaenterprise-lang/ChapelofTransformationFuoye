import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube, ExternalLink, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSiteContent } from "@/hooks/use-site-content";
import { useLiveTable } from "@/hooks/use-live-table";
import { supabase } from "@/integrations/supabase/client";

const socialIconMap: Record<string, any> = { Facebook, Instagram, YouTube: Youtube, Linktree: ExternalLink };

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const { get } = useSiteContent();
  const { data: serviceTimes } = useLiveTable<any>("service_times", "display_order");
  const { data: socials } = useLiveTable<any>("social_links", "display_order");
  const firstService = serviceTimes[0] || null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("contact-messages", {
        body: { action: "submit", ...formData },
      });
      if (error) {
        toast({ title: "Message could not be sent", description: "Please try again in a moment.", variant: "destructive" });
        return;
      }
      toast({ title: "Message received", description: "Thank you. The church team will review your message." });
      setFormData({ name: "", email: "", message: "" });
    } catch {
      toast({ title: "Message could not be sent", description: "Please try again in a moment.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: MapPin, title: "Location", details: get("contact", "location", "Phase One, Main Auditorium"), subtitle: get("contact", "location_subtitle", "Federal University Oye Ekiti") },
    { icon: Clock, title: "Service Time", details: firstService ? `${firstService.day} ${firstService.time}` : "Sunday 8:00 AM - 11:30 AM", subtitle: firstService?.description || "All are welcome to join" },
    { icon: Mail, title: "Email", details: get("contact", "email", "greatenterprise05@gmail.com"), subtitle: "Get in touch with us" },
    { icon: Phone, title: "Phone", details: get("contact", "phone", "08082513103, 08118361206"), subtitle: get("contact", "phone_2", "07041128142") },
  ];

  return (
    <section id="contact" className="py-20 bg-church-light-blue">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Contact Us</Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary mb-6">Get In Touch</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We'd love to hear from you. Reach out to us for prayer requests, questions, or to learn more about joining our chapel family.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="shadow-gentle border-0 bg-background">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-lg">
                          <info.icon className="h-6 w-6" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-serif font-semibold text-primary mb-1">{info.title}</h4>
                        {info.title === "Email" ? (
                          <a href={`mailto:${info.details}`} className="text-foreground font-medium hover:underline">{info.details}</a>
                        ) : (
                          <p className="text-foreground font-medium">{info.details}</p>
                        )}
                        <p className="text-sm text-muted-foreground">{info.subtitle}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card className="shadow-gentle border-0 bg-background">
                <CardContent className="p-6">
                  <h4 className="text-lg font-serif font-semibold text-primary mb-4">Follow Us</h4>
                  <div className="flex flex-wrap gap-2">
                    {socials.map((s) => {
                      const Icon = socialIconMap[s.platform] || ExternalLink;
                      return (
                        <Button key={s.id} variant="outline" size="sm" asChild className="hover:bg-primary hover:text-primary-foreground transition-divine">
                          <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.platform}><Icon className="h-4 w-4" /></a>
                        </Button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="lg:col-span-2">
            <Card className="shadow-divine border-0 bg-background">
              <CardContent className="p-8">
                <h3 className="text-2xl font-serif font-semibold text-primary mb-6">Send Us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                      <Input id="name" type="text" placeholder="Your full name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="transition-divine" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                      <Input id="email" type="email" placeholder="your.email@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="transition-divine" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">Message</label>
                    <Textarea id="message" placeholder="How can we help you?" rows={6} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required className="transition-divine" />
                  </div>
                  <Button type="submit" size="lg" disabled={submitting} className="w-full shadow-gentle hover:shadow-divine transition-divine">
                    <Send className="mr-2 h-4 w-4" />{submitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
