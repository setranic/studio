
import type { Timestamp } from 'firebase/firestore';

export interface Publicacion {
  id?: string;
  titulo: string;
  subtitulo: string;
  contenido: string;
  imagenPortadaUrl: string;
  imagenCarruselUrl: string;
  createdAt?: string; // Changed from Timestamp to string for serialization
  slug?: string; // Auto-generated or manual
}

export interface Contacto {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  service: "consultoria" | "desarrollo_web" | "marketing_digital" | "otro";
  message: string;
  submittedAt?: Timestamp;
}
