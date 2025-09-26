import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useCreateEleve(path) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-eleve", path],
    mutationFn: async (newEleve) => {
      const { data } = await axios.post(`http://localhost:3001/api/classes/${path}`, newEleve);
      return data;
    },
    onMutate: async (newEleve) => {
      await queryClient.cancelQueries({ queryKey: ["classe", path] });

      const previousClasse = queryClient.getQueryData(["classe", path]);

      queryClient.setQueryData(["classe", path], (oldClasse = {}) => {
        const tempId = Date.now();
        const oldEleves = Array.isArray(oldClasse?.eleves) ? oldClasse.eleves : [];
        return {
          ...oldClasse,
          eleves: [...oldEleves, { ...newEleve, id: tempId }],
        };
      });

      return { previousClasse };
    },
    onError: (_err, _newEleve, context) => {
      queryClient.setQueryData(["classe", path], context?.previousClasse);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["classe", path] });
    },
  });
}
