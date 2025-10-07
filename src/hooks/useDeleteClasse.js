import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export function useDeleteClasse() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['delete-class'],
    mutationFn: async (deleteClasse) => {
      const { data } = await axios.delete('http://localhost:3001/api/classes', {
        data: deleteClasse,
      })
      return data
    },
    onMutate: async (deleteClasse) => {
      // 1. Annule les requêtes en cours pour éviter des conflits
      await queryClient.cancelQueries({ queryKey: ['classes'] })
      if (deleteClasse?.path) {
        await queryClient.cancelQueries({
          queryKey: ['classe', deleteClasse.path],
        })
      }

      // 2. Sauvegarde l'état actuel (avant la modif) pour pouvoir revenir en arrière si erreur
      const previousClasses = queryClient.getQueryData(['classes'])

      // 3. Met à jour directement le cache (optimistic delete): retirer la classe ciblée
      queryClient.setQueryData(['classes'], (oldClasses = []) => {
        if (!Array.isArray(oldClasses)) return oldClasses
        const hasId =
          deleteClasse &&
          deleteClasse.id !== undefined &&
          deleteClasse.id !== null
        return oldClasses.filter((classe) => {
          if (!classe) return true
          if (hasId) {
            return classe.id !== deleteClasse.id
          }
          return true // si aucune clé fiable fournie, ne modifie pas
        })
      })

      // 3b. Nettoie le cache de la classe spécifique pour éviter un refetch manuel
      if (deleteClasse?.path) {
        queryClient.removeQueries({ queryKey: ['classe', deleteClasse.path] })
      }

      // 4. Retourne l'ancien état pour le rollback en cas d'erreur
      return { previousClasses }
    },
    onError: (_err, _deleteClasse, context) => {
      queryClient.setQueryData(['classes'], context?.previousClasses)
    },
    onSettled: (_data, _err, variables) => {
      queryClient.invalidateQueries({ queryKey: ['classes'] })
      if (variables?.path) {
        queryClient.invalidateQueries({ queryKey: ['classe', variables.path] })
      }
    },
  })
}
