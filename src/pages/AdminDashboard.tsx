import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Trash2, LogOut, Image, FileText, CalendarDays, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"gallery" | "materials" | "events">("gallery");
  const { toast } = useToast();
  const navigate = useNavigate();

  // Gallery state
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [galleryUploading, setGalleryUploading] = useState(false);

  // Materials state
  const [materials, setMaterials] = useState<any[]>([]);
  const [materialUploading, setMaterialUploading] = useState(false);
  const [materialCategory, setMaterialCategory] = useState<"academic" | "spiritual">("academic");

  // Events state
  const [events, setEvents] = useState<any[]>([]);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventSaving, setEventSaving] = useState(false);
  const [eventImageFile, setEventImageFile] = useState<File | null>(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (session) {
      fetchGallery();
      fetchMaterials();
      fetchEvents();
    }
  }, [session]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast({ title: "Login failed", description: error.message, variant: "destructive" });
    }
    setAuthLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  // Gallery
  const fetchGallery = async () => {
    const { data } = await supabase.from("gallery_images").select("*").order("created_at", { ascending: false });
    if (data) setGalleryImages(data);
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setGalleryUploading(true);
    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const { error: uploadError } = await supabase.storage.from("gallery").upload(fileName, file);
    if (uploadError) {
      toast({ title: "Upload failed", description: uploadError.message, variant: "destructive" });
      setGalleryUploading(false);
      return;
    }
    const { data: urlData } = supabase.storage.from("gallery").getPublicUrl(fileName);
    const title = file.name.replace(/\.[^/.]+$/, "").substring(0, 100);
    await supabase.from("gallery_images").insert({ title, image_url: urlData.publicUrl });
    toast({ title: "Image uploaded!" });
    fetchGallery();
    setGalleryUploading(false);
    e.target.value = "";
  };

  const deleteGalleryImage = async (id: string) => {
    await supabase.from("gallery_images").delete().eq("id", id);
    toast({ title: "Image deleted" });
    fetchGallery();
  };

  // Materials
  const fetchMaterials = async () => {
    const { data } = await supabase.from("materials").select("*").order("created_at", { ascending: false });
    if (data) setMaterials(data);
  };

  const handleMaterialUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMaterialUploading(true);
    const fileName = `${materialCategory}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const fileExt = file.name.split(".").pop()?.toLowerCase() || "";
    const { error: uploadError } = await supabase.storage.from("materials").upload(fileName, file);
    if (uploadError) {
      toast({ title: "Upload failed", description: uploadError.message, variant: "destructive" });
      setMaterialUploading(false);
      return;
    }
    const { data: urlData } = supabase.storage.from("materials").getPublicUrl(fileName);
    const title = file.name.replace(/\.[^/.]+$/, "").substring(0, 100);
    await supabase.from("materials").insert({ title, category: materialCategory, file_url: urlData.publicUrl, file_type: fileExt });
    toast({ title: "Material uploaded!" });
    fetchMaterials();
    setMaterialUploading(false);
    e.target.value = "";
  };

  const deleteMaterial = async (id: string) => {
    await supabase.from("materials").delete().eq("id", id);
    toast({ title: "Material deleted" });
    fetchMaterials();
  };

  // Events
  const fetchEvents = async () => {
    const { data } = await supabase.from("events").select("*").order("created_at", { ascending: false });
    if (data) setEvents(data);
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle.trim()) return;
    setEventSaving(true);

    let imageUrl: string | null = null;
    if (eventImageFile) {
      const fileName = `events/${Date.now()}-${eventImageFile.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      const { error: uploadError } = await supabase.storage.from("gallery").upload(fileName, eventImageFile);
      if (!uploadError) {
        const { data: urlData } = supabase.storage.from("gallery").getPublicUrl(fileName);
        imageUrl = urlData.publicUrl;
      }
    }

    await supabase.from("events").insert({
      title: eventTitle,
      description: eventDescription || null,
      event_date: eventDate || null,
      location: eventLocation || null,
      image_url: imageUrl,
    });

    toast({ title: "Event created!" });
    setEventTitle("");
    setEventDescription("");
    setEventDate("");
    setEventLocation("");
    setEventImageFile(null);
    fetchEvents();
    setEventSaving(false);
  };

  const deleteEvent = async (id: string) => {
    await supabase.from("events").delete().eq("id", id);
    toast({ title: "Event deleted" });
    fetchEvents();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <img src="/lovable-uploads/cot_logo.png" alt="COT Logo" className="h-16 w-16 mx-auto mb-2 object-contain" />
            <CardTitle className="font-serif text-primary">Admin Login</CardTitle>
            <p className="text-sm text-muted-foreground">Chapel of Transformation</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <Button type="submit" className="w-full" disabled={authLoading}>
                {authLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <img src="/lovable-uploads/cot_logo.png" alt="COT" className="h-8 w-8 object-contain" />
            <h1 className="font-serif font-bold text-primary text-lg">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>View Site</Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-1" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {([
            { key: "gallery" as const, label: "Gallery", icon: Image },
            { key: "materials" as const, label: "Materials", icon: FileText },
            { key: "events" as const, label: "Events", icon: CalendarDays },
          ]).map(({ key, label, icon: Icon }) => (
            <Button key={key} variant={activeTab === key ? "default" : "outline"} onClick={() => setActiveTab(key)} className="gap-2">
              <Icon className="h-4 w-4" /> {label}
            </Button>
          ))}
        </div>

        {/* Gallery Tab */}
        {activeTab === "gallery" && (
          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle className="text-base">Upload Gallery Photo</CardTitle></CardHeader>
              <CardContent>
                <label htmlFor="admin-gallery-upload">
                  <Button asChild variant="default" disabled={galleryUploading} className="cursor-pointer">
                    <span>
                      {galleryUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                      {galleryUploading ? "Uploading..." : "Upload Photo"}
                    </span>
                  </Button>
                </label>
                <input id="admin-gallery-upload" type="file" accept="image/*" className="hidden" onChange={handleGalleryUpload} disabled={galleryUploading} />
              </CardContent>
            </Card>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {galleryImages.map((img) => (
                <Card key={img.id} className="overflow-hidden">
                  <div className="aspect-square overflow-hidden">
                    <img src={img.image_url} alt={img.title} className="w-full h-full object-cover" />
                  </div>
                  <CardContent className="p-2 flex justify-between items-center">
                    <span className="text-xs truncate flex-1">{img.title}</span>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => deleteGalleryImage(img.id)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Materials Tab */}
        {activeTab === "materials" && (
          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle className="text-base">Upload Material</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <Button variant={materialCategory === "academic" ? "default" : "outline"} size="sm" onClick={() => setMaterialCategory("academic")}>Academic</Button>
                  <Button variant={materialCategory === "spiritual" ? "default" : "outline"} size="sm" onClick={() => setMaterialCategory("spiritual")}>Spiritual</Button>
                </div>
                <label htmlFor="admin-material-upload">
                  <Button asChild variant="default" disabled={materialUploading} className="cursor-pointer">
                    <span>
                      {materialUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                      {materialUploading ? "Uploading..." : `Upload ${materialCategory} material`}
                    </span>
                  </Button>
                </label>
                <input id="admin-material-upload" type="file" accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.epub" className="hidden" onChange={handleMaterialUpload} disabled={materialUploading} />
              </CardContent>
            </Card>
            <div className="space-y-2">
              {materials.map((mat) => (
                <Card key={mat.id}>
                  <CardContent className="p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                      <Badge variant="outline" className="text-xs">{mat.category}</Badge>
                      <span className="text-sm truncate">{mat.title}</span>
                      <Badge variant="secondary" className="text-xs">{mat.file_type}</Badge>
                    </div>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive flex-shrink-0" onClick={() => deleteMaterial(mat.id)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === "events" && (
          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle className="text-base">Create Event</CardTitle></CardHeader>
              <CardContent>
                <form onSubmit={handleCreateEvent} className="space-y-3">
                  <Input placeholder="Event title" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} required />
                  <Textarea placeholder="Description" value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input type="datetime-local" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
                    <Input placeholder="Location" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Event Image (optional)</label>
                    <Input type="file" accept="image/*" onChange={(e) => setEventImageFile(e.target.files?.[0] || null)} />
                  </div>
                  <Button type="submit" disabled={eventSaving}>
                    {eventSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    Create Event
                  </Button>
                </form>
              </CardContent>
            </Card>
            <div className="space-y-2">
              {events.map((event) => (
                <Card key={event.id}>
                  <CardContent className="p-3 flex items-center justify-between">
                    <div className="min-w-0">
                      <p className="font-semibold text-sm">{event.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {event.event_date ? new Date(event.event_date).toLocaleDateString() : "No date"} • {event.location || "No location"}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive flex-shrink-0" onClick={() => deleteEvent(event.id)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
