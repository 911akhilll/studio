'use client';
import Header from '@/components/header';
import Hero from '@/components/hero';
import About from '@/components/about';
import Services from '@/components/services';
import Portfolio from '@/components/portfolio';
import Contact from '@/components/contact';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="bg-background min-h-screen text-foreground">
      <Header />
      <main>
        <Hero />
        <div className="bg-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="block fill-primary -mt-px">
            <path fillOpacity="1" d="M0,160L48,181.3C96,203,192,245,288,250.7C384,256,480,224,576,192C672,160,768,128,864,138.7C960,149,1056,203,1152,208C1248,213,1344,171,1392,149.3L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
          </svg>
          <About />
          <Services />
        </div>
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
