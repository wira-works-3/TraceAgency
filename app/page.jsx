import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import VideoShowcase from "@/components/VideoShowcase";
import Artikel from "@/components/Artikel";
import Kontak from "@/components/Kontak";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Jasa Sewa SPG, Usher, MC Profesional",
  description:
    "Trace Agency, jasa sewa SPG, SPB, Usher, MC, hingga Brand Ambassador profesional untuk event dan promosi brand di berbagai kota.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Jasa Sewa SPG, Usher, MC Profesional",
    description:
      "Konsultasi kebutuhan sewa SPG, Usher, dan talent event Anda bersama Trace Agency untuk hasil promosi yang lebih maksimal.",
    url: "/",
    siteName: "Jasa Sewa SPG",
  },
};

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
