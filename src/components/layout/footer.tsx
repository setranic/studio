import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-20 border-t border-border/40">
      {/* Main Footer */}
      <div className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About Section */}
            <div className="md:col-span-1 space-y-4">
              <Image 
                src="/logostnblanconuew.svg" 
                alt="Setranic Logo" 
                width={150} 
                height={50} 
                className="mb-2"
              />
              <p className="text-sm font-body">
                Somos una empresa Nicaragüense de logística y transporte con amplia experiencia en la gestión de mercancías a nivel nacional e internacional.
              </p>
            </div>
            
            {/* Links Section */}
            <div>
              <h3 className="font-headline text-lg font-semibold text-white mb-4">Enlaces</h3>
              <ul className="space-y-2 font-body">
                <li><Link href="/servicios" className="hover:text-white transition-colors">Servicios</Link></li>
                <li><Link href="/nosotros" className="hover:text-white transition-colors">Nosotros</Link></li>
                <li><Link href="/updates" className="hover:text-white transition-colors">Updates</Link></li>
                <li><Link href="/contactanos" className="hover:text-white transition-colors">Contáctanos</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-headline text-lg font-semibold text-white mb-4">Contacto</h3>
              <ul className="space-y-3 font-body text-sm">
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 mt-1 flex-shrink-0 text-accent" />
                  <span>Nicaragua, Managua - Rubenia</span>
                </li>
                <li className="flex items-start">
                  <Mail className="h-5 w-5 mr-3 mt-1 flex-shrink-0 text-accent" />
                  <a href="mailto:info@setranic.com" className="hover:text-white transition-colors">info@setranic.com</a>
                </li>
                <li className="flex items-start">
                  <Phone className="h-5 w-5 mr-3 mt-1 flex-shrink-0 text-accent" />
                  <a href="tel:+50575301222" className="hover:text-white transition-colors">+(505) 7530-1222</a>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="font-headline text-lg font-semibold text-white mb-4">Síguenos</h3>
              <div className="flex items-center gap-4">
                <Link 
                  href="https://www.instagram.com/setranic/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram de Setranic"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Instagram className="h-6 w-6" />
                </Link>
                <Link 
                  href="https://www.facebook.com/Setranic/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook de Setranic"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Facebook className="h-6 w-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-muted text-muted-foreground py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-2">
          <p className="text-sm font-body">
            Stvaer &copy; 2025 <em>for</em> SETRANIC. Todos los derechos reservados.
          </p>
          <Link 
            href="/politica-de-privacidad" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-sm underline hover:text-primary transition-colors font-body"
          >
            Política de Privacidad
          </Link>
        </div>
      </div>
    </footer>
  );
}
