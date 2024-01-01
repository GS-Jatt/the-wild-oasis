import { HiCalendarDays, HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineChartBar} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";


export default function Stats({ bookings, confrimedStays, numDays, cabinCount }) {
   

    const sales = confrimedStays.reduce((acc, cur) => acc + cur.totalPrice, 0)
    const occupancy = confrimedStays.reduce((acc, cur) => acc + cur.numNights, 0)

    return (
    <>
        <Stat title={'Bookings'} value={bookings.length} icon={<HiOutlineBriefcase />} color={'blue'} />
        
        <Stat title={'Sales'} value={formatCurrency(sales)} icon={<HiOutlineBanknotes />} color={'green'} />
        
        <Stat title={'check ins'} value={confrimedStays.length} icon={<HiCalendarDays />} color={'indigo'} />
        
        <Stat title={'occupancy rate'} value={Math.round(occupancy/ numDays*cabinCount) + '%'} icon={<HiOutlineChartBar />} color={'yellow'} />
        


    </>
    )

}