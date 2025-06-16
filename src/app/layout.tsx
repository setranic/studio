
import type { Metadata } from 'next';
import { PT_Sans } from 'next/font/google'; // Removed Playfair_Display
import './globals.css';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { AuthProvider } from '@/contexts/AuthContext'; // Import AuthProvider

// PT Sans for body text remains
const ptSans = PT_Sans({
  subsets: ['latin'],
  variable: '--font-pt-sans',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Setranic - Innovación Digital',
  description: 'Soluciones creativas y tecnológicas para impulsar tu negocio.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* The existing font links are managed by next/font, no need for manual <link> tags from googleapis directly */}
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased flex flex-col',
          // playfairDisplay.variable, // Removed
          ptSans.variable
        )}
      >
        <AuthProvider> {/* Wrap content with AuthProvider */}
          <Navbar />
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
