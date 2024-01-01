import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateNewEditCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

export default function useEditCabin(){
    const queryClient = useQueryClient();

    const { mutate: editCabin, isLoading: isEditing } = useMutation({
        mutationFn: ({ editMode, ...cabin }) => CreateNewEditCabin(cabin, editMode),
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["cabins"],
          });
          toast.success(" cabin is edited");
        },
        onError: (error) => toast.error(error),
      });

      return {editCabin, isEditing};
}