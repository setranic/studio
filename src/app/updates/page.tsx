import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const blogPosts = [
  {
    id: 1,
    title: "Las Últimas Tendencias en Desarrollo Web para 2024",
    date: "20 Julio, 2024",
    category: "Desarrollo Web",
    excerpt: "Descubre las tecnologías y enfoques que están definiendo el futuro del desarrollo web este año.",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "web design trends"
  },
  {
    id: 2,
    title: "Cómo el Marketing de Contenidos Puede Transformar tu Negocio",
    date: "15 Julio, 2024",
    category: "Marketing Digital",
    excerpt: "Exploramos estrategias efectivas de marketing de contenidos para atraer y fidelizar clientes.",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "content marketing"
  },
  {
    id: 3,
    title: "La Importancia de la Experiencia de Usuario (UX) en el Éxito Digital",
    date: "10 Julio, 2024",
    category: "Diseño UX/UI",
    excerpt: "Un buen diseño UX no es un lujo, es una necesidad. Aprende por qué y cómo mejorarlo.",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "user experience"
  },
];

export default function UpdatesPage() {
  return (
    <div className="space-y-12">
      <section className="text-center py-12 bg-gradient-to-b from-rose-50 to-background rounded-lg shadow-sm">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">Updates y Noticias</h1>
        <p className="text-lg md:text-xl text-foreground max-w-2xl mx-auto font-body">
          Mantente al día con las últimas novedades, tendencias y consejos del mundo digital.
        </p>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <article key={post.id} className="bg-card rounded-xl shadow-lg overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl">
            <div className="relative">
              <Image 
                src={post.imageUrl}
                alt={post.title}
                width={600} 
                height={400} 
                className="object-cover w-full h-48 transform transition-transform duration-500 group-hover:scale-105"
                data-ai-hint={post.aiHint}
              />
              <Badge variant="default" className="absolute top-4 right-4 bg-primary text-primary-foreground">{post.category}</Badge>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-xl font-headline font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                <Link href={`/updates/${post.id}`}>{post.title}</Link>
              </h2>
              <p className="text-sm text-muted-foreground font-body mb-1">{post.date}</p>
              <p className="text-foreground/80 font-body mb-4 leading-relaxed flex-grow">{post.excerpt}</p>
              <Button asChild variant="link" className="mt-auto self-start p-0 text-primary hover:text-accent font-body">
                <Link href={`/updates/${post.id}`}>Leer Más &rarr;</Link>
              </Button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
