import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative z-20 py-8 bg-muted text-muted-foreground text-center border-t border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
      </div>
    </footer>
  );
}
