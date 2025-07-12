
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X, ShieldCheck, LogOut, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import LoginModal from '@/components/auth/LoginModal';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


const navLinksBase = [
  { href: '/', label: 'Home' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/updates', label: 'Updates' },
  { href: '/contactanos', label: 'Contáctanos' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user, signOut, loading } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({ title: "Sesión Cerrada", description: "Has cerrado sesión exitosamente." });
      router.push('/'); 
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "No se pudo cerrar sesión." });
    }
  };
  
  const handleAdminClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      setIsMobileMenuOpen(false); // Close mobile menu if open
      setIsLoginModalOpen(true);
    } else {
      setIsMobileMenuOpen(false);
      router.push('/admin');
    }
  };

  const navLinks = [
    ...navLinksBase,
    // Admin link is handled separately below for desktop to include DropdownMenu or LoginModal logic
  ];
  
  const adminNavLink = { href: '/admin', label: 'Admin', icon: ShieldCheck };


  const NavLinkItem = ({ href, label, icon: Icon, onClick, isMobile = false }: { href: string; label: string; icon?: React.ElementType, onClick?: (e: React.MouseEvent) => void, isMobile?: boolean }) => {
    const commonProps = {
      className: cn(
        'px-3 py-2 rounded-md font-medium transition-colors duration-300 font-body flex items-center gap-2',
        isMobile ? 'text-lg py-3' : 'text-sm', // Increase font size and padding for mobile
        pathname === href
          ? 'bg-primary text-primary-foreground shadow-sm'
          : 'text-foreground hover:bg-primary/10 hover:text-primary',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
      ),
      'aria-current': pathname === href ? 'page' : undefined,
    };

    if (onClick && !isMobile) { // For non-mobile with custom click (like Admin button)
       return (
        <button onClick={onClick} {...commonProps}>
          {Icon && <Icon className="h-4 w-4" />}
          {label}
        </button>
      );
    }
    
    return (
      <Link href={href} onClick={onClick} {...commonProps}>
        {Icon && <Icon className="h-4 w-4" />}
        {label}
      </Link>
    );
  };


  if (!mounted || loading) {
    return ( 
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background">
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
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center" aria-label="Setranic Home">
            <Image src="/logostnrojo.svg" alt="Setranic Logo" width={50} height={50} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1 items-center">
            {navLinksBase.map((link) => (
              <NavLinkItem key={link.href} href={link.href} label={link.label} />
            ))}
            {user ? (
               <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="px-3 py-2 text-sm font-medium font-body flex items-center gap-2 text-foreground hover:bg-primary/10 hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                    <UserCircle className="h-5 w-5" /> Admin Panel
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel className="font-body">Mi Cuenta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                     <Link href="/admin" className="font-body flex items-center gap-2 cursor-pointer">
                        <ShieldCheck className="h-4 w-4" /> Ir al Panel
                     </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut} className="font-body flex items-center gap-2 cursor-pointer text-red-600 hover:!text-red-600 focus:!bg-red-100 focus:!text-red-700">
                    <LogOut className="h-4 w-4" /> Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <NavLinkItem href={adminNavLink.href} label={adminNavLink.label} icon={adminNavLink.icon} onClick={handleAdminClick} />
            )}
          </nav>

          {/* Mobile Navigation Trigger */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open navigation menu">
                  <Menu className="h-6 w-6 text-primary" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs bg-background p-4 [&>button]:hidden">
                <div className="flex flex-col space-y-2">
                   <div className="flex justify-between items-center mb-4">
                     <Link href="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                      <Image src="/logostnrojo.svg" alt="Setranic Logo" width={50} height={50} />
                    </Link>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon" className="h-10 w-10" aria-label="Cerrar menú">
                        <X className="h-6 w-6 text-primary" />
                      </Button>
                    </SheetClose>
                  </div>
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                       <NavLinkItem
                        href={link.href}
                        label={link.label}
                        icon={link.icon}
                        isMobile={true}
                      />
                    </SheetClose>
                  ))}
                  {/* Admin link for mobile */}
                   <SheetClose asChild>
                      <NavLinkItem
                        href={adminNavLink.href}
                        label={adminNavLink.label}
                        icon={adminNavLink.icon}
                        onClick={handleAdminClick}
                        isMobile={true}
                      />
                   </SheetClose>
                  {user && (
                    <Button onClick={() => { handleSignOut(); setIsMobileMenuOpen(false); }} variant="ghost" className="w-full justify-start text-lg py-3 font-body text-red-600 hover:!text-red-600 hover:!bg-red-100">
                      <LogOut className="mr-2 h-4 w-4" /> Cerrar Sesión
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <LoginModal isOpen={isLoginModalOpen} onOpenChange={setIsLoginModalOpen} />
    </>
  );
}
