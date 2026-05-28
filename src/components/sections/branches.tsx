import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Phone } from "lucide-react";
import { useLiveTable } from "@/hooks/use-live-table";

const FALLBACK_BRANCHES = [
  { name: "COT FUOYE — Oye Ekiti (Main Campus)", location: "Phase One, Main Auditorium, Federal University Oye Ekiti", service_time: "Sunday: 8:00 AM - 11:30 AM", phone: "08082513103, 08118361206", is_main: true },
  { name: "COT FUOYE — Ikole Ekiti Campus", location: "Federal University Oye Ekiti, Ikole Campus", service_time: "Sunday Service", phone: "07041128142", is_main: false },
];

const Branches = () => {
  const { data } = useLiveTable<any>("branches", "display_order");
  const branches = data.length > 0 ? data : FALLBACK_BRANCHES;

  return (
    <section id="branches" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="relative rounded-2xl overflow-hidden mb-16">
          <img src="/lovable-uploads/ikole-campus.webp" alt="Chapel of Transformation Campus Building" className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
            <div className="p-6 md:p-10">
              <Badge variant="secondary" className="mb-3">Our Branches</Badge>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-white">Our Campuses</h2>
              <p className="text-white/80 text-sm md:text-lg mt-2 max-w-xl">
                Chapel of Transformation is present across FUOYE campuses, bringing transformation to every student.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {branches.map((branch, index) => (
            <Card key={branch.id || index} className={`border-0 shadow-gentle hover:shadow-divine transition-divine ${branch.is_main ? 'ring-2 ring-church-gold' : ''}`}>
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-2 mb-4">
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-primary">{branch.name}</h3>
                  {branch.is_main && <Badge variant="secondary" className="text-xs shrink-0">Main</Badge>}
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-church-gold shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">{branch.location}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-church-gold shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">{branch.service_time}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-church-gold shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">{branch.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Branches;
