
"use client";

import type { Metadata } from 'next';
import { Varela_Round, PT_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { AuthProvider } from '@/contexts/AuthContext';
import WhatsAppButton from '@/components/common/WhatsAppButton';

// Varela Round for headlines
const varelaRound = Varela_Round({
  subsets: ['latin'],
  variable: '--font-varela-round',
  weight: ['400'],
});

// PT Sans for body text
const ptSans = PT_Sans({
  subsets: ['latin'],
  variable: '--font-pt-sans',
  weight: ['400', '700'],
});


// Metadata can't be dynamic in a client component, 
// so we'll define it statically here. 
// For dynamic metadata, you'd use the generateMetadata function in a server component page.
// export const metadata: Metadata = {
//   title: 'Setranic - Innovación Digital',
//   description: 'Soluciones creativas y tecnológicas para impulsar tu negocio.',
// };


function LayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
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
          varelaRound.variable,
          ptSans.variable
        )}
      >
        <AuthProvider>
           <LayoutContent>{children}</LayoutContent>
        </AuthProvider>
      </body>
    </html>
  );
}
