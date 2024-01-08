import styled from "styled-components";
import useRecentBookings from "./useRecentBookings";
import useRecentStays from "./useRecentStays";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import useCabins from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto 34rem auto;
    gap: 2.4rem;
    @media(max-width: 960px) {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto auto 34rem auto;
    }
`;


export default function DashBoardLayout() {
  const { bookings, isLoading: isLoading1, numDays } = useRecentBookings();
  const { confrimedStays, isLoading: isLoading2 } = useRecentStays();
  const { cabins, isLoading } = useCabins();

  if (isLoading1 || isLoading2 || isLoading) return <Spinner />
  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} confrimedStays={confrimedStays} numDays={numDays} cabinCount={cabins.length} />

      <TodayActivity/>
     
     <DurationChart confirmedStays={confrimedStays} />
     
      <SalesChart bookings={bookings} numDays={numDays}/>
    </StyledDashboardLayout>
  )
}