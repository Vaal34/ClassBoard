import { useState, useMemo } from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { AnimateIcon } from '@/components/animate-ui/icons/icon'
import { Brush } from '@/components/animate-ui/icons/brush'
import { useEleves } from '@/hooks/useEleves'
import { useClasses } from '@/hooks/useClasses'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Badge } from '@/components/ui/badge'
import { useUpdateEleve } from '@/hooks/useUpdateEleve'
import { toast } from 'sonner'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const eleveSchema = z.object({
  prenom: z.string().min(1, { message: 'Le champ est requis' }),
  nom: z.string().min(1, { message: 'Le champ est requis' }),
  classeId: z.string().min(1, { message: 'Le champ est requis' }),
})

function BtnUpdateEleve({ selectClass, activeSwap }) {
  const [selectedEleve, setSelectedEleve] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const { allEleves } = useEleves()
  const { listClasses } = useClasses()
  const updateEleve = useUpdateEleve(selectClass)

  const elevesToUse = useMemo(() => {
    return activeSwap === 'byClass'
      ? allEleves.filter((eleve) => eleve.classe?.path === selectClass)
      : allEleves
  }, [activeSwap, allEleves, selectClass])

  const form = useForm({
    resolver: zodResolver(eleveSchema),
    defaultValues: {
      prenom: '',
      nom: '',
      classeId: '',
    },
  })

  const handleEleveSelect = (value) => {
    setSelectedEleve(value)
    // Pré-remplir le formulaire avec les données de l'élève sélectionné
    const eleve = allEleves.find((e) => e.id === value)
    if (eleve) {
      form.setValue('prenom', eleve.prenom)
      form.setValue('nom', eleve.nom)
      form.setValue('classeId', eleve.classe.id.toString())
    }
  }

  const handleModify = (data) => {
    updateEleve.mutate(
      {
        id: selectedEleve,
        prenom: data.prenom,
        nom: data.nom,
        classeId: parseInt(data.classeId),
      },
      {
        onSuccess: () => {
          toast.success('Élève modifié avec succès', {
            className: 'rounded-4xl',
            style: {
              '--normal-bg':
                'color-mix(in oklab, light-dark(var(--color-purple-600), var(--color-purple-400)) 10%, var(--background))',
              '--normal-text':
                'light-dark(var(--color-purple-600), var(--color-purple-400))',
              '--normal-border':
                'light-dark(var(--color-purple-600), var(--color-purple-400))',
            },
          })
          setSelectedEleve('')
          form.reset()
          setDialogOpen(false)
        },
        onError: (error) => {
          toast.error("Erreur lors de la modification de l'élève", {
            className: 'rounded-4xl',
            style: {
              '--normal-bg':
                'color-mix(in oklab, light-dark(var(--color-red-600), var(--color-red-400)) 10%, var(--background))',
              '--normal-text':
                'light-dark(var(--color-red-600), var(--color-red-400))',
              '--normal-border':
                'light-dark(var(--color-red-600), var(--color-red-400))',
            },
          })
          console.error('Erreur lors de la modification:', error)
        },
      }
    )
  }

  const handleCancel = () => {
    setSelectedEleve('')
    form.reset()
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <AnimateIcon
              animateOnHover
              className="font-clash flex flex-col items-center font-extrabold text-blue-200"
            >
              <Button
                size="icon"
                className="corner-superellipse/1.5 flex h-full w-full flex-col gap-0 border-0 bg-blue-400 p-6 text-lg font-extrabold uppercase hover:bg-blue-400/90"
              >
                <Brush className="size-8 stroke-1 text-blue-800" />
              </Button>
            </AnimateIcon>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent className=" [&_svg]:bg-blue-200 [&_svg]:fill-blue-200 bg-blue-200 text-blue-800 font-clash text-lg font-extrabold uppercase">
          Modifier un élève
        </TooltipContent>
      </Tooltip>
      <DialogContent className="p-8 corner-squircle">
        <DialogHeader>
          <DialogTitle>Modifier l'élève</DialogTitle>
          <DialogDescription>
            Sélectionnez et modifiez l'élève
          </DialogDescription>
        </DialogHeader>

        <Select onValueChange={handleEleveSelect} value={selectedEleve}>
          <SelectTrigger className="corner-superellipse/1.5">
            <SelectValue placeholder="Choisir un élève à modifier" />
          </SelectTrigger>
          <SelectContent className="rounded-4xl border-0 p-1 corner-superellipse/1.5">
            {elevesToUse && elevesToUse.length > 0 ? (
              elevesToUse.map((eleve) => (
                <SelectItem key={eleve.id} value={eleve.id} className="corner-superellipse/1.5">
                  <span className="font-semibold">
                    {eleve.prenom}{' '}
                    <span className="font-light uppercase">{eleve.nom}</span>
                  </span>
                  <Badge
                    variant="secondary"
                    className="border-transparent bg-gradient-to-r from-indigo-500 to-pink-500 [background-size:105%] bg-center text-xs font-light text-white italic"
                  >
                    {eleve.classe?.name}
                  </Badge>
                </SelectItem>
              ))
            ) : (
              <SelectItem value="no-eleves" disabled>
                Aucun élève disponible
              </SelectItem>
            )}
          </SelectContent>
        </Select>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleModify)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="prenom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénom</FormLabel>
                  <FormControl>
                    <Input
                      className="corner-superellipse/1.5"
                      placeholder="Ex: Jean"
                      {...field}
                      value={field.value}
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
                      className="corner-superellipse/1.5"
                      placeholder="Ex: Dupont"
                      {...field}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="classeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Classe</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="corner-superellipse/1.5">
                        <SelectValue placeholder="Choisir une classe" />
                      </SelectTrigger>
                      <SelectContent className="rounded-4xl border-0 p-1 corner-superellipse/1.5">
                        {listClasses &&
                          listClasses.map((classe) => (
                            <SelectItem
                              className="corner-superellipse/1.5"
                              key={classe.id}
                              value={classe.id.toString()}
                            >
                              {classe.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleCancel}
                  className="corner-superellipse/1.5"
                >
                  Annuler
                </Button>
              </DialogClose>
              <Button className="corner-superellipse/1.5" type="submit">Modifier l'élève</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default BtnUpdateEleve
