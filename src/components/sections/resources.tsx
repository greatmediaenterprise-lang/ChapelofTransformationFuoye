import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Cross, Download, FileText, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Material {
  id: string;
  title: string;
  description: string | null;
  category: string;
  file_url: string;
  file_type: string | null;
  created_at: string;
}

const Resources = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"academic" | "spiritual">("academic");

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    const { data, error } = await supabase
      .from("materials")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setMaterials(data);
    setLoading(false);
  };

  const filtered = materials.filter((m) => m.category === activeTab);

  return (
    <section id="resources" className="py-20 blessing-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Resources</Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary mb-6">
            Materials & Resources
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Access academic and spiritual materials to support your growth and studies.
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <Button
            variant={activeTab === "academic" ? "default" : "outline"}
            onClick={() => setActiveTab("academic")}
            className="gap-2"
          >
            <BookOpen className="h-4 w-4" />
            Academic Materials
          </Button>
          <Button
            variant={activeTab === "spiritual" ? "default" : "outline"}
            onClick={() => setActiveTab("spiritual")}
            className="gap-2"
          >
            <Cross className="h-4 w-4" />
            Spiritual Materials
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <FileText className="h-16 w-16 mx-auto text-muted-foreground/40 mb-4" />
            <p className="text-muted-foreground text-lg">
              No {activeTab} materials yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((mat) => (
              <Card key={mat.id} className="border-0 shadow-gentle hover:shadow-divine transition-divine">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif font-semibold text-primary truncate">{mat.title}</h4>
                      {mat.description && (
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{mat.description}</p>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs uppercase">{mat.file_type || "file"}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(mat.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" asChild>
                      <a href={mat.file_url} target="_blank" rel="noopener noreferrer" title="Download">
                        <Download className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Resources;
