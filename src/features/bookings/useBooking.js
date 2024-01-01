import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";

export default function useBooking() {
    const { bookingId } = useParams();
    const {data:booking, isLoading} = useQuery({
        queryKey: ['booking',bookingId],
        queryFn:()=>getBooking(bookingId),
    }) ;

    return {booking, isLoading} ;
}