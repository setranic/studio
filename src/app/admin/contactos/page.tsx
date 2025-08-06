
"use client";

import { useState, useEffect } from 'react';
import { getDocs, collection, query, orderBy, limit, startAfter, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Contacto } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, CalendarDays, User, Settings2, MessageSquare, ListFilter, Loader2, FileDown, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import * as XLSX from 'xlsx';

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

const PAGE_SIZE = 10;

export default function ContactosAdminPage() {
  const [contactos, setContactos] = useState<Contacto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchContactos = async (loadMore = false) => {
    setIsLoading(true);
    try {
      let q = query(
        collection(db, "contactos"), 
        orderBy("submittedAt", "desc"),
        limit(PAGE_SIZE)
      );

      if (loadMore && lastDoc) {
        q = query(
          collection(db, "contactos"), 
          orderBy("submittedAt", "desc"),
          startAfter(lastDoc),
          limit(PAGE_SIZE)
        );
      }

      const querySnapshot = await getDocs(q);
      const fetchedContactos: Contacto[] = [];
      querySnapshot.forEach((doc) => {
        fetchedContactos.push({ id: doc.id, ...doc.data() } as Contacto);
      });

      setContactos(prev => loadMore ? [...prev, ...fetchedContactos] : fetchedContactos);
      
      const newLastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLastDoc(newLastDoc);

      if(querySnapshot.docs.length < PAGE_SIZE){
        setHasMore(false);
      }

    } catch (error) {
      console.error("Error fetching contact messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContactos();
  }, []);

  const handleLoadMore = () => {
    fetchContactos(true);
  }

  const handleExport = () => {
    const dataToExport = contactos.map(c => ({
      Nombre: c.name,
      Email: c.email,
      Telefono: c.phone,
      Servicio: serviceLabels[c.service] || c.service,
      Mensaje: c.message,
      Fecha: c.submittedAt ? format(c.submittedAt.toDate(), "dd MMM, yyyy HH:mm", { locale: es }) : 'N/A'
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Contactos");
    XLSX.writeFile(workbook, "registros_de_contacto.xlsx");
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card className="shadow-xl">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-2xl md:text-3xl font-headline font-bold text-primary flex items-center">
                <Mail className="mr-3 h-7 w-7 md:h-8 md:w-8" /> Mensajes de Contacto
              </CardTitle>
              <CardDescription className="mt-2">
                Revisa, filtra y gestiona los mensajes recibidos.
              </CardDescription>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
               <Button onClick={handleExport} variant="outline">
                 <FileDown className="mr-2 h-4 w-4" /> Exportar a Excel
               </Button>
               <Button asChild>
                  <Link href="/admin">
                      Volver al Panel
                  </Link>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading && contactos.length === 0 ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="ml-4 text-lg font-body">Cargando mensajes...</p>
            </div>
          ) : contactos.length === 0 ? (
            <p className="text-muted-foreground font-body text-center py-10">No hay mensajes de contacto recibidos todavía.</p>
          ) : (
            <>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Contacto</TableHead>
                      <TableHead>Servicio</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Mensaje</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contactos.map((contacto) => (
                      <TableRow key={contacto.id}>
                        <TableCell className="font-medium text-foreground">{contacto.name}</TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <a href={`mailto:${contacto.email}`} className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1.5">
                              <Mail className="h-3 w-3" /> {contacto.email}
                            </a>
                            {contacto.phone && (
                              <a href={`tel:${contacto.phone}`} className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1.5">
                                <Phone className="h-3 w-3" /> {contacto.phone}
                              </a>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{serviceLabels[contacto.service] || contacto.service}</Badge>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {contacto.submittedAt && format(contacto.submittedAt.toDate(), "dd MMM, yyyy", { locale: es })}
                        </TableCell>
                        <TableCell className="text-sm text-foreground/80 max-w-xs truncate" title={contacto.message}>
                          {contacto.message}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {hasMore && (
                <div className="text-center mt-6">
                  <Button onClick={handleLoadMore} disabled={isLoading} variant="outline">
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                    Cargar Más
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
