
"use client";

import { useState, useEffect, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { addPublicacion, getPublicaciones, deletePublicacion } from "./actions";
import type { Publicacion } from "@/types";
import Link from 'next/link';
import Image from "next/image";
import { PlusCircle, Trash2, Edit, List, Loader2, ExternalLink, Eye, AlertCircle, ShieldAlert } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useAuth } from "@/contexts/AuthContext";


export default function PublicacionesAdminPage() {
  const [titulo, setTitulo] = useState("");
  const [subtitulo, setSubtitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [imagenPortadaUrl, setImagenPortadaUrl] = useState("");
  const [imagenCarruselUrl, setImagenCarruselUrl] = useState("");
  const [slug, setSlug] = useState("");

  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [formErrors, setFormErrors] = useState<Record<string, string[] | undefined>>({});

  const { toast } = useToast();
  const { user } = useAuth(); // Get user from auth context

  const fetchPublicaciones = async () => {
    setIsFetching(true);
    const fetchedPublicaciones = await getPublicaciones();
    setPublicaciones(fetchedPublicaciones);
    setIsFetching(false);
  };

  useEffect(() => {
    // Only fetch if user is logged in
    if (user) {
      fetchPublicaciones();
    } else {
      setIsFetching(false);
    }
  }, [user]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) {
        toast({ variant: "destructive", title: "No autenticado", description: "Debes iniciar sesión para crear una publicación." });
        return;
    }
    setIsLoading(true);
    setFormErrors({});

    const result = await addPublicacion({
      titulo,
      subtitulo,
      contenido,
      imagenPortadaUrl,
      imagenCarruselUrl,
      slug: slug || undefined, // Pass undefined if empty to allow auto-generation
    });
    setIsLoading(false);

    if (result.success) {
      toast({
        title: "Publicación Creada",
        description: "La nueva publicación ha sido guardada exitosamente.",
      });
      setTitulo("");
      setSubtitulo("");
      setContenido("");
      setImagenPortadaUrl("");
      setImagenCarruselUrl("");
      setSlug("");
      fetchPublicaciones(); // Refresh list
    } else {
      if (result.error && typeof result.error !== 'string') {
        setFormErrors(result.error);
         toast({
          variant: "destructive",
          title: "Error de Validación",
          description: "Por favor corrige los errores en el formulario.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error al Crear",
          description: result.error as string || "No se pudo guardar la publicación.",
        });
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!user) {
        toast({ variant: "destructive", title: "No autenticado", description: "Debes iniciar sesión para eliminar una publicación." });
        return;
    }
    const result = await deletePublicacion(id);
    if (result.success) {
      toast({
        title: "Publicación Eliminada",
        description: "La publicación ha sido eliminada.",
      });
      fetchPublicaciones(); // Refresh list
    } else {
      toast({
        variant: "destructive",
        title: "Error al Eliminar",
        description: result.error || "No se pudo eliminar la publicación.",
      });
    }
  };

  if (!user) {
      return (
        <section className="bg-card p-8 rounded-xl shadow-xl text-center">
            <ShieldAlert className="mx-auto h-12 w-12 text-destructive mb-4" />
            <h1 className="text-2xl font-headline font-bold text-destructive">Acceso Denegado</h1>
            <p className="text-muted-foreground font-body mt-2">Debes iniciar sesión para gestionar las publicaciones.</p>
            <Button variant="outline" asChild className="mt-6">
                <Link href="/admin">
                    Volver al Panel
                </Link>
            </Button>
        </section>
      )
  }

  return (
    <div className="space-y-12">
      <section className="bg-card p-8 rounded-xl shadow-xl">
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-headline font-bold text-primary flex items-center">
                <PlusCircle className="mr-3 h-8 w-8" /> Crear Nueva Publicación
            </h1>
            <Button variant="outline" asChild>
                <Link href="/admin">
                    Volver al Panel
                </Link>
            </Button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="titulo" className="font-body text-foreground">Título</Label>
            <Input id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} required className="font-body"/>
            {formErrors.titulo && <p className="text-sm text-destructive mt-1">{formErrors.titulo.join(', ')}</p>}
          </div>
          <div>
            <Label htmlFor="subtitulo" className="font-body text-foreground">Subtítulo</Label>
            <Input id="subtitulo" value={subtitulo} onChange={(e) => setSubtitulo(e.target.value)} required className="font-body"/>
            {formErrors.subtitulo && <p className="text-sm text-destructive mt-1">{formErrors.subtitulo.join(', ')}</p>}
          </div>
          <div>
            <Label htmlFor="slug" className="font-body text-foreground">Slug (Opcional - ej: mi-nueva-publicacion)</Label>
            <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="Se generará automáticamente si se deja vacío" className="font-body"/>
            {formErrors.slug && <p className="text-sm text-destructive mt-1">{formErrors.slug.join(', ')}</p>}
             <p className="text-xs text-muted-foreground mt-1">Si se deja vacío, se generará a partir del título. Usar solo letras minúsculas, números y guiones.</p>
          </div>
          <div>
            <Label htmlFor="contenido" className="font-body text-foreground">Contenido</Label>
            <Textarea id="contenido" value={contenido} onChange={(e) => setContenido(e.target.value)} required rows={8} className="font-body"/>
            {formErrors.contenido && <p className="text-sm text-destructive mt-1">{formErrors.contenido.join(', ')}</p>}
          </div>
          <div>
            <Label htmlFor="imagenPortadaUrl" className="font-body text-foreground">URL Imagen de Portada</Label>
            <Input id="imagenPortadaUrl" value={imagenPortadaUrl} onChange={(e) => setImagenPortadaUrl(e.target.value)} placeholder="Ej: /publicaciones/portada.jpg" required className="font-body"/>
            {formErrors.imagenPortadaUrl && <p className="text-sm text-destructive mt-1">{formErrors.imagenPortadaUrl.join(', ')}</p>}
            <p className="text-xs text-muted-foreground mt-1">Sube la imagen a la carpeta `public/publicaciones` y luego ingresa la ruta aquí.</p>
          </div>
          <div>
            <Label htmlFor="imagenCarruselUrl" className="font-body text-foreground">URL Imagen para Carrusel/Miniatura</Label>
            <Input id="imagenCarruselUrl" value={imagenCarruselUrl} onChange={(e) => setImagenCarruselUrl(e.target.value)} placeholder="Ej: /publicaciones/thumbnail.jpg" required className="font-body"/>
            {formErrors.imagenCarruselUrl && <p className="text-sm text-destructive mt-1">{formErrors.imagenCarruselUrl.join(', ')}</p>}
             <p className="text-xs text-muted-foreground mt-1">Sube la imagen a la carpeta `public/publicaciones` y luego ingresa la ruta aquí.</p>
          </div>
          <Button type="submit" disabled={isLoading} className="w-full font-body">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <PlusCircle className="mr-2 h-4 w-4" />}
            {isLoading ? "Guardando..." : "Crear Publicación"}
          </Button>
        </form>
      </section>

      <section className="bg-card p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl font-headline font-bold text-primary mb-6 flex items-center">
            <List className="mr-3 h-8 w-8" /> Publicaciones Existentes
        </h2>
        {isFetching ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="ml-3 font-body text-lg">Cargando publicaciones...</p>
          </div>
        ) : publicaciones.length === 0 ? (
          <p className="text-muted-foreground font-body">No hay publicaciones creadas todavía.</p>
        ) : (
          <div className="space-y-6">
            {publicaciones.map((pub) => (
              <Card key={pub.id} className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    {pub.imagenCarruselUrl && (
                       <Image
                        src={pub.imagenCarruselUrl}
                        alt={`Miniatura de ${pub.titulo}`}
                        width={300}
                        height={200}
                        className="object-cover w-full h-48 md:h-full"
                        onError={(e) => e.currentTarget.src = "https://placehold.co/300x200.png"} // Fallback
                      />
                    )}
                  </div>
                  <div className="md:w-2/3">
                    <CardHeader>
                      <CardTitle className="font-headline text-xl text-primary group-hover:underline">
                        {pub.titulo}
                      </CardTitle>
                      <CardDescription className="font-body">
                        {pub.subtitulo}
                        {pub.createdAt && (
                           <Badge variant="outline" className="ml-2 font-body text-xs">
                             {format(new Date(pub.createdAt), "dd MMM, yyyy", { locale: es })}
                           </Badge>
                        )}
                         {pub.slug && (
                           <Badge variant="secondary" className="ml-2 font-body text-xs">
                             Slug: {pub.slug}
                           </Badge>
                        )}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="font-body text-sm text-foreground/80 line-clamp-2">{pub.contenido}</p>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                       <Button variant="outline" size="sm" asChild className="font-body">
                         {/* TODO: Implementar vista previa o enlace a publicación real si `updates/[id]` existe */}
                         <Link href={`/updates#${pub.slug || pub.id}`} target="_blank" title="Ver en el sitio (enlace ancla temporal)"> 
                           <Eye className="mr-1 h-4 w-4" /> Ver
                         </Link>
                       </Button>
                      <Button variant="outline" size="sm" disabled className="font-body"> {/* TODO: Implementar edición */}
                        <Edit className="mr-1 h-4 w-4" /> Editar
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm" className="font-body">
                            <Trash2 className="mr-1 h-4 w-4" /> Eliminar
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle className="font-headline">¿Estás seguro?</AlertDialogTitle>
                            <AlertDialogDescription className="font-body">
                              Esta acción no se puede deshacer. Esto eliminará permanentemente la publicación
                              <strong className="block mt-2">{pub.titulo}</strong>.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="font-body">Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => pub.id && handleDelete(pub.id)} className="font-body bg-destructive hover:bg-destructive/90">
                              Sí, eliminar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
