
"use client";

import { useEffect, useRef } from 'react';

export default function NosotrosPage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Intenta reproducir el video cuando el componente se monta
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        // La reproducción automática puede ser bloqueada por el navegador.
        // Esto es normal, especialmente en móviles. El usuario deberá interactuar.
        console.warn("La reproducción automática del video fue bloqueada:", error);
      });
    }
  }, []);

  return (
    <div className="relative w-full h-[calc(100vh-64px)] overflow-hidden -m-8">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline // Esencial para la reproducción en iOS
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        poster="https://placehold.co/1920x1080.png" // Un póster mientras carga el video
        data-ai-hint="office background"
      >
        <source src="/nosotros/video/nosotrosstn.mp4" type="video/mp4" />
        Tu navegador no soporta el tag de video.
      </video>
       <div className="absolute inset-0 bg-black opacity-50 z-[1]"></div>
      {/* Futuro contenido se puede añadir aquí sobre el video */}
    </div>
  );
}
