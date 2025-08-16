'use client';
import Header from '@/components/header';
import Hero from '@/components/hero';
import About from '@/components/about';
import Services from '@/components/services';
import Portfolio from '@/components/portfolio';
import Contact from '@/components/contact';
import Footer from '@/components/footer';
import { AdminProvider } from '@/context/admin-context';
import AdminPanel from '@/components/admin-panel';

export default function Home() {
  return (
    <AdminProvider>
      <div className="bg-secondary min-h-screen text-black overflow-x-hidden">
        <Header />
        <main>
          <Hero />
          <About />
          <Services />
          <Portfolio />
          <Contact />
        </main>
        <Footer />
        <AdminPanel />
      </div>
    </AdminProvider>
  );
}
