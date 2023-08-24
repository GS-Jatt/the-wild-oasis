import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateNewEditCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

export default function useCreateCabin(){

    
    const queryClient = useQueryClient();
    
    const { mutate: createCabin, isLoading: isCreateing } = useMutation({
        mutationFn: CreateNewEditCabin,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
      });
      toast.success("new cabin is created");
    },
    onError: (error) => toast.error(error),
});

return {createCabin, isCreateing};


}