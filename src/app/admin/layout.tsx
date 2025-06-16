
"use client";

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/'); // Redirect to home if not logged in and not loading
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg font-body text-foreground">Cargando...</p>
      </div>
    );
  }

  if (!user) {
    // This case should ideally be handled by the redirect,
    // but as a fallback or if redirect hasn't completed.
     return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="ml-4 text-lg font-body text-foreground">Redirigiendo...</p>
      </div>
    );
  }

  return <>{children}</>;
}
