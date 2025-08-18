import Navigation from "@/components/ui/navigation";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Leadership from "@/components/sections/leadership";
import Services from "@/components/sections/services";
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
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
