import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export function useUpdateEleve(path) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['update-eleve'],
    mutationFn: async ({ id, prenom, nom, classeId }) => {
      const { data } = await axios.put(
        `http://localhost:3001/api/eleves/${id}`,
        { prenom, nom, classeId }
      )
      return data
    },
    onMutate: async ({ id, prenom, nom, classeId }) => {
      // Annuler les requêtes en cours pour la classe spécifique
      await queryClient.cancelQueries({ queryKey: ['classe', path] })
      // Annuler les requêtes en cours pour tous les élèves
      await queryClient.cancelQueries({ queryKey: ['all-eleves'] })

      // Sauvegarder les données précédentes
      const previousClasse = queryClient.getQueryData(['classe', path])
      const previousAllEleves = queryClient.getQueryData(['all-eleves'])

      // Mise à jour optimiste pour la classe spécifique
      if (path) {
        queryClient.setQueryData(['classe', path], (oldClasse = {}) => {
          const oldEleves = Array.isArray(oldClasse?.eleves)
            ? oldClasse.eleves
            : []

          const updatedEleves = oldEleves.map((eleve) => {
            if (eleve && eleve.id === id) {
              return { ...eleve, prenom, nom, classeId }
            }
            return eleve
          })

          return { ...oldClasse, eleves: updatedEleves }
        })
      }

      // Mise à jour optimiste pour tous les élèves
      queryClient.setQueryData(['all-eleves'], (oldEleves = []) => {
        const elevesArray = Array.isArray(oldEleves) ? oldEleves : []
        return elevesArray.map((eleve) => {
          if (eleve && eleve.id === id) {
            return { ...eleve, prenom, nom, classeId }
          }
          return eleve
        })
      })

      return { previousClasse, previousAllEleves }
    },
    onError: (_err, _variables, context) => {
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
