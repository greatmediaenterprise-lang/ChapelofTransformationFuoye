import Navigation from "@/components/ui/navigation";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Leadership from "@/components/sections/leadership";
import Services from "@/components/sections/services";
import Gallery from "@/components/sections/gallery";
import Resources from "@/components/sections/resources";
import Branches from "@/components/sections/branches";
import SocialChannels from "@/components/sections/social-channels";
import Contact from "@/components/sections/contact";
import Footer from "@/components/sections/footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Leadership />
        <Services />
        <Gallery />
        <Resources />
        <Branches />
        <SocialChannels />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
