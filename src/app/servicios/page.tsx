import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

const services = [
  {
    title: "Consultoría Estratégica Digital",
    description: "Analizamos tu negocio y te ayudamos a definir una hoja de ruta digital para alcanzar tus objetivos. Desde la optimización de procesos hasta la identificación de nuevas oportunidades.",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "business meeting",
    features: ["Análisis de mercado", "Estrategia de transformación digital", "Optimización de ROI digital"]
  },
  {
    title: "Desarrollo Web y Aplicaciones",
    description: "Creamos sitios web modernos, responsivos y aplicaciones móviles a medida que reflejan la identidad de tu marca y ofrecen una experiencia de usuario excepcional.",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "web development",
    features: ["Diseño UI/UX personalizado", "Desarrollo front-end y back-end", "E-commerce y plataformas web"]
  },
  {
    title: "Marketing Digital Integral",
    description: "Impulsamos tu presencia online a través de estrategias de marketing digital efectivas, incluyendo SEO, SEM, marketing de contenidos y gestión de redes sociales.",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "digital marketing",
    features: ["Optimización SEO", "Campañas de publicidad online (SEM)", "Gestión de redes sociales y contenido"]
  },
   {
    title: "Análisis de Datos e Inteligencia de Negocio",
    description: "Transformamos tus datos en información valiosa para la toma de decisiones. Implementamos dashboards y reportes que te permiten entender mejor tu negocio y clientes.",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "data analytics",
    features: ["Visualización de datos", "Implementación de BI", "Análisis predictivo"]
  }
];

export default function ServiciosPage() {
  return (
    <div className="space-y-16">
      <section className="text-center py-12 bg-gradient-to-b from-rose-50 to-background rounded-lg shadow-sm">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">Nuestros Servicios</h1>
        <p className="text-lg md:text-xl text-foreground max-w-2xl mx-auto font-body">
          Ofrecemos una gama completa de soluciones digitales diseñadas para potenciar tu marca y optimizar tus operaciones.
        </p>
      </section>

      {services.map((service, index) => (
        <section key={service.title} className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 !== 0 ? 'md:grid-flow-row-dense md:[&>*:last-child]:col-start-1' : ''}`}>
          <div className="rounded-xl overflow-hidden shadow-xl group">
            <Image 
              src={service.imageUrl}
              alt={service.title}
              width={600} 
              height={400} 
              className="object-cover w-full h-auto transform transition-transform duration-500 group-hover:scale-105"
              data-ai-hint={service.aiHint}
            />
          </div>
          <div>
            <h2 className="text-3xl font-headline font-semibold text-primary mb-6">{service.title}</h2>
            <p className="text-foreground/90 font-body mb-6 leading-relaxed">
              {service.description}
            </p>
            <ul className="space-y-2 mb-8">
              {service.features.map(feature => (
                <li key={feature} className="flex items-center font-body text-foreground/80">
                  <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button asChild className="font-body shadow-md hover:shadow-lg transition-shadow duration-300">
              <Link href="/contactanos">Más Información</Link>
            </Button>
          </div>
        </section>
      ))}
    </div>
  );
}
