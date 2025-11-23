import { useState } from 'react'
import { useCreateClasse } from '@/hooks/useCreateClasse'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
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
import { showToast } from '@/lib/toast-styles'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
// Schéma de validation
const classeSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Le nom doit contenir au moins 3 caractères' }),
  path: z
    .string()
    .min(3, { message: 'Le chemin doit contenir au moins 3 caractères' }),
})

function BtnCreateClasse({ disabled }) {
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
          showToast.success('Classe créée avec succès')
          form.reset()
          setFormOpen(false)
        },
        onError: (error) => {
          // Vérifier si c'est une erreur de path déjà utilisé
          if (error?.response?.status === 409) {
            showToast.error('Une classe avec ce chemin existe déjà')
          } else {
            showToast.error('Erreur lors de la création de la classe')
          }
          console.error('Erreur lors de la création:', error)
        },
      }
    )
  }

  return (
    <Dialog open={formOpen} onOpenChange={setFormOpen}> 
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button
              disabled={disabled}
              className="disabled:blur-[0.5px] rounded-full w-full font-clash flex h-full flex-col justify-center gap-0 text-lg font-extrabold uppercase"
            >
              <AnimateIcon
                animateOnHover
                animation="default"
                className="flex flex-col items-center"
              >
                <Users className="size-8 stroke-1 text-purple-900" />
              </AnimateIcon>
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent className=" [&_svg]:bg-purple-200 [&_svg]:fill-purple-200 bg-purple-200 text-purple-800 font-clash text-lg font-extrabold uppercase">
          Créer une classe
        </TooltipContent>
      </Tooltip>

      <DialogContent className="p-8">
        <DialogHeader>
          <DialogTitle>Nouvelle Classe</DialogTitle>
          <DialogDescription>
            Remplissez les champs ci-dessous pour ajouter une nouvelle classe
          </DialogDescription>
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
                    <Input placeholder="Ex: TleL" {...field} />
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
                    <Input placeholder="Ex: tlel" {...field} />
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
              >
                Annuler
              </Button>
              <Button type="submit" disabled={createClasse.isPending}>
                {createClasse.isPending ? 'Enregistrement...' : 'Enregistrer'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default BtnCreateClasse
