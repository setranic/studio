
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const services = [
  {
    title: "TRANSPORTE DE CARGA",
    description: "SETRANIC NICARAGUA, ofrecemos el servicio de transporte de carga nacional e internacional. Contamos con una flota equipada para todas tus operaciones. Consulta con nuestro equipo de ventas y consulta cuales son nuestros planes y servicios que adaptaremos a tus necesidades...",
    imageUrl: "https://placehold.co/1200x600.png",
    aiHint: "cargo truck",
    colSpan: "col-span-2 row-span-2",
  },
  {
    title: "DISTRIBUCION DE MERCANCIAS",
    description: "En SETRANIC contamos con equipos y personal, con la experiencia en el sector para realizar todas las maniobras que sean requeridas por nuestros clientes.",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "warehouse distribution",
    colSpan: "col-span-1 row-span-1",
  },
  {
    title: "AGENCIA ADUANERA",
    description: "Contamos con una red de aliados logísticos que hacen posible cumplir nuestra meta de ser la recomendación número uno en el sector.",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "customs office",
    colSpan: "col-span-1 row-span-1",
  },
  {
    title: "ALMACEN FISCAL",
    description: "Ofrecemos soluciones de almacenaje seguras y eficientes, adaptadas a las normativas fiscales vigentes.",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "secure warehouse",
    colSpan: "col-span-1 row-span-1",
  },
    {
    title: "SEGURO DE MERCANCÍAS",
    description: "Contamos con el Servicio Adicional para el Seguro de las Mercancías en transito.",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "insurance document",
    colSpan: "col-span-1 row-span-1",
  },
  {
    title: "RASTREO DE MEDIOS EN TIEMPO REAL",
    description: "Ofrecemos en nuestros Servicios de valor agregado, el rastreo en tiempo real de la mercancía para mantenerte al tanto.",
    imageUrl: "https://placehold.co/1200x600.png",
    aiHint: "satellite tracking",
    colSpan: "col-span-2 row-span-1",
  },
];


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

        <section className="grid grid-cols-1 md:grid-cols-3 grid-rows-3 gap-6 h-[70vh] md:h-[90vh]">
          {services.map((service, index) => (
            <Link 
              href="/contactanos" 
              key={index} 
              className={cn(
                "relative group rounded-2xl overflow-hidden shadow-lg transform transition-all duration-500 hover:shadow-2xl hover:scale-105",
                service.colSpan
              )}
            >
              <Image
                src={service.imageUrl}
                alt={service.title}
                fill
                className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110"
                data-ai-hint={service.aiHint}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 w-full">
                 <div className="flex justify-between items-end">
                    <div className="text-white">
                      <h3 className="font-headline text-2xl md:text-3xl font-bold text-white shadow-md transition-colors duration-300 group-hover:text-accent">
                        {service.title}
                      </h3>
                      <p className="font-body text-sm text-white/80 mt-2 max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        {service.description}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:rotate-[-90deg]">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </div>
                 </div>
              </div>
            </Link>
          ))}
        </section>

        <section className="text-center py-8">
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
