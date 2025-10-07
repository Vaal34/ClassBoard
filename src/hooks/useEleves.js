import { useQuery } from '@tanstack/react-query'

export function useEleves() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['all-eleves'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3001/api/eleves`)
      if (!res.ok) {
        throw new Error('Erreur lors du fetch')
      }
      return res.json()
    },
  })

  return {
    allEleves: data || [],
    isLoading,
    error,
  }
}
