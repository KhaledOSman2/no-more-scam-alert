
import React from 'react';
import { Header } from '@/components/Header';
import { Toaster } from '@/components/ui/toaster';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background animate-fade-in">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <footer className="py-6 border-t border-border">
        <div className="main-container text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} No More Scam - كافح الإحتيال ببلاغك</p>
        </div>
      </footer>
      <Toaster />
    </div>
  );
};
