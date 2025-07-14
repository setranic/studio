
"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';

const valorAgregadoItems = [
  { src: "/nosotros/valoragregado/principal.svg", alt: "Valor Agregado" },
  { src: "/nosotros/valoragregado/1.svg", alt: "Inspección Continua" },
  { src: "/nosotros/valoragregado/2.svg", alt: "Rastreo de Mercancías" },
  { src: "/nosotros/valoragregado/3.svg", alt: "Personal Certificado" },
  { src: "/nosotros/valoragregado/4.svg", alt: "Cadena Logística" },
  { src: "/nosotros/valoragregado/5.svg", alt: "Atención Personalizada" },
];

export default function NosotrosPage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
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
          playsInline
          className="w-full h-full object-cover"
          poster="https://placehold.co/1920x1080.png"
          data-ai-hint="office background"
        >
          <source src="/nosotros/video/nosotrosstn.mp4" type="video/mp4" />
          Tu navegador no soporta el tag de video.
        </video>
      </div>
      <div className="fixed inset-0 bg-black opacity-50 z-[1]"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full min-h-[calc(100vh-64px-56px)] p-4 md:p-8 gap-8">
        {/* Left Side: About Card */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
            <div className="relative w-full max-w-xs md:max-w-md lg:max-w-lg">
                <Image
                    src="/nosotros/sobrenosotroscard.svg"
                    alt="Sobre Nosotros Card"
                    width={800} 
                    height={600} 
                    className="w-full h-auto opacity-50"
                />
                <Image
                    src="/nosotros/sobrenosotroscardtext.svg"
                    alt="Sobre Nosotros Texto"
                    width={800}
                    height={600}
                    className="absolute top-0 left-0 w-full h-auto"
                />
            </div>
        </div>

        {/* Right Side: Valor Agregado */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <div className="flex flex-col items-center space-y-2 md:space-y-3 w-full max-w-sm">
                {valorAgregadoItems.map((item, index) => (
                    <Image
                        key={index}
                        src={item.src}
                        alt={item.alt}
                        width={400}
                        height={80}
                        className="w-full h-auto"
                    />
                ))}
            </div>
        </div>
      </div>
    </>
  );
}
