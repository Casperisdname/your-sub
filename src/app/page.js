import About from "@/component/landingpage/About";
import FloatingContact from "@/component/landingpage/FloatingContact";
import Footer from "@/component/landingpage/Footer";
import Hero from "@/component/landingpage/Hero";
import Navbar from "@/component/landingpage/Navbar";
import Partner from "@/component/landingpage/Partner";
import Services from "@/component/landingpage/Services";
import Started from "@/component/landingpage/Started";
import Stay from "@/component/landingpage/Stay";
import Why from "@/component/landingpage/Why";


export default function Home() {
  return (
    <div>
      <div className="bg-blue-50">
        <Navbar />
      
        <Hero />
      </div>
      <About />
      <Why />
      <Services />
      <Partner />

      
      <Stay />
      <Started />
      <Footer />
      <FloatingContact />
    </div>
  );
}
