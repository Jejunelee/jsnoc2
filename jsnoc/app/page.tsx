import Header from "@/app/components/Header";
import Hero from "@/app/components/Hero";
import AboutUs from "@/app/components/AboutUs";
import Offerings from "@/app/components/Offerings"; 
import Footer from "@/app/components/Footer";
import Contact from "@/app/components/Contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <div id="home">
        <Hero />
      </div>
      <div id="about">
        <AboutUs />
      </div>
      <div id="services">
        <Offerings />
      </div>
      <div id="contact">
        <Contact />
      </div>
      <Footer />
    </div>
  );
}