
"use server";

import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, serverTimestamp, query, orderBy, doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import type { Publicacion } from "@/types";
import { z } from "zod";

const publicacionSchema = z.object({
  titulo: z.string().min(3, "El título es requerido."),
  subtitulo: z.string().min(3, "El subtítulo es requerido."),
  contenido: z.string().min(10, "El contenido es muy corto."),
  imagenPortadaUrl: z.string().startsWith("/", { message: "La URL de la imagen de portada debe ser una ruta relativa (ej: /publicaciones/imagen.jpg)"}),
  imagenCarruselUrl: z.string().startsWith("/", { message: "La URL de la imagen de carrusel debe ser una ruta relativa (ej: /publicaciones/imagen-thumb.jpg)"}),
  slug: z.string().optional(),
});

export async function addPublicacion(data: Omit<Publicacion, "id" | "createdAt">) {
  const validatedFields = publicacionSchema.safeParse(data);
  if (!validatedFields.success) {
    return { success: false, error: validatedFields.error.flatten().fieldErrors };
  }

  try {
    const publicacionData = {
      ...validatedFields.data,
      slug: validatedFields.data.slug || validatedFields.data.titulo.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
      createdAt: serverTimestamp(),
    };
    const docRef = await addDoc(collection(db, "publicaciones"), publicacionData);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding document: ", error);
    return { success: false, error: "Error al guardar la publicación." };
  }
}

export async function getPublicaciones(): Promise<Publicacion[]> {
  try {
    const q = query(collection(db, "publicaciones"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const publicaciones: Publicacion[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      publicaciones.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate().toISOString(),
      } as Publicacion);
    });
    return publicaciones;
  } catch (error) {
    console.error("Error fetching publicaciones: ", error);
    return [];
  }
}

export async function getPublicacionById(id: string): Promise<Publicacion | null> {
  try {
    const docRef = doc(db, "publicaciones", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return { 
        id: docSnap.id, 
        ...data,
        createdAt: data.createdAt?.toDate().toISOString(),
      } as Publicacion;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching publicacion by ID: ", error);
    return null;
  }
}

export async function updatePublicacion(id: string, data: Partial<Publicacion>) {
   const validatedFields = publicacionSchema.partial().safeParse(data);
   if (!validatedFields.success) {
    return { success: false, error: validatedFields.error.flatten().fieldErrors };
  }
  try {
    const docRef = doc(db, "publicaciones", id);
    await updateDoc(docRef, validatedFields.data);
    return { success: true };
  } catch (error) {
    console.error("Error updating document: ", error);
    return { success: false, error: "Error al actualizar la publicación." };
  }
}

export async function deletePublicacion(id: string) {
  try {
    const docRef = doc(db, "publicaciones", id);
    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    console.error("Error deleting document: ", error);
    return { success: false, error: "Error al eliminar la publicación." };
  }
}
