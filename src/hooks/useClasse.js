import { useQuery } from "@tanstack/react-query";

export function useClasse(path) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["classe", path],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3001/api/classes/${path}`);
      if (!res.ok) {
        throw new Error("Erreur lors du fetch");
      }
      return res.json();
    },
    enabled: !!path,
  });

  return {
    dataClasse: data || [],
    isLoading,
    error,
  };
}
