
import { getPublicaciones, getPublicacionBySlug } from '@/app/admin/publicaciones/actions';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarDays, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import PostImage from '@/components/PostImage';
import type { Publicacion } from '@/types';

// This function tells Next.js which routes to pre-render at build time.
export async function generateStaticParams() {
  const posts = await getPublicaciones();
 
  return posts.map((post) => ({
    slug: post.slug || post.id || '',
  })).filter(item => item.slug);
}


export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPublicacionBySlug(params.slug);

  if (!post) {
    return {
      title: 'Publicación no encontrada',
    }
  }

  return {
    title: `${post.titulo} | Setranic`,
    description: post.subtitulo,
    openGraph: {
      title: post.titulo,
      description: post.subtitulo,
      images: [
        {
          url: post.imagenPortadaUrl,
          width: 1200,
          height: 630,
          alt: post.titulo,
        },
      ],
    },
  }
}

export default async function PublicacionPage({ params }: { params: { slug: string } }) {
  const post = await getPublicacionBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto py-8 my-8">
      <div className="bg-card shadow-xl rounded-2xl p-6 md:p-8 lg:p-10 space-y-8">
        <header className="space-y-4 border-b border-border pb-6">
          <Button variant="outline" asChild>
            <Link href="/updates" className="inline-flex items-center text-sm font-body">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a Noticias
            </Link>
          </Button>
          <h1 className="text-3xl md:text-5xl font-headline font-bold text-primary">{post.titulo}</h1>
          <p className="text-lg md:text-xl text-muted-foreground font-body">{post.subtitulo}</p>
          {post.createdAt && (
            <div className="flex items-center text-sm text-muted-foreground font-body">
              <CalendarDays className="mr-2 h-4 w-4" />
              <span>Publicado el {format(new Date(post.createdAt), "dd 'de' MMMM, yyyy", { locale: es })}</span>
            </div>
          )}
        </header>
        
        <PostImage src={post.imagenPortadaUrl} alt={`Imagen de portada para ${post.titulo}`} />

        <div 
          className="font-body text-base md:text-lg text-foreground/90 leading-relaxed whitespace-pre-wrap"
        >
          {post.contenido}
        </div>
      </div>
    </article>
  );
}
