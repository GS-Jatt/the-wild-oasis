import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useSignup() {
    const { mutate: signUp, isLoading } = useMutation({
        mutationFn: signupApi,
        onSuccess: () => {
            toast.success('')
        },
        onError: (err) => toast.error(err),
    });

    return { signUp, isLoading };
}