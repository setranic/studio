"use server";

import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  service: z.enum(["consultoria", "desarrollo_web", "marketing_digital", "otro"]),
  message: z.string().min(10).max(500),
});

type ContactFormValues = z.infer<typeof formSchema>;

interface SubmitResult {
  success: boolean;
  error?: string;
  data?: ContactFormValues;
}

export async function submitContactForm(values: ContactFormValues): Promise<SubmitResult> {
  const validatedFields = formSchema.safeParse(values);

  if (!validatedFields.success) {
    console.error("Validation errors:", validatedFields.error.flatten().fieldErrors);
    return {
      success: false,
      error: "Datos de formulario inválidos. Por favor, revisa los campos.",
    };
  }

  // Simulate API call or database interaction
  console.log("Form data received:", validatedFields.data);
  
  // Simulate potential server-side error
  // if (Math.random() > 0.7) {
  //   return { success: false, error: "Error simulado del servidor." };
  // }

  // Simulate a delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return { success: true, data: validatedFields.data };
}
