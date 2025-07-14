"use client";

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { getPublicacionBySlug } from '@/app/admin/publicaciones/actions';
import type { Publicacion } from '@/types';
import { CalendarDays, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import PostImage from '@/components/PostImage';
import { Card } from '@/components/ui/card';
import ClientFormattedDate from './ClientFormattedDate';

export default function PublicacionPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<Publicacion | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!params.slug) {
      setIsLoading(false);
      setError("No se proporcionó slug.");
      return;
    }

    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const fetchedPost = await getPublicacionBySlug(params.slug);
        if (fetchedPost) {
          setPost(fetchedPost);
          // Set document title dynamically
          document.title = `${fetchedPost.titulo} | Setranic`;
        } else {
          setError("Publicación no encontrada.");
        }
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Error al cargar la publicación.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [params.slug]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg font-body">Cargando publicación...</p>
      </div>
    );
  }

  if (error) {
     // You can render a custom error component or use Next.js's notFound()
     // For this static export context, showing an error message is better.
     notFound();
  }

  if (!post) {
    // This case is mostly covered by the error state, but as a fallback.
    return notFound();
  }

  return (
    <article className="max-w-4xl mx-auto py-8 my-8">
      <Card className="shadow-xl rounded-2xl p-6 md:p-8 lg:p-10 space-y-8">
        <header className="space-y-4 border-b border-border pb-6">
          <Button variant="outline" asChild>
            <Link href="/updates" className="inline-flex items-center text-sm font-body">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a Noticias
            </Link>
          </Button>
          <h1 className="text-3xl md:text-5xl font-headline font-bold text-primary">{post.titulo}</h1>
          <p className="text-lg md:text-xl text-muted-foreground font-body">{post.subtitulo}</p>
          <div className="flex items-center text-sm text-muted-foreground font-body">
            <CalendarDays className="mr-2 h-4 w-4" />
            <ClientFormattedDate date={post.createdAt} />
          </div>
        </header>
        
        <PostImage src={post.imagenPortadaUrl} alt={`Imagen de portada para ${post.titulo}`} />

        <div 
          className="font-body text-base md:text-lg text-foreground/90 leading-relaxed whitespace-pre-wrap"
        >
          {post.contenido}
        </div>
      </Card>
    </article>
  );
}