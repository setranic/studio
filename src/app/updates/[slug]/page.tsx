import { getPublicacionBySlug } from '@/lib/data';
import { notFound } from 'next/navigation';
import { CalendarDays, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import PostImage from '@/components/PostImage';
import { Card } from '@/components/ui/card';
import type { Metadata } from 'next';
import ClientFormattedDate from './ClientFormattedDate';
import { getPostSlugs } from '@/lib/static-paths';

// Generate static pages for each publication using a local, static list of slugs
export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate metadata for each page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // This fetch now happens at build time for each generated page
  const post = await getPublicacionBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post No Encontrado',
      description: 'La publicación que buscas no existe.',
    };
  }

  return {
    title: `${post.titulo} | Setranic`,
    description: post.subtitulo,
  };
}

// This is a Server Component that fetches data during the build
export default async function PublicacionPage({ params }: { params: { slug: string } }) {
  const post = await getPublicacionBySlug(params.slug);

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
            {/* ClientFormattedDate handles date formatting safely on the client to avoid hydration errors */}
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
