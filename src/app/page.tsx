
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { DoorOpen, Smartphone, Map as MapIcon, MessageSquareHeart } from 'lucide-react';
import { getPublicaciones } from '@/app/admin/publicaciones/actions';
import PostCard from '@/components/common/PostCard';

export default async function HomePage() {
  const allPosts = await getPublicaciones();
  const recentPosts = allPosts.slice(0, 3);

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
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
          <div className="container px-4 md:px-6 text-center flex flex-col items-center">
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
                <Link href="/servicios" className="group block" aria-label="Nuestros Servicios">
                  <Image 
                    src="/1.png" 
                    alt="Botón de Servicios" 
                    width={200} 
                    height={150} 
                    className="w-full h-auto rounded-lg shadow-lg transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl"
                    data-ai-hint="service icon"
                  />
                </Link>
                <Link href="/updates" className="group block" aria-label="Últimas Noticias">
                  <Image 
                    src="/2.png" 
                    alt="Botón de Noticias" 
                    width={200} 
                    height={150} 
                    className="w-full h-auto rounded-lg shadow-lg transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl"
                    data-ai-hint="news icon"
                  />
                </Link>
                <Link href="/contactanos" className="group block" aria-label="Contáctanos">
                  <Image 
                    src="/3.png" 
                    alt="Botón de Contacto" 
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

        <section className="w-full py-16 md:py-24 lg:py-28 bg-transparent">
          <div className="container mx-auto px-4 md:px-6">
            <div className="bg-background text-primary rounded-xl shadow-2xl max-w-4xl mx-auto">
              <div className="px-8 md:px-12 pt-8">
                  <Image
                      src="/namesetranicwhyus3.svg"
                      alt="Por qué elegir Setranic"
                      width={400}
                      height={342}
                  />
              </div>
              <div className="px-8 md:px-12 pt-4 pb-8">
                <p className="text-left text-md md:text-lg font-body mb-10 md:mb-12 text-foreground/80">
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
                  src="/SERVSETIcon.svg"
                  alt="Icono Servicios Setranic"
                  width={500}
                  height={500}
                  className="w-[500px] h-[500px]"
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

        {/* Updates Section */}
        <section className="w-full py-16 md:py-24 lg:py-28 bg-transparent">
          <div className="container mx-auto px-4 md:px-6">
            <div className="bg-background p-8 md:p-12 rounded-xl shadow-2xl max-w-6xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold text-primary mb-4">
                Últimas Noticias
              </h2>
              <p className="text-lg text-foreground/80 font-body mb-12 max-w-xl mx-auto">
                Mantente al día con nuestras últimas actualizaciones y noticias del sector.
              </p>
              
              {recentPosts.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {recentPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground font-body mb-12">No hay noticias recientes.</p>
              )}

              <Button asChild size="lg" className="font-body shadow-md hover:shadow-lg transition-shadow duration-300">
                <Link href="/updates">Ver Todas las Noticias</Link>
              </Button>
            </div>
          </div>
        </section>


        <section className="w-full py-12 md:py-24 lg:py-32 bg-background rounded-xl shadow-inner">
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
    
