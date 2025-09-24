import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useCreateEleve(path) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-eleve", path],
    mutationFn: async (newEleve) => {
      const { data } = await axios.post(`/api/classes/${path}`, newEleve);
      return data;
    },
    onMutate: async (newEleve) => {
      await queryClient.cancelQueries({ queryKey: ["eleves", path] });

      const previousEleves = queryClient.getQueryData([
        "eleves",
        path,
      ]);

      queryClient.setQueryData(["eleves", path], (old = []) => [
        ...old,
        { ...newEleve, id: Date.now() }, // id temporaire
      ]);

      return { previousEleves };
    },
    onError: (_err, _newEleve, context) => {
      queryClient.setQueryData(["eleves", path], context?.previousEleves);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["eleves", path] });
    },
  });
}
