import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Camera, X } from "lucide-react";
import { useState } from "react";
import { useLiveTable } from "@/hooks/use-live-table";
import ChapelLoader from "@/components/ui/chapel-loader";

interface GalleryImage {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  created_at: string;
}

const Gallery = () => {
  const { data: images, loading } = useLiveTable<GalleryImage>("gallery_images", "created_at", false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Gallery</Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary mb-6">
            Our Gallery
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            See moments of worship, fellowship, and transformation at Chapel of Transformation.
          </p>
        </div>

        {loading ? (
          <ChapelLoader label="Loading photos" />
        ) : images.length === 0 ? (
          <div className="text-center py-16">
            <Camera className="h-16 w-16 mx-auto text-muted-foreground/40 mb-4" />
            <p className="text-muted-foreground text-lg">Photos coming soon!</p>
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
