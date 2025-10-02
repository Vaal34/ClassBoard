import { useState } from "react";
import { useCreateClasse } from "@/hooks/useCreateClasse";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";

// Schéma de validation
const classeSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  path: z.string().min(2, { message: "Le chemin doit contenir au moins 2 caractères" }),
});

function DialogClasse({ disabled }) {
  const [formOpen, setFormOpen] = useState(false);

  const createClasse = useCreateClasse();

  const form = useForm({
    resolver: zodResolver(classeSchema),
    defaultValues: {
      name: "",
      path: "",
    },
  });

  const onSubmit = async (data) => {
    createClasse.mutate(
      {
        name: data.name.trim(),
        path: data.path.trim(),
      },
      {
        onSuccess: () => {
          form.reset();
          setFormOpen(false);
        },
      }
    );
  };

  return (
    <Dialog open={formOpen} onOpenChange={setFormOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-2xl border-0" disabled={disabled}>
          Ajouter une Classe
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nouvelle Classe</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom de la Classe</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: CM2A" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="path"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chemin</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: cm2a" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setFormOpen(false)}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={createClasse.isPending}>
                {createClasse.isPending ? "Enregistrement..." : "Enregistrer"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default DialogClasse;
