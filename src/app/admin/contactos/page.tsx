
"use client";

import { useState, useEffect } from 'react';
import { getDocs, collection, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Contacto } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, CalendarDays, User, Settings2, MessageSquare, ListFilter, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const serviceLabels: Record<Contacto["service"], string> = {
  transporte_carga: "TRANSPORTE DE CARGA",
  transporte_local: "TRANSPORTE LOCAL",
  distribucion: "DISTRIBUCION",
  agencia_aduanera: "AGENCIA ADUANERA",
  almacen_fiscal: "ALMACEN FISCAL",
  rastreo_medios: "RASTREO DE MEDIOS",
  seguro_carga: "SEGURO DE CARGA",
  otro: "Otro"
};

export default function ContactosAdminPage() {
  const [contactos, setContactos] = useState<Contacto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContactos = async () => {
      setIsLoading(true);
      try {
        const q = query(collection(db, "contactos"), orderBy("submittedAt", "desc"));
        const querySnapshot = await getDocs(q);
        const fetchedContactos: Contacto[] = [];
        querySnapshot.forEach((doc) => {
          fetchedContactos.push({ id: doc.id, ...doc.data() } as Contacto);
        });
        setContactos(fetchedContactos);
      } catch (error) {
        console.error("Error fetching contact messages:", error);
        // Optionally show a toast error
      } finally {
        setIsLoading(false);
      }
    };

    fetchContactos();
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        <section className="bg-card p-6 md:p-8 rounded-xl shadow-xl">
          <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl md:text-3xl font-headline font-bold text-primary flex items-center">
                  <Mail className="mr-3 h-7 w-7 md:h-8 md:w-8" /> Mensajes de Contacto Recibidos
              </h1>
              <Button variant="outline" asChild>
                  <Link href="/admin">
                      Volver al Panel
                  </Link>
              </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="ml-4 text-lg font-body">Cargando mensajes...</p>
            </div>
          ) : contactos.length === 0 ? (
            <p className="text-muted-foreground font-body text-center py-10">No hay mensajes de contacto recibidos todavía.</p>
          ) : (
            <div className="space-y-6">
              {contactos.map((contacto) => (
                <Card key={contacto.id} className="shadow-md">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                      <CardTitle className="font-headline text-xl text-primary flex items-center">
                        <User className="mr-2 h-5 w-5" /> {contacto.name}
                      </CardTitle>
                      {contacto.submittedAt && (
                        <Badge variant="outline" className="text-xs font-body whitespace-nowrap">
                          <CalendarDays className="mr-1.5 h-3 w-3" />
                          Recibido: {format(contacto.submittedAt.toDate(), "dd MMM, yyyy HH:mm", { locale: es })}
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="font-body pt-1">
                      <a href={`mailto:${contacto.email}`} className="text-accent hover:underline flex items-center">
                        <Mail className="mr-2 h-4 w-4" /> {contacto.email}
                      </a>
                      {contacto.phone && (
                        <a href={`tel:${contacto.phone}`} className="text-accent hover:underline flex items-center mt-1">
                          <Phone className="mr-2 h-4 w-4" /> {contacto.phone}
                        </a>
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h4 className="font-body font-semibold text-foreground flex items-center mb-1">
                        <Settings2 className="mr-2 h-4 w-4 text-accent" /> Servicio de Interés:
                      </h4>
                      <Badge variant="secondary" className="font-body">{serviceLabels[contacto.service] || contacto.service}</Badge>
                    </div>
                    <div>
                      <h4 className="font-body font-semibold text-foreground flex items-center mb-1">
                        <MessageSquare className="mr-2 h-4 w-4 text-accent" /> Mensaje:
                      </h4>
                      <p className="text-foreground/90 font-body bg-muted/50 p-3 rounded-md whitespace-pre-wrap text-sm">
                        {contacto.message}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
