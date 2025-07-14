
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
      
      {/* El contenido futuro se puede añadir aquí, sobre el video. 
          Debe tener un z-index mayor a 1, por ejemplo, `relative z-10`.
      */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-64px)] text-white">
        {/* Aquí puedes agregar títulos u otro contenido en el futuro */}
      </div>
    </>
  );
}
