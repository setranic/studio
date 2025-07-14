
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const services = [
  {
    title: "TRANSPORTE DE CARGA",
    description: "SETRANIC NICARAGUA, ofrecemos el servicio de transporte de carga nacional e internacional. Contamos con una flota equipada para todas tus operaciones. Consulta con nuestro equipo de ventas y consulta cuales son nuestros planes y servicios que adaptaremos a tus necesidades...",
    imageUrl: "/servicios/transportedecarga.png",
    aiHint: "cargo truck",
  },
  {
    title: "RASTREO DE MEDIOS EN TIEMPO REAL",
    description: "En SETRANIC ofrecemos en nuestros Servicios de valor agregado, el rastreo en tiempo real de la mercancía para mantenerte al tanto del progreso de la operación. Consulta con nuestro equipo de ventas nuestros planes...",
    videoUrl: "/servicios/rastreodemedios.mp4",
    aiHint: "satellite tracking",
  },
  {
    title: "DISTRIBUCION DE MERCANCIAS",
    description: "En SETRANIC contamos con equipos y personal, con la experiencia en el sector para realizar todas las maniobras que sean requeridas por nuestros clientes. Consulta con nuestro equipo las mejores condiciones para tus necesidades...",
    imageUrl: "/servicios/distribuciondemercancias.png",
    aiHint: "forklift loading",
  },
   {
    title: "SEGURO DE MERCANCÍAS",
    description: "Contamos con el Servicio Adicional para el Seguro de las Mercancías en transito. Consulta con nuestro equipo de ventas en SETRANIC cuales son las mejores condiciones para tus necesidades, mantente conectado y visita nuestro portal STN Updates...",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "insurance document",
  }
];

export default function ServiciosPage() {
  return (
    <div className="space-y-16">
      <section className="text-center py-12 bg-gradient-to-b from-rose-50 to-background rounded-lg shadow-sm">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">Nuestros Servicios</h1>
        <p className="text-lg md:text-xl text-foreground max-w-2xl mx-auto font-body">
          Ofrecemos una gama completa de soluciones de logística y transporte diseñadas para potenciar tus operaciones.
        </p>
      </section>

      {services.map((service: {title: string, description: string, imageUrl?: string, videoUrl?: string, aiHint: string}, index) => (
        <section key={service.title} className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 !== 0 ? 'md:grid-flow-row-dense md:[&>*:last-child]:col-start-1' : ''}`}>
          <div className="rounded-xl overflow-hidden shadow-xl group">
            {service.videoUrl ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-105"
                src={service.videoUrl}
              >
                Tu navegador no soporta el tag de video.
              </video>
            ) : (
              <Image 
                src={service.imageUrl!}
                alt={service.title}
                width={600} 
                height={400} 
                className="object-cover w-full h-auto transform transition-transform duration-500 group-hover:scale-105"
                data-ai-hint={service.aiHint}
              />
            )}
          </div>
          <div>
            <h2 className="text-3xl font-headline font-semibold text-primary mb-6">{service.title}</h2>
            <p className="text-foreground/90 font-body mb-8 leading-relaxed">
              {service.description}
            </p>
            <Button asChild className="font-body shadow-md hover:shadow-lg transition-shadow duration-300">
              <Link href="/contactanos">Consultar con Ventas</Link>
            </Button>
          </div>
        </section>
      ))}
    </div>
  );
}
