
import React from 'react';
import { Header } from '@/components/Header';
import { Toaster } from '@/components/ui/toaster';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent h-32 pointer-events-none" />
        {children}
      </main>
      <footer className="py-6 border-t border-border">
        <div className="main-container text-center text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            &copy; {new Date().getFullYear()} No More Scam - كافح الإحتيال ببلاغك
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary/50 mx-1" />
            <a href="mailto:support@nomorescam.org" className="text-primary hover:underline">
              الدعم الفني
            </a>
          </p>
        </div>
      </footer>
      <Toaster />
    </div>
  );
};
