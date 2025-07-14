
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
  service: "transporte_carga" | "transporte_local" | "distribucion" | "agencia_aduanera" | "almacen_fiscal" | "rastreo_medios" | "seguro_carga" | "otro";
  message: string;
  submittedAt?: Timestamp;
}
