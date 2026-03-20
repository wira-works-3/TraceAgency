import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import VideoShowcase from "@/components/VideoShowcase";
import Artikel from "@/components/Artikel";
import Kontak from "@/components/Kontak";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col w-full">
        <Hero />
        <About />
        <Services />
        <Gallery />
        <VideoShowcase />
        <Artikel />
        <Kontak />
      </main>
      <Footer />
    </>
  );
}
