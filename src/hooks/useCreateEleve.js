import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export function useCreateEleve() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['create-eleve'],
    mutationFn: async ({ newEleve, path }) => {
      const { data } = await axios.post(
        `http://localhost:3001/api/eleves/${path}`,
        newEleve
      )
      return data
    },
    onMutate: async ({ newEleve, path }) => {
      await queryClient.cancelQueries({ queryKey: ['classe', path] })
      await queryClient.cancelQueries({ queryKey: ['all-eleves'] })

      const previousClasse = queryClient.getQueryData(['classe', path])
      const previousAllEleves = queryClient.getQueryData(['all-eleves'])

      queryClient.setQueryData(['classe', path], (oldClasse = {}) => {
        const tempId = Date.now()
        const oldEleves = Array.isArray(oldClasse?.eleves)
          ? oldClasse.eleves
          : []
        return {
          ...oldClasse,
          eleves: [...oldEleves, { ...newEleve, id: tempId }],
        }
      })

      queryClient.setQueryData(['all-eleves'], (oldEleves = []) => {
        // Trouver la classe correspondante pour inclure la relation
        const classe = queryClient
          .getQueryData(['classes'])
          ?.find((c) => c.path === path)
        return [
          ...oldEleves,
          {
            ...newEleve,
            id: Date.now(),
            classe: classe
              ? { id: classe.id, name: classe.name, path: classe.path }
              : null,
          },
        ]
      })

      return { previousClasse, previousAllEleves, path }
    },
    onError: (_err, _newEleve, context) => {
      if (context?.path) {
        queryClient.setQueryData(
          ['classe', context.path],
          context?.previousClasse
        )
      }
      queryClient.setQueryData(['all-eleves'], context?.previousAllEleves)
    },
    onSettled: (_data, _error, _variables, context) => {
      if (context?.path) {
        queryClient.invalidateQueries({ queryKey: ['classe', context.path] })
      }
      queryClient.invalidateQueries({ queryKey: ['all-eleves'] })
    },
  })
}
