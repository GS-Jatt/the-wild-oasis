import { useMutation, useQueryClient } from "@tanstack/react-query"
import { login as loginApi } from "../../services/apiAuth"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast";

export default function useAuth() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate: login, isLoading } = useMutation({
        mutationFn: (user) => loginApi(user),
        onSuccess: (user) => {
            queryClient.setQueryData(['user'], user.user)
            navigate('/', {replace:true})
            
        },
        
            onError: (err) => {
            toast.error(err.message)
            navigate('/login');
        },

    });

    return { login, isLoading };
}