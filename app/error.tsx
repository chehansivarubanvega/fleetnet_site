'use client';

import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[#020617] text-white flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-8">
          <svg className="w-10 h-10 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-4xl font-black mb-4 tracking-tight">SYSTEM BREACH</h2>
        <p className="text-white/50 text-xl max-w-lg mx-auto mb-10 font-medium">
          A synchronization error has occurred in the FleetNET command layer. Our engineers have been notified.
        </p>
        <button
          onClick={() => reset()}
          className="px-10 py-4 bg-white text-black font-black uppercase tracking-[0.2em] text-sm hover:bg-primary transition-all rounded-full"
        >
          Try to Synchronize
        </button>
      </div>
      <Footer />
    </main>
  );
}
