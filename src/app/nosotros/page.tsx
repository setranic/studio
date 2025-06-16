import Image from 'next/image';

export default function NosotrosPage() {
  return (
    <div className="space-y-12">
      <section className="text-center py-12 bg-gradient-to-b from-rose-50 to-background rounded-lg shadow-sm">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">Sobre Nosotros</h1>
        <p className="text-lg md:text-xl text-foreground max-w-2xl mx-auto font-body">
          Somos un equipo apasionado por la tecnología y la innovación, dedicados a transformar ideas en soluciones digitales de impacto.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-headline font-semibold text-primary mb-6">Nuestra Misión</h2>
          <p className="text-foreground/90 font-body mb-4 leading-relaxed">
            Nuestra misión es empoderar a empresas y emprendedores mediante el uso estratégico de la tecnología, ofreciendo soluciones personalizadas que impulsen su crecimiento y eficiencia. Creemos en la colaboración, la transparencia y la excelencia en cada proyecto que emprendemos.
          </p>
          <p className="text-foreground/90 font-body leading-relaxed">
            Nos esforzamos por mantenernos a la vanguardia de las últimas tendencias digitales para ofrecer a nuestros clientes servicios innovadores y de alta calidad que superen sus expectativas.
          </p>
        </div>
        <div className="rounded-xl overflow-hidden shadow-xl">
          <Image 
            src="https://placehold.co/600x400.png" 
            alt="Equipo de Setranic" 
            width={600} 
            height={400} 
            className="object-cover w-full h-full"
            data-ai-hint="team collaboration" 
          />
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-headline font-semibold text-primary mb-8 text-center">Nuestros Valores</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Innovación", description: "Buscamos constantemente nuevas formas de resolver problemas y mejorar procesos." },
            { title: "Compromiso", description: "Nos dedicamos por completo a cada proyecto, asegurando la satisfacción del cliente." },
            { title: "Excelencia", description: "Nos esforzamos por la más alta calidad en todo lo que hacemos." },
            { title: "Colaboración", description: "Trabajamos de cerca con nuestros clientes para lograr los mejores resultados." },
            { title: "Transparencia", description: "Mantenemos una comunicación abierta y honesta en todas las etapas." },
            { title: "Adaptabilidad", description: "Somos flexibles y nos adaptamos a las necesidades cambiantes del mercado." },
          ].map((value) => (
            <div key={value.title} className="p-6 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-headline font-semibold text-accent mb-2">{value.title}</h3>
              <p className="text-muted-foreground font-body">{value.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
