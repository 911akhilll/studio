'use client';
import Header from '@/components/header';
import Hero from '@/components/hero';
import About from '@/components/about';
import Projects from '@/components/projects';
import Footer from '@/components/footer';
import AnimatedBackground from '@/components/animated-background';

export default function Home() {
  return (
    <div className="bg-background min-h-screen text-foreground isolate">
      <AnimatedBackground />
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}
