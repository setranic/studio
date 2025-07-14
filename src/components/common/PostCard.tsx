
"use client";

import Link from 'next/link';
import Image from 'next/image';
import type { Publicacion } from '@/types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useState, useEffect } from 'react';
import type { Timestamp } from 'firebase/firestore';

interface PostCardProps {
  post: Publicacion;
}

function ClientFormattedDate({ date }: { date: string | Timestamp | undefined }) {
  const [formattedDate, setFormattedDate] = useState<string>('');

  useEffect(() => {
    if (date) {
      try {
        const dateObj = typeof date === 'string' ? new Date(date) : date.toDate();
        setFormattedDate(format(dateObj, "dd MMMM, yyyy", { locale: es }));
      } catch (e) {
        setFormattedDate('Fecha no disponible');
      }
    } else {
      setFormattedDate('Fecha no disponible');
    }
  }, [date]);

  return <>{formattedDate}</>;
}


export default function PostCard({ post }: PostCardProps) {
  const postUrl = `/updates/${post.slug || post.id}`;

  return (
    <article className="bg-card rounded-xl shadow-lg overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl text-left h-full">
      <Link href={postUrl} className="block h-full flex flex-col">
        <div className="relative">
          <Image 
            src={post.imagenCarruselUrl || "https://placehold.co/600x400.png"}
            alt={post.titulo}
            width={600} 
            height={400} 
            className="object-cover w-full h-48 transform transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.onerror = null; // prevent infinite loops
              e.currentTarget.src = "https://placehold.co/600x400.png";
            }}
          />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-headline font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {post.titulo}
          </h3>
          <p className="text-sm text-muted-foreground font-body mb-3">
             <ClientFormattedDate date={post.createdAt} />
          </p>
          <p className="text-foreground/80 font-body mb-4 leading-relaxed flex-grow line-clamp-3">{post.subtitulo || post.contenido}</p>
          <span className="mt-auto self-start text-primary group-hover:text-accent font-body font-semibold">
            Leer Más &rarr;
          </span>
        </div>
      </Link>
    </article>
  );
}
