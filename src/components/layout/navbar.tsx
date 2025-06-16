"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/updates', label: 'Updates' },
  { href: '/contactanos', label: 'Contáctanos' },
  { href: '/admin', label: 'Admin', icon: ShieldCheck },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  const NavLink = ({ href, label, icon: Icon, onClick }: { href: string; label: string; icon?: React.ElementType, onClick?: () => void }) => (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 font-body flex items-center gap-2',
        pathname === href
          ? 'bg-accent text-accent-foreground shadow-sm'
          : 'text-foreground hover:bg-primary/10 hover:text-primary',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
      )}
      aria-current={pathname === href ? 'page' : undefined}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {label}
    </Link>
  );

  if (!mounted) {
    return ( 
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
                <div className="animate-pulse bg-muted h-8 w-24 rounded-md"></div>
                <div className="flex items-center space-x-2">
                    <div className="animate-pulse bg-muted h-8 w-16 rounded-md hidden md:block"></div>
                    <div className="animate-pulse bg-muted h-8 w-16 rounded-md hidden md:block"></div>
                    <div className="animate-pulse bg-muted h-8 w-16 rounded-md hidden md:block"></div>
                </div>
            </div>
        </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label="Setranic Home">
          <Image src="/logo.svg" alt="Setranic Logo" width={32} height={32} />
          <span className="font-headline text-2xl font-bold text-primary self-center whitespace-nowrap">
            Setranic
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-1">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} icon={link.icon} />
          ))}
        </nav>

        {/* Mobile Navigation Trigger */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open navigation menu">
                <Menu className="h-6 w-6 text-primary" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-3/4 bg-background p-6">
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-center mb-6">
                   <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                    <Image src="/logo.svg" alt="Setranic Logo" width={28} height={28} />
                    <span className="font-headline text-xl font-bold text-primary">Setranic</span>
                  </Link>
                  <SheetClose asChild>
                     <Button variant="ghost" size="icon" aria-label="Close navigation menu">
                        <X className="h-6 w-6 text-primary" />
                     </Button>
                  </SheetClose>
                </div>
                {navLinks.map((link) => (
                  <NavLink
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    icon={link.icon}
                    onClick={() => setIsMobileMenuOpen(false)}
                  />
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
