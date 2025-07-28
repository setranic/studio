
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { DoorOpen, Smartphone, Map as MapIcon, MessageSquareHeart, Loader2, ArrowRight } from 'lucide-react';
import { getPublicaciones } from '@/lib/data';
import PostCard from '@/components/common/PostCard';
import type { Publicacion } from '@/types';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import QuickContactForm from '@/components/forms/quick-contact-form';

const featuresNew = [
    {
      imageUrl: "/whyus/1.svg",
      titleLine1: "(DTD) PUERTA",
      titleLine2: "A PUERTA",
      aiHint: "door delivery",
    },
    {
      imageUrl: "/whyus/2.svg",
      titleLine1: "SEGUIMIENTO",
      titleLine2: "EN TIEMPO REAL",
      aiHint: "mobile tracking",
    },
    {
      imageUrl: "/whyus/3.svg",
      titleLine1: "COBERTURA",
      titleLine2: "NACIONAL",
      aiHint: "country map",
    },
    {
      imageUrl: "/whyus/4.svg",
      titleLine1: "ATENCIÓN",
      titleLine2: "PERSONALIZADA",
      aiHint: "customer support",
    },
  ];

function PostsWrapper() {
  const [posts, setPosts] = useState<Publicacion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      const allPosts = await getPublicaciones();
      const recentPosts = allPosts.slice(0, 3);
      setPosts(recentPosts);
      setIsLoading(false);
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-3 font-body">Cargando noticias...</p>
      </div>
    );
  }
  
  return (
    <>
      {posts.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground font-body mb-12">No hay noticias recientes.</p>
      )}
    </>
  )
}

const services = [
  {
    title: "TRANSPORTE DE CARGA",
    imageUrl: "https://placehold.co/1200x600.png",
    aiHint: "cargo truck",
    colSpan: "col-span-2",
  },
  {
    title: "RASTREO DE MEDIOS EN TIEMPO REAL",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "satellite tracking",
    colSpan: "col-span-1",
  },
  {
    title: "CARGA Y DESCARGA DE MERCANCÍAS",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "forklift loading",
    colSpan: "col-span-1",
  },
  {
    title: "SEGURO DE MERCANCÍAS",
    imageUrl: "https://placehold.co/1200x600.png",
    aiHint: "insurance document",
    colSpan: "col-span-2",
  },
];


export default function HomePage() {

  return (
    <div className="w-full">
      {/* Section 1: Hero with Video Background */}
      <section className="relative w-full flex flex-col justify-center items-center overflow-hidden min-h-screen text-white">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
           <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/homesetranic1.mp4" type="video/mp4" />
            Tu navegador no soporta el tag de video.
          </video>
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/70 to-black/30"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 container px-4 md:px-6 text-center flex flex-col items-center h-full">
           <Image
            src="/logostnblanconuew.svg?v=2"
            alt="Logo Setranic"
            width={200}
            height={75}
            className="mb-8"
          />
          <div className="bg-black/20 backdrop-blur-sm rounded-xl py-4 px-6 mb-6 border border-white/10">
            <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              ESTRATEGIAS SIN LIMITES
            </h1>
          </div>
          <p className="mx-auto max-w-[700px] text-primary-foreground/90 md:text-xl font-body mb-10">
            Somos una empresa Nicaragüense de logística y transporte. Con amplia experiencia en la gestión de mercancías.
          </p>
          <div className="mx-auto w-full max-w-[200px] md:max-w-lg px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <Link href="https://www.instagram.com/setranic/" target="_blank" rel="noopener noreferrer" className="group block" aria-label="Nuestro Instagram">
                <Image 
                  src="/1.png" 
                  alt="Botón de Instagram" 
                  width={200} 
                  height={150} 
                  className="w-full h-auto rounded-lg shadow-lg transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl"
                  data-ai-hint="service icon"
                />
              </Link>
              <Link href="mailto:info@setranic.com" className="group block" aria-label="Enviar un correo">
                <Image 
                  src="/2.png" 
                  alt="Botón de Correo" 
                  width={200} 
                  height={150} 
                  className="w-full h-auto rounded-lg shadow-lg transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl"
                  data-ai-hint="news icon"
                />
              </Link>
              <Link href="https://www.facebook.com/Setranic/" target="_blank" rel="noopener noreferrer" className="group block" aria-label="Nuestro Facebook">
                <Image 
                  src="/3.png" 
                  alt="Botón de Facebook" 
                  width={200} 
                  height={150} 
                  className="w-full h-auto rounded-lg shadow-lg transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl"
                  data-ai-hint="contact icon"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: About Us Teaser */}
      <section className="relative w-full flex items-center overflow-hidden text-white py-24">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/nosotros/video/nosotrosstn.mp4" type="video/mp4" />
            Tu navegador no soporta el tag de video.
          </video>
          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 md:px-6">
           <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Left Side: SVG Card */}
                <div className="flex justify-center">
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

                {/* Right Side: Quick Contact Form */}
                <div className="flex flex-col items-center text-center bg-black/30 backdrop-blur-md p-8 rounded-2xl border border-white/20">
                     <Image
                        src="/logostnblanconuew.svg?v=2"
                        alt="Logo Setranic"
                        width={120}
                        height={45}
                        className="mb-4"
                      />
                    <Button asChild className="mb-6 bg-primary/80 hover:bg-primary text-primary-foreground font-body shadow-lg border border-white/20">
                      <Link href="/nosotros">Conocer Más</Link>
                    </Button>
                    
                    <QuickContactForm />
                </div>
            </div>
        </div>
      </section>

      {/* Section 3: Why Choose Us */}
      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-card text-primary rounded-xl shadow-2xl max-w-6xl mx-auto">
            <div className="px-6 md:px-16 py-12">
                <Image
                    src="/namesetranicwhyus3.svg"
                    alt="Por qué elegir Setranic"
                    width={350}
                    height={70}
                    className="w-auto h-auto"
                />
            </div>
            <div className="px-6 md:px-16 pt-4 pb-16">
              <p className="text-left font-body mb-10 text-foreground/80 max-w-2xl text-base">
                Te compartimos algunas de las razones por las que somos tu mejor opción:
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-16">
                {featuresNew.map((feature, index) => (
                  <div key={index} className="flex flex-col items-center text-center text-primary">
                    <Image
                      src={feature.imageUrl}
                      alt={feature.titleLine1 + ' ' + feature.titleLine2}
                      width={100}
                      height={100}
                      className="h-28 w-auto mb-6"
                      data-ai-hint={feature.aiHint}
                    />
                    <h3 className="text-xl font-bold uppercase tracking-wider leading-tight">
                      {feature.titleLine1}
                      <br />
                      {feature.titleLine2}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Services */}
      <section className="w-full py-16 md:py-24 lg:py-28 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold text-primary mb-4">
              SERVICIOS
            </h2>
            <p className="text-lg text-foreground/80 font-body mb-12 max-w-xl mx-auto">
              Explora la gama de soluciones que ofrecemos para impulsar tu negocio al siguiente nivel.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              {services.map((service, index) => (
                <Link 
                  href="/servicios" 
                  key={index} 
                  className={cn(
                    "relative group rounded-2xl overflow-hidden shadow-lg h-64",
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 text-left">
                    <h3 className="font-headline text-2xl font-bold text-white shadow-md">
                      {service.title}
                    </h3>
                  </div>
                   <div className="absolute top-4 right-4 text-white">
                      <Image
                        src="/logostnblanconuew.svg"
                        alt="Setranic"
                        width={40}
                        height={40}
                       />
                  </div>
                  <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110 group-hover:bg-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>

            <Button asChild size="lg" className="mt-12 font-body shadow-md hover:shadow-lg transition-shadow duration-300">
              <Link href="/servicios">Ver Todos Nuestros Servicios</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Section 5: Updates */}
      <section className="w-full py-16 md:py-24 lg:py-28 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-card p-8 md:p-12 rounded-xl shadow-2xl max-w-6xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold text-primary mb-4">
              Últimas Noticias
            </h2>
            <p className="text-lg text-foreground/80 font-body mb-12 max-w-xl mx-auto">
              Mantente al día con nuestras últimas actualizaciones y noticias del sector.
            </p>
            
            <PostsWrapper />

            <Button asChild size="lg" className="font-body shadow-md hover:shadow-lg transition-shadow duration-300">
              <Link href="/updates">Ver Todas las Noticias</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Section 6: CTA */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-card rounded-t-xl shadow-inner">
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
