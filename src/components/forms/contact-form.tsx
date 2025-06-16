
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { submitContactForm } from "@/app/contactanos/actions";
import { Send, Loader2 } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor, introduce un email válido." }),
  phone: z.string().optional(),
  service: z.enum(["consultoria", "desarrollo_web", "marketing_digital", "otro"], {
    errorMap: () => ({ message: "Por favor, selecciona un tipo de servicio." }),
  }),
  message: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres." }).max(500, { message: "El mensaje no puede exceder los 500 caracteres." }),
});

type ContactFormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: undefined,
      message: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setIsSubmitting(true);
    try {
      const result = await submitContactForm(values);
      if (result.success) {
        toast({
          title: "Mensaje Enviado",
          description: "Gracias por contactarnos. Nos pondremos en contacto contigo pronto.",
        });
        form.reset();
      } else {
        // Handle Zod validation errors specifically for field display if needed
        if (typeof result.error !== 'string' && result.error) {
           Object.entries(result.error).forEach(([fieldName, errors]) => {
            if (errors) {
              form.setError(fieldName as keyof ContactFormValues, {
                type: "server",
                message: errors.join(', '),
              });
            }
          });
          toast({
            variant: "destructive",
            title: "Error de Validación",
            description: "Por favor, revisa los campos del formulario.",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Error al Enviar",
            description: result.error as string || "Hubo un problema al enviar tu mensaje. Inténtalo de nuevo.",
          });
        }
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error Inesperado",
        description: "Ocurrió un error inesperado. Por favor, inténtalo más tarde.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-body">Nombre Completo</FormLabel>
              <FormControl>
                <Input placeholder="Tu nombre" {...field} className="font-body"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-body">Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="tu@email.com" {...field} className="font-body"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-body">Teléfono (Opcional)</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="Tu número de teléfono" {...field} className="font-body"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-body">Tipo de Servicio</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="font-body">
                    <SelectValue placeholder="Selecciona un servicio" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="consultoria" className="font-body">Consultoría Estratégica</SelectItem>
                  <SelectItem value="desarrollo_web" className="font-body">Desarrollo Web y Apps</SelectItem>
                  <SelectItem value="marketing_digital" className="font-body">Marketing Digital</SelectItem>
                  <SelectItem value="otro" className="font-body">Otro</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-body">Mensaje</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Cuéntanos sobre tu proyecto o consulta..."
                  className="resize-none font-body"
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full font-body shadow-md hover:shadow-lg transition-shadow duration-300" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              Enviar Mensaje <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
