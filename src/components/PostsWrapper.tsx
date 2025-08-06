
"use client";

import { useState, useEffect } from 'react';
import { getPublicaciones } from '@/lib/data';
import type { Publicacion } from '@/types';
import PostCard from '@/components/common/PostCard';
import { Loader2 } from 'lucide-react';

export default function PostsWrapper() {
  const [posts, setPosts] = useState<Publicacion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const fetchedPosts = await getPublicaciones();
        const postsWithSlugs = fetchedPosts.map(post => ({
          ...post,
          slug: post.slug || post.id || post.titulo.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
        }));
        setPosts(postsWithSlugs);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("No se pudieron cargar las noticias.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="ml-3 font-body text-lg">Cargando noticias...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-destructive font-body text-center">{error}</p>;
  }
  
  if (posts.length === 0) {
     return <p className="text-muted-foreground font-body text-center py-10">No hay noticias disponibles en este momento.</p>;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      {posts.slice(0, 3).map((post) => (
        <PostCard key={post.id || post.slug} post={post} />
      ))}
    </div>
  );
}
