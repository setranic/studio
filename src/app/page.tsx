
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
      icon: Smartphone, // Consider adding a MapPin icon visually if desired
      titleLine1: "SEGUIMIENTO",
      titleLine2: "EN TIEMPO REAL",
      aiHint: "mobile tracking",
    },
    {
      icon: MapIcon, // Placeholder for Nicaragua Map SVG
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
    <> {/* Usamos Fragment para no añadir un div extra innecesario */}
      {/* Video y Overlay de Fondo Fijo */}
      <div className="fixed top-0 left-0 w-full h-full z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          {/* Asumiendo que el video se llama VIDEO.mp4 en la carpeta public. Ajusta el nombre y tipo si es diferente. */}
          <source src="/VIDEO.mp4" type="video/mp4" />
          {/* Puedes agregar más <source> para otros formatos como webm para mayor compatibilidad */}
          {/* <source src="/VIDEO.webm" type="video/webm" /> */}
          Tu navegador no soporta el tag de video.
        </video>
      </div>
      <div className="fixed inset-0 bg-black opacity-50 z-[1]"></div> {/* Overlay encima del video (z-1), detrás del contenido (z-10) */}
      
      {/* Contenedor principal para todo el contenido de la página que debe estar sobre el video */}
      <div className="relative z-10 flex flex-col items-center"> 
        {/* Hero Content Section */}
        {/* Esta sección sigue ocupando min-h-screen para el espaciado y centrado del texto, pero su "fondo" visual es el video fijo */}
        <section className="w-full min-h-screen flex items-center justify-center overflow-hidden">
          {/* Contenido del Hero Section */}
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

        {/* Sección "Por qué Elegir Setranic?" - Rediseñada */}
        <section className="w-full py-16 md:py-24 lg:py-28 bg-primary">
          <div className="container mx-auto px-4 md:px-6">
            <div className="bg-background text-primary p-8 md:p-12 rounded-xl shadow-2xl max-w-4xl mx-auto">
              {/* Title Block */}
              <div className="flex flex-col sm:flex-row justify-center items-start mb-6 sm:mb-8 text-center sm:text-left">
                  <div className="mr-0 sm:mr-6 mb-4 sm:mb-0 self-center sm:self-start">
                      {/* Placeholder SVG for question mark bubbles. Replace with your actual SVG. */}
                      <svg width="70" height="60" viewBox="0 0 70 55" xmlns="http://www.w3.org/2000/svg" className="fill-current text-primary/70">
                          <title>Icono de preguntas</title>
                          <path d="M15 5C9.477 5 5 9.477 5 15V25C5 30.523 9.477 35 15 35H17L23 43V35H30C35.523 35 40 30.523 40 25V15C40 9.477 35.523 5 30 5H15Z" />
                          <text x="18" y="24.5" font-size="17" fontWeight="bold" fill="var(--primary-foreground)">?</text>
                          <path d="M35 15C29.477 15 25 19.477 25 25V35C25 40.523 29.477 45 35 45H37L43 53V45H50C55.523 45 60 40.523 60 35V25C60 19.477 55.523 15 50 15H35Z" transform="translate(12, -10)" opacity="1" />
                          <text x="43" y="34.5" font-size="17" fontWeight="bold" fill="var(--primary-foreground)" transform="translate(12, -10)">?</text>
                          <path d="M25 25C19.477 25 15 29.477 15 35V45C15 50.523 19.477 55 25 55H27L33 63V55H40C45.523 55 50 50.523 50 45V35C50 29.477 45.523 25 40 25H25Z" transform="translate(-5, -20)" opacity="0.5" />
                          <text x="28" y="44.5" font-size="17" fontWeight="bold" fill="var(--primary-foreground)" transform="translate(-5, -20)">?</text>
                      </svg>
                  </div>
                  <div className="flex-grow">
                      <p className="text-xl md:text-2xl font-body tracking-wide text-primary/80">POR QUÉ</p>
                      <h2 className="text-5xl md:text-6xl lg:text-7xl font-headline font-bold text-primary leading-none -mt-1 md:-mt-2">ELEGIR</h2>
                      <p className="text-3xl md:text-4xl lg:text-5xl font-headline font-normal text-primary/90">a SETRANIC?</p>
                  </div>
              </div>

              {/* Subtitle */}
              <p className="text-center text-md md:text-lg font-body mb-10 md:mb-12 text-foreground/80">
                Te compartimos algunas de las razones por las que somos tu mejor opción:
              </p>

              {/* Features Grid */}
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


        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50 dark:bg-muted/20 rounded-xl shadow-inner"> {/* Esta sección ya tiene su propio fondo */}
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
    
