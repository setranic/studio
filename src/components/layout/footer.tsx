import Link from 'next/link';
import { Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-20 py-8 bg-muted text-muted-foreground border-t border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-4">
        <p className="text-sm font-body">
          Stvaer &copy; 2025 <em>for</em> SETRANIC.{" "}
          <Link 
            href="/politica-de-privacidad" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="underline hover:text-primary transition-colors"
          >
            Politica de Privacidad.
          </Link>
        </p>
        <div className="flex items-center gap-4">
            <Link 
              href="https://www.instagram.com/setranic/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Setranic"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </Link>
             <Link 
              href="https://www.facebook.com/Setranic/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook de Setranic"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Facebook className="h-5 w-5" />
            </Link>
        </div>
      </div>
    </footer>
  );
}
