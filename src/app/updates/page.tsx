
"use client"; // Required because we use useEffect and useState

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getPublicaciones } from '@/app/admin/publicaciones/actions'; // Reuse the server action
import type { Publicacion } from '@/types';
import { Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function UpdatesPage() {
  const [blogPosts, setBlogPosts] = useState<Publicacion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      const posts = await getPublicaciones();
      // Ensure all posts have a slug, generate if missing for client-side linking
      const postsWithSlugs = posts.map(post => ({
        ...post,
        slug: post.slug || post.id || // Use existing slug, or Firestore ID as fallback
              post.titulo.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') // Or generate from title
      }));
      setBlogPosts(postsWithSlugs);
      setIsLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <div className="space-y-12">
      <section className="text-center py-12 bg-gradient-to-b from-rose-50 to-background rounded-lg shadow-sm">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">Updates y Noticias</h1>
        <p className="text-lg md:text-xl text-foreground max-w-2xl mx-auto font-body">
          Mantente al día con las últimas novedades, tendencias y consejos del mundo digital.
        </p>
      </section>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="ml-4 text-lg font-body">Cargando noticias...</p>
        </div>
      ) : blogPosts.length === 0 ? (
        <section className="text-center py-10">
          <p className="text-xl text-muted-foreground font-body">Aún no hay publicaciones. ¡Vuelve pronto!</p>
        </section>
      ) : (
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id || post.slug} className="bg-card rounded-xl shadow-lg overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl">
              <div className="relative">
                <Image 
                  src={post.imagenCarruselUrl || "https://placehold.co/600x400.png"}
                  alt={post.titulo}
                  width={600} 
                  height={400} 
                  className="object-cover w-full h-48 transform transition-transform duration-500 group-hover:scale-105"
                  data-ai-hint="technology blog" // Generic hint
                  onError={(e) => e.currentTarget.src = "https://placehold.co/600x400.png"}
                />
                {/* TODO: Add category if available in Publicacion type later */}
                {/* <Badge variant="default" className="absolute top-4 right-4 bg-primary text-primary-foreground">Categoría</Badge> */}
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-headline font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {/* IMPORTANT: The link below assumes you'll create a /updates/[slug] or /updates/[id] page */}
                  {/* For now, it will link to an anchor on the current page if no dynamic route exists. */}
                  <Link href={`/updates/${post.slug || post.id}`}>{post.titulo}</Link>
                </h2>
                <p className="text-sm text-muted-foreground font-body mb-1">
                  {post.createdAt ? format(new Date(post.createdAt), "dd MMMM, yyyy", { locale: es }) : 'Fecha no disponible'}
                </p>
                <p className="text-foreground/80 font-body mb-4 leading-relaxed flex-grow line-clamp-3">{post.subtitulo || post.contenido}</p>
                <Button asChild variant="link" className="mt-auto self-start p-0 text-primary hover:text-accent font-body">
                  <Link href={`/updates/${post.slug || post.id}`}>Leer Más &rarr;</Link>
                </Button>
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
