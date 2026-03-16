import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Camera, Upload, X, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface GalleryImage {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  created_at: string;
}

const Gallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setImages(data);
    setLoading(false);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type and size
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      toast({ title: "Invalid file type", description: "Please upload JPG, PNG, WebP, or GIF images only.", variant: "destructive" });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "File too large", description: "Maximum file size is 5MB.", variant: "destructive" });
      return;
    }

    setUploading(true);
    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

    const { error: uploadError } = await supabase.storage
      .from("gallery")
      .upload(fileName, file);

    if (uploadError) {
      toast({ title: "Upload failed", description: "Please sign in to upload images.", variant: "destructive" });
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from("gallery").getPublicUrl(fileName);

    const title = file.name.replace(/\.[^/.]+$/, "").substring(0, 100);
    await supabase.from("gallery_images").insert({
      title,
      image_url: urlData.publicUrl,
    });

    toast({ title: "Image uploaded!", description: "Your photo has been added to the gallery." });
    fetchImages();
    setUploading(false);
  };

  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Gallery
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary mb-6">
            Our Gallery
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            See moments of worship, fellowship, and transformation at Chapel of Transformation.
          </p>
        </div>

        {/* Upload Button */}
        <div className="text-center mb-8">
          <label htmlFor="gallery-upload">
            <Button asChild variant="default" disabled={uploading} className="cursor-pointer">
              <span>
                {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                {uploading ? "Uploading..." : "Upload Photo"}
              </span>
            </Button>
          </label>
          <input
            id="gallery-upload"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
          />
          <p className="text-xs text-muted-foreground mt-2">Sign in to upload photos (max 5MB)</p>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="text-center py-12">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-16">
            <Camera className="h-16 w-16 mx-auto text-muted-foreground/40 mb-4" />
            <p className="text-muted-foreground text-lg">No photos yet. Be the first to share!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {images.map((img) => (
              <Card
                key={img.id}
                className="group cursor-pointer overflow-hidden border-0 shadow-gentle hover:shadow-divine transition-divine"
                onClick={() => setSelectedImage(img)}
              >
                <CardContent className="p-0">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={img.image_url}
                      alt={img.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-divine"
                      loading="lazy"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-6 w-6" />
            </Button>
            <img
              src={selectedImage.image_url}
              alt={selectedImage.title}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
