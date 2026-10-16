import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Trash2, LogOut, Image, FileText, CalendarDays, Upload, Users, MapPin, Clock, Link, Settings, Pencil, Plus, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ChapelLoader from "@/components/ui/chapel-loader";

type TabKey = "site" | "leadership" | "services" | "gallery" | "materials" | "branches" | "socials" | "events" | "contact";

const AdminDashboard = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("site");
  const { toast } = useToast();
  const navigate = useNavigate();

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) toast({ title: "Login failed", description: error.message, variant: "destructive" });
    setAuthLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <ChapelLoader label="Preparing the dashboard" />
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
                {authLoading ? <ChapelLoader compact label="" className="mr-2" /> : null}Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  const tabs: { key: TabKey; label: string; icon: any }[] = [
    { key: "site", label: "Site Text", icon: Settings },
    { key: "leadership", label: "Leadership", icon: Users },
    { key: "services", label: "Services", icon: Clock },
    { key: "gallery", label: "Gallery", icon: Image },
    { key: "materials", label: "Materials", icon: FileText },
    { key: "branches", label: "Branches", icon: MapPin },
    { key: "socials", label: "Socials", icon: Link },
    { key: "events", label: "Events", icon: CalendarDays },
    { key: "contact", label: "Contact", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-background border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <img src="/lovable-uploads/cot_logo.png" alt="COT" className="h-8 w-8 object-contain" />
            <h1 className="font-serif font-bold text-primary text-lg">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild><a href="/" target="_blank" rel="noopener noreferrer">View Site</a></Button>
            <Button variant="outline" size="sm" onClick={handleLogout}><LogOut className="h-4 w-4 mr-1" /> Logout</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map(({ key, label, icon: Icon }) => (
            <Button key={key} variant={activeTab === key ? "default" : "outline"} size="sm" onClick={() => setActiveTab(key)} className="gap-1.5">
              <Icon className="h-3.5 w-3.5" /> {label}
            </Button>
          ))}
        </div>

        {activeTab === "site" && <SiteTextTab />}
        {activeTab === "leadership" && <LeadershipTab />}
        {activeTab === "services" && <ServiceTimesTab />}
        {activeTab === "gallery" && <GalleryTab />}
        {activeTab === "materials" && <MaterialsTab />}
        {activeTab === "branches" && <BranchesTab />}
        {activeTab === "socials" && <SocialsTab />}
        {activeTab === "events" && <EventsTab />}
        {activeTab === "contact" && <ContactTab />}
      </div>
    </div>
  );
};

// ========== SITE TEXT TAB ==========
const SiteTextTab = () => {
  const [items, setItems] = useState<any[]>([]);
  const [saving, setSaving] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => { fetchItems(); }, []);
  const fetchItems = async () => {
    const { data } = await supabase.from("site_content").select("*").order("section");
    if (data) setItems(data);
  };

  const updateItem = async (id: string, value: string) => {
    setSaving(id);
    await supabase.from("site_content").update({ value, updated_at: new Date().toISOString() }).eq("id", id);
    toast({ title: "Saved!" });
    setSaving(null);
  };

  const grouped = items.reduce<Record<string, any[]>>((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">Edit the text content across all sections of your website.</p>
      {Object.entries(grouped).map(([section, sectionItems]) => (
        <Card key={section}>
          <CardHeader><CardTitle className="text-base capitalize">{section} Section</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {sectionItems.map((item: any) => (
              <div key={item.id}>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">{item.key.replace(/_/g, " ")}</label>
                <div className="flex gap-2">
                  <Textarea
                    defaultValue={item.value}
                    id={`content-${item.id}`}
                    rows={item.value.length > 100 ? 3 : 1}
                    className="flex-1"
                  />
                  <Button
                    size="sm"
                    disabled={saving === item.id}
                    onClick={() => {
                      const el = document.getElementById(`content-${item.id}`) as HTMLTextAreaElement;
                      updateItem(item.id, el.value);
                    }}
                  >
                    {saving === item.id ? <ChapelLoader compact label="" /> : <Save className="h-3.5 w-3.5" />}
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// ========== LEADERSHIP TAB ==========
const LeadershipTab = () => {
  const [leaders, setLeaders] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => { fetchLeaders(); }, []);
  const fetchLeaders = async () => {
    const { data } = await supabase.from("leaders").select("*").order("display_order");
    if (data) setLeaders(data);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    let imageUrl: string | null = null;
    if (imageFile) {
      const fileName = `leaders/${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      const { error } = await supabase.storage.from("gallery").upload(fileName, imageFile);
      if (!error) {
        const { data: urlData } = supabase.storage.from("gallery").getPublicUrl(fileName);
        imageUrl = urlData.publicUrl;
      }
    }
    await supabase.from("leaders").insert({ name, position, description, image_url: imageUrl, display_order: leaders.length + 1 });
    toast({ title: "Leader added!" });
    setName(""); setPosition(""); setDescription(""); setImageFile(null);
    fetchLeaders();
    setSaving(false);
  };

  const deleteLeader = async (id: string) => {
    await supabase.from("leaders").delete().eq("id", id);
    toast({ title: "Leader removed" });
    fetchLeaders();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle className="text-base">Add Leader</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleAdd} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
              <Input placeholder="Position (e.g. Chaplain)" value={position} onChange={(e) => setPosition(e.target.value)} required />
            </div>
            <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <div>
              <label className="text-sm text-muted-foreground">Photo</label>
              <Input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
            </div>
            <Button type="submit" disabled={saving}>
              {saving ? <ChapelLoader compact label="" className="mr-2" /> : <Plus className="h-4 w-4 mr-2" />}Add Leader
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {leaders.map((l) => (
          <Card key={l.id}>
            <CardContent className="p-4">
              <div className="flex gap-4">
                {l.image_url && <img src={l.image_url} alt={l.name} className="w-20 h-20 rounded-lg object-cover" />}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold">{l.name}</p>
                  <Badge variant="outline" className="text-xs">{l.position}</Badge>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{l.description}</p>
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive shrink-0" onClick={() => deleteLeader(l.id)}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ========== SERVICE TIMES TAB ==========
const ServiceTimesTab = () => {
  const [services, setServices] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [desc, setDesc] = useState("");
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => { fetchServices(); }, []);
  const fetchServices = async () => {
    const { data } = await supabase.from("service_times").select("*").order("display_order");
    if (data) setServices(data);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await supabase.from("service_times").insert({ title, day, time, description: desc, display_order: services.length + 1 });
    toast({ title: "Service time added!" });
    setTitle(""); setDay(""); setTime(""); setDesc("");
    fetchServices();
    setSaving(false);
  };

  const deleteService = async (id: string) => {
    await supabase.from("service_times").delete().eq("id", id);
    toast({ title: "Service time removed" });
    fetchServices();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle className="text-base">Add Service Time</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleAdd} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Input placeholder="Title (e.g. Sunday Service)" value={title} onChange={(e) => setTitle(e.target.value)} required />
              <Input placeholder="Day (e.g. Every Sunday)" value={day} onChange={(e) => setDay(e.target.value)} required />
              <Input placeholder="Time (e.g. 8:00 AM)" value={time} onChange={(e) => setTime(e.target.value)} required />
            </div>
            <Input placeholder="Description (optional)" value={desc} onChange={(e) => setDesc(e.target.value)} />
            <Button type="submit" disabled={saving}>
              {saving ? <ChapelLoader compact label="" className="mr-2" /> : <Plus className="h-4 w-4 mr-2" />}Add
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className="space-y-2">
        {services.map((s) => (
          <Card key={s.id}>
            <CardContent className="p-3 flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm">{s.title}</p>
                <p className="text-xs text-muted-foreground">{s.day} • {s.time}</p>
              </div>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => deleteService(s.id)}>
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ========== GALLERY TAB ==========
const GalleryTab = () => {
  const [images, setImages] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  useEffect(() => { fetchImages(); }, []);
  const fetchImages = async () => {
    const { data } = await supabase.from("gallery_images").select("*").order("created_at", { ascending: false });
    if (data) setImages(data);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setUploading(true);
    let successCount = 0;
    let failCount = 0;
    const errors: string[] = [];

    for (const file of files) {
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      const { error: upErr } = await supabase.storage.from("gallery").upload(fileName, file);
      if (upErr) { failCount++; errors.push(`${file.name}: ${upErr.message}`); continue; }
      const { data: urlData } = supabase.storage.from("gallery").getPublicUrl(fileName);
      const { error: insErr } = await supabase.from("gallery_images").insert({
        title: file.name.replace(/\.[^/.]+$/, "").substring(0, 100),
        image_url: urlData.publicUrl,
      });
      if (insErr) { failCount++; errors.push(`${file.name}: ${insErr.message}`); continue; }
      successCount++;
    }

    if (successCount > 0) toast({ title: `${successCount} image${successCount > 1 ? "s" : ""} uploaded!` });
    if (failCount > 0) toast({ title: `${failCount} failed`, description: errors.join("; ").slice(0, 300), variant: "destructive" });
    await fetchImages();
    setUploading(false);
    e.target.value = "";
  };

  const deleteImage = async (id: string) => {
    await supabase.from("gallery_images").delete().eq("id", id);
    toast({ title: "Image deleted" });
    fetchImages();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle className="text-base">Upload Gallery Photos</CardTitle></CardHeader>
        <CardContent>
          <label htmlFor="admin-gallery-upload">
            <Button asChild variant="default" disabled={uploading} className="cursor-pointer">
              <span>{uploading ? <ChapelLoader compact label="" className="mr-2" /> : <Upload className="mr-2 h-4 w-4" />}{uploading ? "Uploading..." : "Upload Photos (select multiple)"}</span>
            </Button>
          </label>
          <input id="admin-gallery-upload" type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} disabled={uploading} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {images.map((img) => (
          <Card key={img.id} className="overflow-hidden">
            <div className="aspect-square overflow-hidden"><img src={img.image_url} alt={img.title} className="w-full h-full object-cover" /></div>
            <CardContent className="p-2 flex justify-between items-center">
              <span className="text-xs truncate flex-1">{img.title}</span>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => deleteImage(img.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ========== MATERIALS TAB ==========
const MaterialsTab = () => {
  const [materials, setMaterials] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [category, setCategory] = useState<"academic" | "spiritual">("academic");
  const { toast } = useToast();

  useEffect(() => { fetchMaterials(); }, []);
  const fetchMaterials = async () => {
    const { data } = await supabase.from("materials").select("*").order("created_at", { ascending: false });
    if (data) setMaterials(data);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fileName = `${category}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    const { error } = await supabase.storage.from("materials").upload(fileName, file);
    if (error) { toast({ title: "Upload failed", description: error.message, variant: "destructive" }); setUploading(false); return; }
    const { data: urlData } = supabase.storage.from("materials").getPublicUrl(fileName);
    await supabase.from("materials").insert({ title: file.name.replace(/\.[^/.]+$/, "").substring(0, 100), category, file_url: urlData.publicUrl, file_type: ext });
    toast({ title: "Material uploaded!" });
    fetchMaterials();
    setUploading(false);
    e.target.value = "";
  };

  const deleteMaterial = async (id: string) => {
    await supabase.from("materials").delete().eq("id", id);
    toast({ title: "Material deleted" });
    fetchMaterials();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle className="text-base">Upload Material</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Button variant={category === "academic" ? "default" : "outline"} size="sm" onClick={() => setCategory("academic")}>Academic</Button>
            <Button variant={category === "spiritual" ? "default" : "outline"} size="sm" onClick={() => setCategory("spiritual")}>Spiritual</Button>
          </div>
          <label htmlFor="admin-material-upload">
            <Button asChild variant="default" disabled={uploading} className="cursor-pointer">
              <span>{uploading ? <ChapelLoader compact label="" className="mr-2" /> : <Upload className="mr-2 h-4 w-4" />}{uploading ? "Uploading..." : `Upload ${category} material`}</span>
            </Button>
          </label>
          <input id="admin-material-upload" type="file" accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.epub" className="hidden" onChange={handleUpload} disabled={uploading} />
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
              <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive shrink-0" onClick={() => deleteMaterial(mat.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ========== BRANCHES TAB ==========
const BranchesTab = () => {
  const [branches, setBranches] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [serviceTime, setServiceTime] = useState("");
  const [phone, setPhone] = useState("");
  const [isMain, setIsMain] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => { fetchBranches(); }, []);
  const fetchBranches = async () => {
    const { data } = await supabase.from("branches").select("*").order("display_order");
    if (data) setBranches(data);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await supabase.from("branches").insert({ name, location, service_time: serviceTime, phone, is_main: isMain, display_order: branches.length + 1 });
    toast({ title: "Branch added!" });
    setName(""); setLocation(""); setServiceTime(""); setPhone(""); setIsMain(false);
    fetchBranches();
    setSaving(false);
  };

  const deleteBranch = async (id: string) => {
    await supabase.from("branches").delete().eq("id", id);
    toast({ title: "Branch removed" });
    fetchBranches();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle className="text-base">Add Branch</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleAdd} className="space-y-3">
            <Input placeholder="Branch name" value={name} onChange={(e) => setName(e.target.value)} required />
            <Input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input placeholder="Service time" value={serviceTime} onChange={(e) => setServiceTime(e.target.value)} />
              <Input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={isMain} onChange={(e) => setIsMain(e.target.checked)} /> Main campus
            </label>
            <Button type="submit" disabled={saving}>
              {saving ? <ChapelLoader compact label="" className="mr-2" /> : <Plus className="h-4 w-4 mr-2" />}Add Branch
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className="space-y-2">
        {branches.map((b) => (
          <Card key={b.id}>
            <CardContent className="p-3 flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm">{b.name} {b.is_main && <Badge variant="secondary" className="text-xs ml-2">Main</Badge>}</p>
                <p className="text-xs text-muted-foreground">{b.location} • {b.service_time}</p>
              </div>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => deleteBranch(b.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ========== SOCIALS TAB ==========
const SocialsTab = () => {
  const [links, setLinks] = useState<any[]>([]);
  const [platform, setPlatform] = useState("");
  const [url, setUrl] = useState("");
  const [desc, setDesc] = useState("");
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => { fetchLinks(); }, []);
  const fetchLinks = async () => {
    const { data } = await supabase.from("social_links").select("*").order("display_order");
    if (data) setLinks(data);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await supabase.from("social_links").insert({ platform, url, description: desc, display_order: links.length + 1 });
    toast({ title: "Social link added!" });
    setPlatform(""); setUrl(""); setDesc("");
    fetchLinks();
    setSaving(false);
  };

  const deleteLink = async (id: string) => {
    await supabase.from("social_links").delete().eq("id", id);
    toast({ title: "Link removed" });
    fetchLinks();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle className="text-base">Add Social Link</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleAdd} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input placeholder="Platform (e.g. Facebook)" value={platform} onChange={(e) => setPlatform(e.target.value)} required />
              <Input placeholder="URL" value={url} onChange={(e) => setUrl(e.target.value)} required />
            </div>
            <Input placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
            <Button type="submit" disabled={saving}>
              {saving ? <ChapelLoader compact label="" className="mr-2" /> : <Plus className="h-4 w-4 mr-2" />}Add Link
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className="space-y-2">
        {links.map((l) => (
          <Card key={l.id}>
            <CardContent className="p-3 flex items-center justify-between">
              <div className="min-w-0">
                <p className="font-semibold text-sm">{l.platform}</p>
                <p className="text-xs text-muted-foreground truncate">{l.url}</p>
              </div>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive shrink-0" onClick={() => deleteLink(l.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ========== EVENTS TAB ==========
const EventsTab = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => { fetchEvents(); }, []);
  const fetchEvents = async () => {
    const { data } = await supabase.from("events").select("*").order("created_at", { ascending: false });
    if (data) setEvents(data);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    let imageUrl: string | null = null;
    if (imageFile) {
      const fileName = `events/${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      const { error } = await supabase.storage.from("gallery").upload(fileName, imageFile);
      if (!error) {
        const { data: urlData } = supabase.storage.from("gallery").getPublicUrl(fileName);
        imageUrl = urlData.publicUrl;
      }
    }
    await supabase.from("events").insert({ title, description: description || null, event_date: date || null, location: location || null, image_url: imageUrl });
    toast({ title: "Event created!" });
    setTitle(""); setDescription(""); setDate(""); setLocation(""); setImageFile(null);
    fetchEvents();
    setSaving(false);
  };

  const deleteEvent = async (id: string) => {
    await supabase.from("events").delete().eq("id", id);
    toast({ title: "Event deleted" });
    fetchEvents();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle className="text-base">Create Event</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleCreate} className="space-y-3">
            <Input placeholder="Event title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
              <Input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Event Image (optional)</label>
              <Input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
            </div>
            <Button type="submit" disabled={saving}>
              {saving ? <ChapelLoader compact label="" className="mr-2" /> : <Plus className="h-4 w-4 mr-2" />}Create Event
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
                <p className="text-xs text-muted-foreground">{event.event_date ? new Date(event.event_date).toLocaleDateString() : "No date"} • {event.location || "No location"}</p>
              </div>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive shrink-0" onClick={() => deleteEvent(event.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ========== CONTACT TAB ==========
const ContactTab = () => {
  return <SiteTextTab />;
};

export default AdminDashboard;
