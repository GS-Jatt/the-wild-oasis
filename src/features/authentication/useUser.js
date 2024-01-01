import { useQuery } from "@tanstack/react-query";
import { user as userApi } from "../../services/apiAuth";

export default function useUser() {
    const { data: user, error, isLoading } = useQuery({
        queryKey: ['user',],
        queryFn: userApi,
    })

    return { user, error, isLoading, isAuthenticated: user?.role === 'authenticated' };
}
