
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRef, useEffect } from 'react';

const servicesData = [
  {
    title: "TRANSPORTE DE CARGA",
    description: "SETRANIC NICARAGUA, ofrecemos el servicio de transporte de carga nacional e internacional. Contamos con una flota equipada para todas tus operaciones.",
    media: { type: 'image', src: '/studio/servicios/transportedecarga.png' },
    aiHint: "cargo truck logistics",
    align: "left"
  },
  {
    title: "DISTRIBUCION DE MERCANCIAS",
    description: "En SETRANIC contamos con equipos y personal, con la experiencia en el sector para realizar todas las maniobras que sean requeridas por nuestros clientes.",
    media: { type: 'image', src: '/studio/servicios/distribuciondemercancias.png' },
    aiHint: "warehouse distribution",
    align: "right"
  },
  {
    title: "RASTREO DE MEDIOS EN TIEMPO REAL",
    description: "Ofrecemos en nuestros Servicios de valor agregado, el rastreo en tiempo real de la mercancía para mantenerte al tanto.",
    media: { type: 'video', src: '/studio/servicios/rastreodemedios.mp4' },
    aiHint: "satellite tracking map",
    align: "left"
  },
  {
    title: "SEGURO DE MERCANCÍAS",
    description: "Contamos con el Servicio Adicional para el Seguro de las Mercancías en transito.",
    media: { type: 'image', src: '/studio/servicios/seguro.png' },
    aiHint: "insurance document protection",
    align: "right"
  }
];

const VideoComponent = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.warn("Autoplay was prevented:", error);
      });
    }
  }, []);
  return (
    <video ref={videoRef} src={src} loop muted playsInline className="w-full h-full object-cover rounded-lg" />
  );
};


export default function ServiciosPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-16">
        <section className="text-center py-12 bg-gradient-to-b from-rose-50 to-background rounded-lg shadow-sm">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">Nuestros Servicios</h1>
          <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto font-body">
            Ofrecemos una gama completa de soluciones de logística y transporte diseñadas para potenciar tus operaciones, garantizando eficiencia, seguridad y confianza en cada paso del camino.
          </p>
        </section>

        <div className="space-y-24">
          {servicesData.map((service, index) => (
            <section 
              key={index} 
              className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${service.align === 'right' ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="w-full md:w-1/2 rounded-xl overflow-hidden shadow-2xl">
                 <div className="aspect-w-16 aspect-h-9">
                    {service.media.type === 'image' ? (
                      <Image
                        src={service.media.src}
                        alt={service.title}
                        width={600}
                        height={400}
                        className="object-cover w-full h-full"
                        data-ai-hint={service.aiHint}
                      />
                    ) : (
                      <VideoComponent src={service.media.src} />
                    )}
                </div>
              </div>
              <div className="w-full md:w-1/2 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-headline font-bold text-primary mb-4">{service.title}</h2>
                <p className="text-foreground/80 font-body text-lg mb-6">{service.description}</p>
                <Button asChild size="lg" className="font-body shadow-md hover:shadow-lg transition-shadow duration-300">
                  <Link href="/contactanos">Consultar con Ventas</Link>
                </Button>
              </div>
            </section>
          ))}
        </div>

        <section className="text-center py-16">
            <h2 className="text-3xl font-headline font-semibold text-primary mb-4">¿Listo para empezar?</h2>
            <p className="text-lg text-foreground/80 font-body mb-8 max-w-xl mx-auto">
              Nuestro equipo está listo para crear una solución a tu medida.
            </p>
             <Button asChild size="lg" className="font-body shadow-md hover:shadow-lg transition-shadow duration-300">
              <Link href="/contactanos">Solicitar una Cotización</Link>
            </Button>
        </section>

      </div>
    </div>
  );
}
