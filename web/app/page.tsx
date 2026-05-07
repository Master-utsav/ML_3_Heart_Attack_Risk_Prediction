import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <Footer />
    </main>
  );
}