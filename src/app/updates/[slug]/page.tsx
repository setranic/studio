
"use client";

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarDays, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import PostImage from '@/components/PostImage';
import { getPublicacionBySlug } from '@/app/admin/publicaciones/actions';
import type { Publicacion } from '@/types';
import { Card } from '@/components/ui/card';

export default function PublicacionPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<Publicacion | null | undefined>(undefined);
  const { slug } = params;

  useEffect(() => {
    if (slug) {
      const fetchPost = async () => {
        const fetchedPost = await getPublicacionBySlug(slug);
        setPost(fetchedPost);
      };
      fetchPost();
    }
  }, [slug]);

  useEffect(() => {
    if (post) {
      document.title = `${post.titulo} | Setranic`;
      
      const descriptionMeta = document.querySelector('meta[name="description"]');
      if (descriptionMeta) {
        descriptionMeta.setAttribute('content', post.subtitulo);
      } else {
        const newMeta = document.createElement('meta');
        newMeta.name = 'description';
        newMeta.content = post.subtitulo;
        document.head.appendChild(newMeta);
      }
    }
  }, [post]);

  if (post === undefined) {
    return (
      <div className="flex justify-center items-center py-20 min-h-[50vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg font-body">Cargando publicación...</p>
      </div>
    );
  }

  if (post === null) {
    notFound();
  }

  const getFormattedDate = () => {
    if (!post?.createdAt) return null;
    try {
      // It can be a string (from server) or a Timestamp (from direct client fetch)
      const date = typeof post.createdAt === 'string' ? new Date(post.createdAt) : post.createdAt.toDate();
      return format(date, "dd 'de' MMMM, yyyy", { locale: es });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Fecha inválida";
    }
  };

  const formattedDate = getFormattedDate();

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
          {formattedDate && (
            <div className="flex items-center text-sm text-muted-foreground font-body">
              <CalendarDays className="mr-2 h-4 w-4" />
              <span>Publicado el {formattedDate}</span>
            </div>
          )}
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
