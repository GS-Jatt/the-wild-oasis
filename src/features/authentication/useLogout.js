import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogout(){
    const queryClient = useQueryClient();
    const navigate= useNavigate();
    const {mutate:logout, isLoading} = useMutation({
        mutationFn:logoutApi,
        onSuccess:()=>{
            navigate('/login');
            queryClient.removeQueries();
        },
    });

    return {logout, isLoading}
}