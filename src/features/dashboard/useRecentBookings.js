import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export default function useRecentBookings() {
    const [searchParam] = useSearchParams();
    const numDays = searchParam.get('last') ? Number(searchParam.get('last')) : 7;
    const queryDate = subDays(new Date(), numDays).toISOString();

    
    const { data: bookings, isLoading } = useQuery({
        queryKey: ['bookings', `last ${numDays} days`],
        queryFn: () => getBookingsAfterDate(queryDate),
    })
    return { bookings, isLoading ,numDays };
}