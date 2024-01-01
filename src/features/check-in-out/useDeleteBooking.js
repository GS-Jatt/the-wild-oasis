import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteB} from "../../services/apiBookings";
import { toast } from "react-hot-toast";


export default function useDeleteBooking(){
    const queryClient = useQueryClient();
    const {mutate:deleteBooking, isLoading:isDeleteing} = useMutation({
        mutationFn:(bookingId )=>deleteB(bookingId),
        onSuccess:()=>{
            toast.success(`booking is succesfully deleted`);
            queryClient.invalidateQueries({queryKey:['bookings']})
        },
        onError:()=>{
            toast.error('faild to delete the Booking');
        },
    });

    return {deleteBooking, isDeleteing};
}