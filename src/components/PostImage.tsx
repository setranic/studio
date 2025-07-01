
"use client";

import Image from 'next/image';

interface PostImageProps {
  src: string;
  alt: string;
}

export default function PostImage({ src, alt }: PostImageProps) {
  return (
    <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden my-6 shadow-md">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 1024px"
        priority
        onError={(e) => { e.currentTarget.src = "https://placehold.co/1280x720.png"; }}
      />
    </div>
  );
}
