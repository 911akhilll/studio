'use client';
import Header from '@/components/header';
import Hero from '@/components/hero';
import Info from '@/components/info';
import Footer from '@/components/footer';
import AnimatedBackground from '@/components/animated-background';

export default function Home() {
  return (
    <div className="bg-background min-h-screen text-foreground isolate">
      <AnimatedBackground />
      <Header />
      <main>
        <Hero />
        <Info />
      </main>
      <Footer />
    </div>
  );
}
