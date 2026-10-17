import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import ChapelLoader from "@/components/ui/chapel-loader";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [loadingSection, setLoadingSection] = useState<string | null>(null);
  const navigationTimer = useRef<number | undefined>(undefined);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Leadership", href: "#leadership" },
    { name: "Services", href: "#services" },
    { name: "Gallery", href: "#gallery" },
    { name: "Resources", href: "#resources" },
    { name: "Branches", href: "#branches" },
    { name: "Events", href: "#events" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((section): section is HTMLElement => section !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visibleSection) setActiveSection(visibleSection.target.id);
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => () => {
    if (navigationTimer.current !== undefined) window.clearTimeout(navigationTimer.current);
  }, []);

  const navigateToSection = (name: string, href: string) => {
    setActiveSection(href.slice(1));
    setLoadingSection(name);
    if (navigationTimer.current !== undefined) window.clearTimeout(navigationTimer.current);
    navigationTimer.current = window.setTimeout(() => {
      setLoadingSection(null);
      navigationTimer.current = undefined;
    }, 900);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/cot_logo.png" 
              alt="Chapel of Transformation Logo" 
              className="h-14 w-14 object-contain"
            />
            <div className="hidden sm:block">
              <h1 className="text-lg font-serif font-semibold text-primary">
                Chapel of Transformation
              </h1>
              <p className="text-xs text-muted-foreground">FUOYE</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-5">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                aria-current={activeSection === item.href.slice(1) ? "location" : undefined}
                onClick={() => navigateToSection(item.name, item.href)}
                className={cn(
                  "border-b-2 py-2 text-xs font-medium transition-divine",
                  activeSection === item.href.slice(1)
                    ? "border-secondary text-primary"
                    : "border-transparent text-foreground hover:text-primary",
                )}
              >
                {item.name}
              </a>
            ))}
            <Button variant="default" size="sm" className="ml-2" asChild>
              <a href="https://linktr.ee/cotfuoye" target="_blank" rel="noopener noreferrer">
                Join Us
              </a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {loadingSection && (
          <div className="pointer-events-none fixed left-1/2 top-[4.5rem] z-[60] -translate-x-1/2" aria-live="polite">
            <div className="rounded-full border border-border bg-background px-4 py-2 shadow-gentle">
              <ChapelLoader label={`Opening ${loadingSection}`} className="py-0 text-sm" />
            </div>
          </div>
        )}

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t max-h-[70vh] overflow-y-auto">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  aria-current={activeSection === item.href.slice(1) ? "location" : undefined}
                  className={cn(
                    "block border-l-2 px-3 py-2 text-base font-medium transition-divine",
                    activeSection === item.href.slice(1)
                      ? "border-secondary bg-muted text-primary"
                      : "border-transparent text-foreground hover:bg-muted hover:text-primary",
                  )}
                  onClick={() => {
                    navigateToSection(item.name, item.href);
                    setIsMenuOpen(false);
                  }}
                >
                  {item.name}
                </a>
              ))}
              <div className="px-3 pt-2">
                <Button variant="default" size="sm" className="w-full" asChild>
                  <a href="https://linktr.ee/cotfuoye" target="_blank" rel="noopener noreferrer">
                    Join Us
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;