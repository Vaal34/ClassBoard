import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useDeleteEleve(path) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-eleve", path],
    mutationFn: async (deleteEleve) => {
      const { data } = await axios.delete(
        `http://localhost:3001/api/classes/${path}`,
        { data: deleteEleve }
      );
      return data;
    },
    onMutate: async (deleteEleve) => {
      await queryClient.cancelQueries({ queryKey: ["classe", path] });

      const previousClasse = queryClient.getQueryData(["classe", path]);

      // Optimistic delete: retirer l'élève ciblé du cache (id uniquement)
      queryClient.setQueryData(["classe", path], (oldClasse = {}) => {
        const oldEleves = Array.isArray(oldClasse && oldClasse.eleves)
          ? oldClasse.eleves
          : [];

        const hasId = !!(deleteEleve && deleteEleve.id !== undefined && deleteEleve.id !== null);
        const filteredEleves = oldEleves.filter((e) => {
          if (!e) return true;
          if (!hasId) return true; // si pas d'id, ne pas modifier le cache
          return e.id !== deleteEleve.id;
        });

        return { ...oldClasse, eleves: filteredEleves };
      });

      return { previousClasse };
    },
    onError: (_err, _deleteEleve, context) => {
      queryClient.setQueryData(["classe", path], context?.previousClasse);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["classe", path] });
    },
  });
}
