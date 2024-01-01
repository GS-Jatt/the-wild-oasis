import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

export function UseDeleteCabin(){

    const queryClint = useQueryClient();
    
    const { isLoading: isDeleting, mutate:deleteCabin } = useMutation({
        mutationFn: (id) => DeleteCabin(id),
        onSuccess: () => {
            toast.success('cabin is deleted')
            queryClint.invalidateQueries({
                mutationKey: ['cabins'],
            })
        },
        onError:(err)=> toast(err.message),
    });
    
    return {isDeleting ,deleteCabin};

}