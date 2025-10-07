import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export function useDeleteEleve(path) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['delete-eleve'],
    mutationFn: async (ids) => {
      const { data } = await axios.delete('http://localhost:3001/api/eleves', {
        data: { ids },
      })
      return data
    },
    onMutate: async (ids) => {
      // Annuler les requêtes en cours pour la classe spécifique
      await queryClient.cancelQueries({ queryKey: ['classe', path] })
      // Annuler les requêtes en cours pour tous les élèves
      await queryClient.cancelQueries({ queryKey: ['all-eleves'] })

      // Sauvegarder les données précédentes
      const previousClasse = queryClient.getQueryData(['classe', path])
      const previousAllEleves = queryClient.getQueryData(['all-eleves'])

      const idsArray = Array.isArray(ids) ? ids : [ids]

      // Mise à jour optimiste pour la classe spécifique
      if (path) {
        queryClient.setQueryData(['classe', path], (oldClasse = {}) => {
          const oldEleves = Array.isArray(oldClasse?.eleves)
            ? oldClasse.eleves
            : []

          const filteredEleves = oldEleves.filter((e) => {
            return e && !idsArray.includes(e.id)
          })

          return { ...oldClasse, eleves: filteredEleves }
        })
      }

      // Mise à jour optimiste pour tous les élèves
      queryClient.setQueryData(['all-eleves'], (oldEleves = []) => {
        const elevesArray = Array.isArray(oldEleves) ? oldEleves : []
        return elevesArray.filter((e) => {
          return e && !idsArray.includes(e.id)
        })
      })

      return { previousClasse, previousAllEleves }
    },
    onError: (_err, _ids, context) => {
      // Restaurer les données en cas d'erreur
      if (path && context?.previousClasse) {
        queryClient.setQueryData(['classe', path], context.previousClasse)
      }
      if (context?.previousAllEleves) {
        queryClient.setQueryData(['all-eleves'], context.previousAllEleves)
      }
    },
    onSettled: () => {
      // Invalider les caches pour refetch les données
      if (path) {
        queryClient.invalidateQueries({ queryKey: ['classe', path] })
      }
      queryClient.invalidateQueries({ queryKey: ['all-eleves'] })
    },
  })
}
