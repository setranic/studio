
import { getPublicacionBySlug } from '@/lib/data';
import { notFound } from 'next/navigation';
import { CalendarDays, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import PostImage from '@/components/PostImage';
import { Card } from '@/components/ui/card';
import ClientFormattedDate from './ClientFormattedDate';
import { getPostSlugs } from '@/lib/static-paths';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

type Props = {
  params: { slug: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPublicacionBySlug(params.slug);

  if (!post) {
    return {
      title: 'Publicación no encontrada',
    };
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
  };
}

export default async function PublicacionPage({ params }: Props) {
  const slug = params.slug;
  const post = await getPublicacionBySlug(slug);

  if (!post) {
    notFound();
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
