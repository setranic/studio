
"use client";

import { useState, useEffect } from 'react';
import { getPublicacionBySlug } from '@/lib/data';
import { notFound, useParams } from 'next/navigation';
import { CalendarDays, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import PostImage from '@/components/PostImage';
import { Card } from '@/components/ui/card';
import ClientFormattedDate from './ClientFormattedDate';
import type { Publicacion } from '@/types';
import { getPostSlugs } from '@/lib/static-paths';

// Generate static pages for each publication using a local, static list of slugs
// This is REQUIRED for `output: 'export'`
export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// This is now a Client Component that fetches its own data after mounting.
export default function PublicacionPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const [post, setPost] = useState<Publicacion | null | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      setIsLoading(true);
      const fetchedPost = await getPublicacionBySlug(slug);
      setPost(fetchedPost);
      setIsLoading(false);
    };

    fetchPost();
  }, [slug]);
  
   useEffect(() => {
    if (post) {
      document.title = `${post.titulo} | Setranic`;
    } else {
      document.title = 'Noticias | Setranic';
    }
  }, [post]);


  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg font-body text-foreground">Cargando publicación...</p>
      </div>
    );
  }

  if (post === null) {
    notFound();
  }
  
  if (!post) {
      return null; // or a fallback component
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
