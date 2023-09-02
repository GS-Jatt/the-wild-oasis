import { useMutation } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useCheckin(){
    const navigate = useNavigate();
    const {mutate:checkin, isLoading:isChecking} = useMutation({
        mutationFn:({bookingId ,breakfast})=>updateBooking(bookingId, {
            status:'checked-in',
            isPaid: true,
            ...breakfast,
        }),
        onSuccess:(data)=>{
            toast.success(`${data.id} is succesfully checked in`);
            navigate('/');
        },
        onError:()=>{
            toast.error('faild to checkin');
        },
    });

    return {checkin, isChecking};
}