import { db } from "@/lib/firebase";
import { collection, getDocs, doc, getDoc, where, limit, query, orderBy } from "firebase/firestore";
import type { Publicacion } from "@/types";

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

// This function can be called from Server Components because this file does not have "use client".
export async function getPublicacionBySlug(slug: string): Promise<Publicacion | null> {
  try {
    const q = query(collection(db, "publicaciones"), where("slug", "==", slug), limit(1));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docSnap = querySnapshot.docs[0];
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate().toISOString(),
      } as Publicacion;
    } else {
       // Fallback to check if the slug is actually an ID
      const docRef = doc(db, "publicaciones", slug);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          createdAt: data.createdAt?.toDate().toISOString(),
        } as Publicacion;
      }
    }
    return null;
  } catch (error) {
    console.error("Error fetching publication by slug or ID:", error);
    return null;
  }
}
