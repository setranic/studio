"use client";

import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, doc, updateDoc, deleteDoc } from "firebase/firestore";
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
