import { useState } from 'react'
import { useCreateEleve } from '@/hooks/useCreateEleve'
import * as z from 'zod'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { AnimateIcon } from '@/components/animate-ui/icons/icon'
import { User } from '@/components/animate-ui/icons/user'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { useClasses } from '@/hooks/useClasses'
import { toast } from 'sonner'

const eleveSchema = z.object({
  prenom: z.string().min(1, { message: 'Le champ est requis' }),
  nom: z.string().min(1, { message: 'Le champ est requis' }),
  classe: z.string().optional(),
})

function BtnCreateEleve({ selectClass, activeSwap }) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const { listClasses } = useClasses()
  const createEleve = useCreateEleve()

  const form = useForm({
    resolver: zodResolver(eleveSchema),
    defaultValues: {
      prenom: '',
      nom: '',
      classe: '',
    },
  })

  const onSubmit = (data) => {
    if (!data.prenom.trim() || !data.nom.trim()) return

    let classeToUse
    if (activeSwap === 'byEleves' && data.classe) {
      classeToUse = data.classe
    } else {
      classeToUse = selectClass
    }

    createEleve.mutate(
      {
        newEleve: {
          prenom: data.prenom.trim(),
          nom: data.nom.trim(),
        },
        path: classeToUse,
      },
      {
        onSuccess: () => {
          toast.success('Élève créé avec succès')
          form.reset()
          setDialogOpen(false)
        },
        onError: (error) => {
          toast.error("Erreur lors de la création de l'élève")
          console.error('Erreur lors de la création:', error)
        },
      }
    )
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={!selectClass}
          className="font-clash flex h-full flex-col justify-center gap-0 p-6 text-xl font-extrabold uppercase"
        >
          <AnimateIcon
            animateOnHover
            animation="default"
            className="flex flex-col items-center"
          >
            <User className="size-8 stroke-1 text-green-900" />
            Ajouter un élève
          </AnimateIcon>
        </Button>
      </DialogTrigger>

      <DialogContent className="p-8">
        <DialogHeader>
          <DialogTitle>Nouvel élève</DialogTitle>
          <DialogDescription>
            Remplissez les champs ci-dessous pour ajouter un nouvel élève
          </DialogDescription>
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
                    <Input placeholder="Ex: Jean" {...field} />
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
                    <Input placeholder="Ex: Dupont" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {activeSwap === 'byEleves' && (
              <FormField
                control={form.control}
                name="classe"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sélectionner une classe</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.path}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Sélectionner une classe" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-4xl border-0 p-1">
                        {listClasses.map((classe) => (
                          <SelectItem key={classe.id} value={classe.path}>
                            {classe.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setDialogOpen(false)}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={createEleve.isPending}>
                {createEleve.isPending ? 'Ajout...' : "Ajouter l'élève"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default BtnCreateEleve
