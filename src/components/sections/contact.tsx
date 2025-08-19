import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with your backend/Supabase
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. We'll get back to you soon.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Location",
      details: "Phase One, Main Auditorium",
      subtitle: "Federal University Oye Ekiti"
    },
    {
      icon: Clock,
      title: "Service Time",
      details: "Sunday 8:00 AM - 11:30 AM",
      subtitle: "All are welcome to join"
    },
    {
      icon: Mail,
      title: "Email",
      details: "info@cotfuoye.org",
      subtitle: "Get in touch with us"
    },
    {
      icon: Phone,
      title: "Phone",
      details: "08082513103, 08118361206",
      subtitle: "07041128142"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-church-light-blue">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Contact Us
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary mb-6">
            Get In Touch
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We'd love to hear from you. Reach out to us for prayer requests, questions, 
            or to learn more about joining our chapel family.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
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
                        <h4 className="text-lg font-serif font-semibold text-primary mb-1">
                          {info.title}
                        </h4>
                        <p className="text-foreground font-medium">
                          {info.details}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {info.subtitle}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Social Media Links */}
              <Card className="shadow-gentle border-0 bg-background">
                <CardContent className="p-6">
                  <h4 className="text-lg font-serif font-semibold text-primary mb-4">
                    Follow Us
                  </h4>
                  <div className="flex space-x-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      asChild
                      className="hover:bg-primary hover:text-primary-foreground transition-divine"
                    >
                      <a href="https://www.facebook.com/cotfuoye/" target="_blank" rel="noopener noreferrer">
                        <Facebook className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      asChild
                      className="hover:bg-primary hover:text-primary-foreground transition-divine"
                    >
                      <a href="https://www.instagram.com/cot.fuoye/" target="_blank" rel="noopener noreferrer">
                        <Instagram className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      asChild
                      className="hover:bg-primary hover:text-primary-foreground transition-divine"
                    >
                      <a href="https://www.youtube.com/@chapeloftransformation" target="_blank" rel="noopener noreferrer">
                        <Youtube className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-divine border-0 bg-background">
              <CardContent className="p-8">
                <h3 className="text-2xl font-serif font-semibold text-primary mb-6">
                  Send Us a Message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Full Name
                      </label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="transition-divine"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="transition-divine"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="How can we help you? Share your prayer requests, questions, or thoughts..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      className="transition-divine"
                    />
                  </div>
                  <Button 
                    type="button"
                    size="lg" 
                    asChild
                    className="w-full shadow-gentle hover:shadow-divine transition-divine"
                  >
                    <a href="https://wa.me/2348118361206" target="_blank" rel="noopener noreferrer">
                      Send Message via WhatsApp
                    </a>
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