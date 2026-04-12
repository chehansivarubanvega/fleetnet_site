import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#020617] text-white flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 text-center">
          <h1 className="text-[12rem] md:text-[18rem] font-black leading-none tracking-tighter text-white/5 select-none">
            404
          </h1>
          <div className="-mt-20 md:-mt-32">
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
              SIGNAL <span className="text-primary italic">LOST.</span>
            </h2>
            <p className="text-white/50 text-xl max-w-lg mx-auto mb-12 font-medium">
              The coordinates you are looking for do not exist in the FleetNET Global registry. Return to mission control to continue.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="/"
                className="px-10 py-4 bg-white text-black font-black uppercase tracking-[0.2em] text-sm hover:bg-primary transition-all rounded-full"
              >
                Return Home
              </Link>
              <Link
                href="/about"
                className="px-10 py-4 bg-transparent border-2 border-white/10 text-white font-black uppercase tracking-[0.2em] text-sm hover:border-white transition-all rounded-full"
              >
                About Us
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
