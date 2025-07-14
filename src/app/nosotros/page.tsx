
"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Eye, Compass, ArrowLeft } from 'lucide-react';

const valorAgregadoItems = [
  { src: "/nosotros/valor agregado/principal.png", alt: "Valor Agregado" },
  { src: "/nosotros/valor agregado/1.png", alt: "Inspección Continua" },
  { src: "/nosotros/valor agregado/2.png", alt: "Rastreo de Mercancías" },
  { src: "/nosotros/valor agregado/3.png", alt: "Personal Certificado" },
  { src: "/nosotros/valor agregado/4.png", alt: "Cadena Logística" },
  { src: "/nosotros/valor agregado/5.png", alt: "Atención Personalizada" },
];

const infoCards = [
  {
    icon: Eye,
    title: "Visión",
    content: "Nuestra visión consiste en alcanzar un nivel de liderazgo caracterizado por nuestras estrategias sin límites, con una inversión constante en mantenimiento, capacitación y tecnología."
  },
  {
    icon: Target,
    title: "Misión",
    content: "Nuestra Misión va más allá del posicionamiento queremos consolidarnos como la recomendación número uno en el sector logístico, contamos con una red de aliados logísticos que hacen posible cumplir nuestra meta."
  },
  {
    icon: Compass,
    title: "Principal Norte",
    content: "Nosotros en Setranic, creemos que el transporte no solo mueve mercancías, sino que construye confianza y conecta oportunidades. Nuestro norte es avanzar cada día con propósito, para ser más que un servicio: ser un aliado en el camino."
  }
];

export default function NosotrosPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showInfoCards, setShowInfoCards] = useState(false);

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
      
      <div className="relative z-10 flex flex-col items-center justify-center w-full min-h-[calc(100vh-64px-56px)] p-4 md:p-8 gap-8">
        
        {!showInfoCards ? (
          <>
            {/* Initial View */}
            <div className="flex flex-col md:flex-row items-center justify-between w-full gap-8">
              {/* Left Side: About Card */}
              <div className="w-full md:w-1/2 flex flex-col items-center md:items-start justify-center">
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
                   <Button 
                    onClick={() => setShowInfoCards(true)} 
                    className="mt-6 bg-primary/80 hover:bg-primary text-primary-foreground font-body shadow-lg backdrop-blur-sm border border-white/20"
                  >
                    Conocer Más
                  </Button>
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
        ) : (
          <>
            {/* Info Cards View */}
            <div className="w-full max-w-6xl text-white">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {infoCards.map((card, index) => (
                   <div key={index} className="space-y-4">
                     <div className="flex items-center gap-4">
                       <div className="bg-primary/90 text-primary-foreground rounded-full p-3 inline-flex border-2 border-white/50">
                          <card.icon className="h-8 w-8" />
                       </div>
                       <h2 className="font-headline text-3xl font-bold">{card.title}</h2>
                     </div>
                     <div className="bg-primary/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-base font-body">
                       <p>{card.content}</p>
                     </div>
                   </div>
                ))}
              </div>
              <div className="text-center">
                <Button 
                  onClick={() => setShowInfoCards(false)} 
                  variant="outline"
                  className="mt-12 bg-transparent hover:bg-white/20 text-white font-body shadow-lg border-white/50"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
