import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Clock, Mail, Facebook, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Chapel Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/7441a481-89dd-40e5-a3f4-df2bed1faef9.png" 
                alt="Chapel of Transformation Logo" 
                className="h-12 w-12"
              />
              <div>
                <h3 className="text-xl font-serif font-semibold">
                  Chapel of Transformation
                </h3>
                <p className="text-sm opacity-80">FUOYE</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed opacity-90">
              An interdenominational Christian body at Federal University Oye Ekiti, 
              dedicated to the propagation of the kingdom and perfecting holiness in the fear of God.
            </p>
            <Badge variant="secondary" className="text-xs">
              Serving since 2012
            </Badge>
          </div>

          {/* Quick Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-serif font-semibold">Quick Info</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 opacity-80" />
                <div>
                  <p>Phase One, Main Auditorium</p>
                  <p className="opacity-80">Federal University Oye Ekiti</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Clock className="h-4 w-4 mt-0.5 opacity-80" />
                <div>
                  <p>Sunday Service</p>
                  <p className="opacity-80">8:00 AM - 11:30 AM</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Mail className="h-4 w-4 mt-0.5 opacity-80" />
                <div>
                  <p>info@cotfuoye.org</p>
                  <p className="opacity-80">Get in touch</p>
                </div>
              </div>
            </div>
          </div>

          {/* Leadership */}
          <div className="space-y-4">
            <h4 className="text-lg font-serif font-semibold">Leadership</h4>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium">Daddy Agu</p>
                <p className="opacity-80">Council</p>
              </div>
              <div>
                <p className="font-medium">Daddy Osamaka</p>
                <p className="opacity-80">Chaplain</p>
              </div>
            </div>
            <div className="pt-4">
              <h5 className="text-sm font-medium mb-3">Follow Us</h5>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  asChild
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-divine"
                >
                  <a href="https://www.facebook.com/cotfuoye/" target="_blank" rel="noopener noreferrer">
                    <Facebook className="h-4 w-4" />
                  </a>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  asChild
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-divine"
                >
                  <a href="https://www.instagram.com/cot.fuoye/" target="_blank" rel="noopener noreferrer">
                    <Instagram className="h-4 w-4" />
                  </a>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  asChild
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-divine"
                >
                  <a href="https://www.youtube.com/@chapeloftransformation" target="_blank" rel="noopener noreferrer">
                    <Youtube className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-sm opacity-80">
            © {new Date().getFullYear()} Chapel of Transformation, FUOYE. 
            <span className="inline-flex items-center ml-2">
              Perfecting holiness in the fear of God
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;