
"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';

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
    <>
      <div className="fixed top-0 left-0 w-full h-full z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline // Esencial para la reproducción en iOS
          className="w-full h-full object-cover"
          poster="https://placehold.co/1920x1080.png" // Un póster mientras carga el video
          data-ai-hint="office background"
        >
          <source src="/nosotros/video/nosotrosstn.mp4" type="video/mp4" />
          Tu navegador no soporta el tag de video.
        </video>
      </div>
      <div className="fixed inset-0 bg-black opacity-50 z-[1]"></div>
      
      <div className="relative z-10 flex flex-col items-start justify-center min-h-[calc(100vh-64px)] p-4">
        <Image
          src="/nosotros/sobrenosotroscard.svg"
          alt="Sobre Nosotros Card"
          width={800} // Ancho base, se ajustará con las clases de Tailwind
          height={600} // Alto base, se ajustará con las clases de Tailwind
          className="w-full max-w-xs md:max-w-md lg:max-w-lg" // Clases para responsive (tamaño reducido y alineado a la izquierda por el contenedor)
        />
      </div>
    </>
  );
}
