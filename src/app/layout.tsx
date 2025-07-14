
"use client";

import type { Metadata } from 'next';
import { PT_Sans, Varela_Round } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { AuthProvider } from '@/contexts/AuthContext';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import { usePathname } from 'next/navigation';

// PT Sans for body text remains
const ptSans = PT_Sans({
  subsets: ['latin'],
  variable: '--font-pt-sans',
  weight: ['400', '700'],
});

// Varela Round for headlines
const varelaRound = Varela_Round({
  subsets: ['latin'],
  variable: '--font-varela-round',
  weight: '400',
});

// Metadata can't be dynamic in a client component, 
// so we'll define it statically here. 
// For dynamic metadata, you'd use the generateMetadata function in a server component page.
// export const metadata: Metadata = {
//   title: 'Setranic - Innovación Digital',
//   description: 'Soluciones creativas y tecnológicas para impulsar tu negocio.',
// };


function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showFooter = pathname !== '/nosotros';

  return (
    <>
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      {showFooter && <Footer />}
      <WhatsAppButton />
      <Toaster />
    </>
  );
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
         <title>Setranic - Innovación Digital</title>
         <meta name="description" content="Soluciones creativas y tecnológicas para impulsar tu negocio." />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased flex flex-col',
          ptSans.variable,
          varelaRound.variable
        )}
      >
        <AuthProvider>
           <LayoutContent>{children}</LayoutContent>
        </AuthProvider>
      </body>
    </html>
  );
}
