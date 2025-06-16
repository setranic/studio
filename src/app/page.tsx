
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Package, Cloud, Target, TrendingUp, Lightbulb, Users } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section con Video de Fondo */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          {/* Asumiendo que el video se llama VIDEO.mp4 en la carpeta public. Ajusta el nombre y tipo si es diferente. */}
          <source src="/VIDEO.mp4" type="video/mp4" />
          {/* Puedes agregar más <source> para otros formatos como webm para mayor compatibilidad */}
          {/* <source src="/VIDEO.webm" type="video/webm" /> */}
          Tu navegador no soporta el tag de video.
        </video>
        {/* Overlay semitransparente para mejorar legibilidad del texto */}
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        
        {/* Contenido del Hero Section */}
        <div className="relative z-20 container px-4 md:px-6 text-center py-12 md:py-24 lg:py-32">
          <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-6">
            Innovación y Estrategia Digital
          </h1>
          <p className="mx-auto max-w-[700px] text-primary-foreground/90 md:text-xl font-body mb-10"> {/* Cambiado text-foreground/80 a text-primary-foreground/90 para mejor contraste sobre video */}
            En Setranic, transformamos tus ideas en realidades digitales. Soluciones creativas y tecnológicas para impulsar tu negocio al siguiente nivel.
          </p>
          <div className="space-x-4">
            <Button asChild size="lg" className="font-body shadow-md hover:shadow-lg transition-shadow duration-300">
              <Link href="/servicios">Nuestros Servicios</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-body border-primary text-primary-foreground hover:bg-primary/10 hover:shadow-lg transition-shadow duration-300 shadow-md hover:text-primary">
              <Link href="/contactanos">Contáctanos</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-headline font-semibold tracking-tighter text-center text-primary mb-12 sm:text-4xl">
            ¿Por qué Elegir Setranic?
          </h2>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-12">
            {[
              { icon: Lightbulb, title: "Soluciones a Medida", description: "Creamos estrategias y herramientas específicas adaptadas a tus necesidades únicas." },
              { icon: TrendingUp, title: "Innovación Constante", description: "Nos mantenemos a la vanguardia con las últimas tecnologías y tendencias del mercado." },
              { icon: Target, title: "Resultados Comprobados", description: "Nos enfocamos en métricas y resultados tangibles para asegurar tu crecimiento." },
              { icon: Users, title: "Equipo Experto", description: "Contamos con profesionales apasionados y dedicados a tu éxito." },
              { icon: Cloud, title: "Tecnología de Punta", description: "Utilizamos las herramientas más avanzadas para ofrecerte lo mejor." },
              { icon: Package, title: "Soporte Integral", description: "Te acompañamos en cada paso del proceso, brindando soporte continuo." },
            ].map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6 bg-card rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                <div className="mb-4 rounded-full bg-primary/10 p-3 inline-flex">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-headline font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground font-body">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50 dark:bg-muted/20 rounded-xl shadow-inner">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-headline font-semibold tracking-tighter text-primary sm:text-4xl md:text-5xl">
              Listos para Empezar?
            </h2>
            <p className="mx-auto max-w-[600px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-body">
              Contáctanos hoy mismo y descubre cómo podemos ayudarte a alcanzar tus objetivos digitales.
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm space-y-2">
             <Button asChild size="lg" className="w-full font-body shadow-md hover:shadow-lg transition-shadow duration-300">
              <Link href="/contactanos">Solicitar Consulta</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
