import { useState } from "react";
import { useCreateEleve } from "@/hooks/useCreateEleve";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import { CirclePlus } from "@/components/animate-ui/icons/circle-plus";
import { User } from "@/components/animate-ui/icons/user";

const eleveSchema = z.object({
  prenom: z.string().min(1, { message: "Le champ est requis" }),
  nom: z.string().min(1, { message: "Le champ est requis" }),
});

function DialogEleve({ selectClass }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const createEleve = useCreateEleve(selectClass);

  const form = useForm({
    resolver: zodResolver(eleveSchema),
    defaultValues: {
      prenom: "",
      nom: "",
    },
  });

  const onSubmit = (data) => {
    if (!selectClass || !data.prenom.trim() || !data.nom.trim()) return;
    createEleve.mutate(
      { prenom: data.prenom.trim(), nom: data.nom.trim() },
      {
        onSuccess: () => {
          form.reset();
          setDialogOpen(false);
        },
      }
    );
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={!selectClass}
          className="uppercase text-xl h-full p-6 flex gap-0 flex-col rounded-3xl border-0 justify-center text-purple-200 font-extrabold italic"
        >
          <AnimateIcon
            animateOnHover
            animation="default"
            className="flex flex-col items-center"
          >
            <User className="size-8 text-purple-900 stroke-1" />
            Ajouter un eleve
          </AnimateIcon>
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-4xl border-0 p-8 bg-background text-foreground">
        <DialogHeader>
          <DialogTitle>Nouvel élève</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="prenom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénom</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-background text-foreground rounded-2xl"
                      placeholder="Ex: Jean"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-background text-foreground rounded-2xl"
                      placeholder="Ex: Dupont"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setDialogOpen(false)}
                className="rounded-2xl border-0"
              >
                Annuler
              </Button>
              <Button
                type="submit"
                disabled={createEleve.isPending}
                className="rounded-2xl border-0"
              >
                {createEleve.isPending ? "Ajout..." : "Ajouter l'élève"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default DialogEleve;
