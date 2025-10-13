import { useQuery, useQueryClient } from '@tanstack/react-query'

export function useClasse(path) {
  const queryClient = useQueryClient()

  // Récupérer la liste des classes depuis le cache
  const listClasses = queryClient.getQueryData(['classes']) || []

  const { data, isLoading, error } = useQuery({
    queryKey: ['classe', path],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3001/api/classes/${path}`)
      if (!res.ok) {
        throw new Error('Erreur lors du fetch')
      }
      return res.json()
    },
    enabled: !!path && listClasses.some((c) => c?.path === path),
  })

  return {
    dataClasse: data || [],
    isLoading,
    error,
  }
}
