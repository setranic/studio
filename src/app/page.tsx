
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { DoorOpen, Smartphone, Map as MapIcon, MessageSquareHeart, Users, Cloud, Target, TrendingUp, Lightbulb, Package } from 'lucide-react'; 

export default function HomePage() {
  const featuresNew = [
    {
      icon: DoorOpen,
      titleLine1: "(DTD) PUERTA",
      titleLine2: "A PUERTA",
      aiHint: "door delivery",
    },
    {
      icon: Smartphone, 
      titleLine1: "SEGUIMIENTO",
      titleLine2: "EN TIEMPO REAL",
      aiHint: "mobile tracking",
    },
    {
      icon: MapIcon, 
      titleLine1: "COBERTURA",
      titleLine2: "NACIONAL",
      aiHint: "country map",
    },
    {
      icon: MessageSquareHeart,
      titleLine1: "ATENCIÓN",
      titleLine2: "PERSONALIZADA",
      aiHint: "customer support",
    },
  ];

  return (
    <> 
      <div className="fixed top-0 left-0 w-full h-full z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/VIDEO.mp4" type="video/mp4" />
          Tu navegador no soporta el tag de video.
        </video>
      </div>
      <div className="fixed inset-0 bg-black opacity-50 z-[1]"></div> 
      
      <div className="relative z-10 flex flex-col items-center"> 
        <section className="w-full min-h-screen flex items-center justify-center overflow-hidden">
          <div className="container px-4 md:px-6 text-center">
            <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-6">
              Innovación y Estrategia Digital
            </h1>
            <p className="mx-auto max-w-[700px] text-primary-foreground/90 md:text-xl font-body mb-10">
              En Setranic, transformamos tus ideas en realidades digitales. Soluciones creativas y tecnológicas para impulsar tu negocio al siguiente nivel.
            </p>
            <div className="space-x-4">
              <Button asChild size="lg" className="font-body shadow-md hover:shadow-lg transition-shadow duration-300">
                <Link href="/servicios">Nuestros Servicios</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-body border-primary text-primary-foreground hover:bg-primary/10 hover:text-primary hover:shadow-lg transition-shadow duration-300 shadow-md">
                <Link href="/contactanos">Contáctanos</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24 lg:py-28 bg-transparent">
          <div className="container mx-auto px-4 md:px-6">
            <div className="bg-background text-primary p-8 md:p-12 rounded-xl shadow-2xl max-w-4xl mx-auto">
              {/* Title Block */}
              <div className="flex flex-col sm:flex-row justify-center items-start mb-6 sm:mb-8 text-center sm:text-left">
                  <div className="mr-0 sm:mr-6 mb-4 sm:mb-0 self-center sm:self-start">
                      <svg width="70" height="60" viewBox="0 0 70 55" xmlns="http://www.w3.org/2000/svg" className="text-primary/70">
                        <title>Icono Placeholder</title>
                        <rect x="5" y="5" width="60" height="45" rx="5" stroke="currentColor" strokeWidth="4" fill="none" />
                      </svg>
                  </div>
                  <div className="flex-grow">
                      <p className="text-xl md:text-2xl font-headline tracking-wide text-primary/80">POR QUÉ</p>
                      <h2 className="text-5xl md:text-6xl lg:text-7xl font-headline font-bold text-primary leading-none -mt-1 md:-mt-2">ELEGIR</h2>
                      <p className="text-3xl md:text-4xl lg:text-5xl font-headline font-normal text-primary/90">a SETRANIC?</p>
                  </div>
              </div>

              <p className="text-center text-md md:text-lg font-body mb-10 md:mb-12 text-foreground/80">
                Te compartimos algunas de las razones por las que somos tu mejor opción:
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-8 md:gap-y-10">
                {featuresNew.map((feature, index) => (
                  <div key={index} className="flex flex-col items-center text-center text-primary">
                    <feature.icon className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 mb-2 md:mb-3" strokeWidth={1.5} data-ai-hint={feature.aiHint} />
                    <h3 className="text-xs sm:text-sm md:text-base font-headline font-semibold uppercase tracking-wider leading-tight">
                      {feature.titleLine1}
                      <br />
                      {feature.titleLine2}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* New Servicios Section */}
        <section className="w-full py-16 md:py-24 lg:py-28 bg-transparent">
          <div className="container mx-auto px-4 md:px-6">
            <div className="bg-background p-8 md:p-12 rounded-xl shadow-2xl max-w-4xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold text-primary mb-4">
                SERVICIOS
              </h2>
              <div className="flex justify-center mt-4 mb-6">
                <Image 
                  src="/SERVICIOS%20SETRANIC.SVG" 
                  alt="Icono de Servicios Setranic" 
                  width={80} 
                  height={80} 
                  className="h-16 w-16 md:h-20 md:w-20" 
                />
              </div>
              <p className="text-lg text-foreground/80 font-body mb-8 max-w-xl mx-auto">
                Explora la gama de soluciones que ofrecemos para impulsar tu negocio al siguiente nivel.
              </p>
              <Button asChild size="lg" className="font-body shadow-md hover:shadow-lg transition-shadow duration-300">
                <Link href="/servicios">Ver Nuestros Servicios</Link>
              </Button>
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
    </>
  );
}
    
