import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export default function useRecentStays() {
    const [searchParam] = useSearchParams();
    const date = searchParam.get('last') ? Number(searchParam.get('last')) : 7;
    const queryDate = subDays(new Date(), date).toISOString();

    const { data: stays, isLoading } = useQuery({
        queryKey: ['stays', `last ${date} days`],
        queryFn: () => getStaysAfterDate(queryDate),
    });

    const confrimedStays = stays?.filter((stay) => stay.status === "checked-in" || stay.status === "checked-out");

    return { confrimedStays, isLoading };
}