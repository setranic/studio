
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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { submitQuickContact } from "@/app/contactanos/actions";
import { Send, Loader2, FileText } from "lucide-react";
import { useState } from "react";
import Link from 'next/link';

const formSchema = z.object({
  name: z.string().min(2, { message: "El nombre es requerido." }),
  phone: z.string().min(8, { message: "El teléfono es requerido." }),
});

type QuickContactFormValues = z.infer<typeof formSchema>;

export default function QuickContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<QuickContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
    },
  });

  async function onSubmit(values: QuickContactFormValues) {
    setIsSubmitting(true);
    try {
      const result = await submitQuickContact(values);
      if (result.success) {
        toast({
          title: "Mensaje Enviado",
          description: "Gracias, te contactaremos pronto.",
        });
        form.reset();
      } else {
        toast({
          variant: "destructive",
          title: "Error al Enviar",
          description: "Por favor, revisa los campos e inténtalo de nuevo.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error Inesperado",
        description: "Ocurrió un error. Por favor, inténtalo más tarde.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-left w-full max-w-sm">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input 
                  placeholder="Nombre Completo" 
                  {...field} 
                  className="font-body bg-white/20 border-white/50 text-white placeholder:text-white/70 focus:bg-white/30"
                />
              </FormControl>
              <FormMessage className="text-accent"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input 
                  type="tel" 
                  placeholder="Teléfono" 
                  {...field} 
                  className="font-body bg-white/20 border-white/50 text-white placeholder:text-white/70 focus:bg-white/30"
                />
              </FormControl>
              <FormMessage className="text-accent"/>
            </FormItem>
          )}
        />
        <div className="flex flex-col sm:flex-row gap-3">
            <Button type="submit" className="w-full font-body bg-accent hover:bg-accent/90 text-accent-foreground shadow-md" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Contacto Rápido
                </>
              )}
            </Button>
            <Button asChild variant="outline" className="w-full font-body bg-transparent hover:bg-white/10 text-white border-white/50">
                <Link href="/contactanos">
                    <FileText className="mr-2 h-4 w-4"/>
                    Cotización
                </Link>
            </Button>
        </div>
      </form>
    </Form>
  );
}
