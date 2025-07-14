import ContactForm from '@/components/forms/contact-form';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactanosPage() {
  return (
    <div className="space-y-12">
      <section className="text-center py-12 bg-gradient-to-b from-rose-50 to-background rounded-lg shadow-sm">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">Contáctanos</h1>
        <p className="text-lg md:text-xl text-foreground max-w-2xl mx-auto font-body">
          Estamos listos para ayudarte. Completa el formulario o utiliza nuestros datos de contacto.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-12 items-start">
        <div className="bg-card p-8 rounded-xl shadow-xl">
          <h2 className="text-2xl font-headline font-semibold text-primary mb-6">Envíanos un Mensaje</h2>
          <ContactForm />
        </div>
        
        <div className="space-y-8">
          <div className="bg-card p-8 rounded-xl shadow-xl">
            <h2 className="text-2xl font-headline font-semibold text-primary mb-6">Información de Contacto</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-body font-semibold text-foreground">Email</h3>
                  <a href="mailto:info@setranic.com" className="text-muted-foreground hover:text-primary transition-colors font-body">info@setranic.com</a>
                </div>
              </li>
              <li className="flex items-start">
                <Phone className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-body font-semibold text-foreground">Teléfono</h3>
                  <a href="tel:+50575301222" className="text-muted-foreground hover:text-primary transition-colors font-body">+(505) 7530-1222</a>
                </div>
              </li>
              <li className="flex items-start">
                <MapPin className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-body font-semibold text-foreground">Oficina</h3>
                  <p className="text-muted-foreground font-body">Nicaragua, Managua - Rubenia</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="bg-card p-8 rounded-xl shadow-xl h-64 md:h-80">
             <h2 className="text-2xl font-headline font-semibold text-primary mb-6">Nuestra Ubicación</h2>
            {/* Placeholder for map. In a real app, use @vis.gl/react-google-maps or an iframe */}
            <div className="w-full h-full bg-muted rounded-md flex items-center justify-center">
              <p className="text-muted-foreground font-body italic">Mapa embebido aquí</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
