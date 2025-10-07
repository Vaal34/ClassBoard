import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export function useCreateClasse() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['create-class'],
    mutationFn: async (newClasse) => {
      const { data } = await axios.post(
        'http://localhost:3001/api/classes',
        newClasse
      )
      return data
    },
    onMutate: async (newClasse) => {
      // 1. Annule les requêtes en cours pour éviter des conflits
      await queryClient.cancelQueries({ queryKey: ['classes'] })

      // 2. Sauvegarde l'état actuel (avant la modif) pour pouvoir revenir en arrière si erreur
      const previousClasses = queryClient.getQueryData(['classes'])

      // 3. Met à jour directement la cache (optimistic update)
      queryClient.setQueryData(['classes'], (old = []) => [
        ...old,
        { ...newClasse, id: Date.now(), isTemp: true }, // ajout "fictif" immédiat
      ])

      // 4. Retourne l'ancien état pour le rollback en cas d'erreur
      return { previousClasses }
    },
    onError: (_err, _newClasse, context) => {
      queryClient.setQueryData(['classes'], context?.previousClasses)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] })
    },
  })
}
