
"use server";

import * as z from "zod";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import type { Contacto } from "@/types";

const formSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.string().email("Por favor, introduce un email válido."),
  phone: z.string().optional(),
  service: z.enum(["transporte_carga", "transporte_local", "distribucion", "agencia_aduanera", "almacen_fiscal", "rastreo_medios", "seguro_carga", "otro"], {
    errorMap: () => ({ message: "Por favor, selecciona un tipo de servicio." }),
  }),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres.").max(500, "El mensaje no puede exceder los 500 caracteres."),
});

type ContactFormValues = z.infer<typeof formSchema>;

interface SubmitResult {
  success: boolean;
  error?: string | z.ZodError<ContactFormValues>["formErrors"]["fieldErrors"];
  data?: ContactFormValues;
}

export async function submitContactForm(values: ContactFormValues): Promise<SubmitResult> {
  const validatedFields = formSchema.safeParse(values);

  if (!validatedFields.success) {
    console.error("Validation errors:", validatedFields.error.flatten().fieldErrors);
    return {
      success: false,
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const contactData: Omit<Contacto, "id" | "submittedAt"> = {
      ...validatedFields.data,
      phone: validatedFields.data.phone || "", // Ensure phone is string or empty string
    };
    
    await addDoc(collection(db, "contactos"), {
      ...contactData,
      submittedAt: serverTimestamp(),
    });
    console.log("Form data saved to Firestore:", validatedFields.data);
    return { success: true, data: validatedFields.data };

  } catch (error) {
    console.error("Error saving contact form to Firestore:", error);
    return { success: false, error: "Error interno del servidor al guardar el mensaje." };
  }
}
