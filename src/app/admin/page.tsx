
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileText, Edit3, Users, Settings, LogOut, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export default function AdminPage() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({ title: "Sesión Cerrada", description: "Has cerrado sesión exitosamente." });
      router.push('/'); 
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "No se pudo cerrar sesión." });
    }
  };
  
  return (
    <div className="space-y-12">
      <section className="text-center py-12 bg-gradient-to-b from-blue-50 to-background rounded-lg shadow-sm">
        <div className="flex justify-center items-center mb-4">
          <ShieldCheck className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-2">Panel de Administración</h1>
        {user && <p className="text-sm text-muted-foreground font-body">Conectado como: {user.email}</p>}
        <p className="text-lg md:text-xl text-foreground max-w-2xl mx-auto font-body mt-3">
          Bienvenido al panel de administración. Aquí podrás gestionar el contenido de tu aplicación.
        </p>
      </section>

      <section className="bg-card p-8 rounded-xl shadow-xl">
        <h2 className="text-2xl font-headline font-semibold text-primary mb-6">Acciones Rápidas</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/admin/publicaciones" className="block p-6 bg-background rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 group">
            <Edit3 className="h-8 w-8 text-accent mb-3 group-hover:text-primary transition-colors" />
            <h3 className="text-xl font-headline font-semibold text-accent group-hover:text-primary transition-colors mb-2">Gestionar Publicaciones</h3>
            <p className="text-muted-foreground font-body">Crear, editar y eliminar artículos y actualizaciones.</p>
          </Link>
          <Link href="/admin/contactos" className="block p-6 bg-background rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 group">
            <FileText className="h-8 w-8 text-accent mb-3 group-hover:text-primary transition-colors" />
            <h3 className="text-xl font-headline font-semibold text-accent group-hover:text-primary transition-colors mb-2">Ver Mensajes de Contacto</h3>
            <p className="text-muted-foreground font-body">Revisar los mensajes enviados desde el formulario de contacto.</p>
          </Link>
           <div className="p-6 bg-background rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 group cursor-not-allowed opacity-70">
            <Users className="h-8 w-8 text-muted mb-3" />
            <h3 className="text-xl font-headline font-semibold text-muted mb-2">Gestionar Usuarios</h3>
            <p className="text-muted-foreground font-body">Ver y editar usuarios (Próximamente).</p>
          </div>
          <div className="p-6 bg-background rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 group cursor-not-allowed opacity-70">
            <Settings className="h-8 w-8 text-muted mb-3" />
            <h3 className="text-xl font-headline font-semibold text-muted mb-2">Configuración</h3>
            <p className="text-muted-foreground font-body">Ajustes generales del sitio (Próximamente).</p>
          </div>
        </div>
      </section>
      <section className="text-center mt-8">
          <Button onClick={handleSignOut} variant="outline" className="font-body border-destructive text-destructive hover:bg-destructive/10 hover:shadow-lg transition-shadow duration-300 shadow-md">
            <LogOut className="mr-2 h-4 w-4" /> Cerrar Sesión
          </Button>
      </section>
    </div>
  );
}
