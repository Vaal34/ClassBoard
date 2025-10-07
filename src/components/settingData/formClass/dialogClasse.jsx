import { useState } from 'react'
import { useCreateClasse } from '@/hooks/useCreateClasse'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { AnimateIcon } from '@/components/animate-ui/icons/icon'
import { Users } from '@/components/animate-ui/icons/users'

// Schéma de validation
const classeSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Le nom doit contenir au moins 3 caractères' }),
  path: z
    .string()
    .min(3, { message: 'Le chemin doit contenir au moins 3 caractères' }),
})

function DialogClasse({ disabled }) {
  const [formOpen, setFormOpen] = useState(false)

  const createClasse = useCreateClasse()

  const form = useForm({
    resolver: zodResolver(classeSchema),
    defaultValues: {
      name: '',
      path: '',
    },
  })

  const onSubmit = async (data) => {
    createClasse.mutate(
      {
        name: data.name.trim(),
        path: data.path.trim(),
      },
      {
        onSuccess: () => {
          form.reset()
          setFormOpen(false)
        },
      }
    )
  }

  return (
    <Dialog open={formOpen} onOpenChange={setFormOpen}>
      <DialogTrigger asChild>
        <Button
          className="h-full w-full gap-2 rounded-3xl border-0 text-lg font-extrabold text-purple-200 uppercase"
          disabled={disabled}
        >
          <AnimateIcon animateOnHover className="flex items-center gap-2">
            Ajouter une Classe
            <Users className="size-7 stroke-1 text-purple-800" />
          </AnimateIcon>
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-background text-foreground rounded-4xl border-0 p-8">
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
                    <Input
                      className="bg-background text-foreground rounded-2xl"
                      placeholder="Ex: TleL"
                      {...field}
                    />
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
                    <Input
                      className="bg-background text-foreground rounded-2xl"
                      placeholder="Ex: tlel"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button
                variant="secondary"
                type="button"
                onClick={() => setFormOpen(false)}
                className="rounded-2xl border-0"
              >
                Annuler
              </Button>
              <Button
                className="rounded-2xl border-0"
                type="submit"
                disabled={createClasse.isPending}
              >
                {createClasse.isPending ? 'Enregistrement...' : 'Enregistrer'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default DialogClasse
