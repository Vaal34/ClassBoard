import { useQuery } from '@tanstack/react-query'

export function useClasses() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['classes'],
    queryFn: () =>
      fetch('http://localhost:3001/api/classes').then((res) => res.json()),
  })

  return {
    listClasses: data || [],
    isLoading,
    error,
  }
}
