import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export default function useBookings() {
   const [searchparams] = useSearchParams();

   // filter
   const filterValue = searchparams.get('status') || 'all';
   const filter = {
      value: filterValue,
      method: 'eq',
   };
   // sorting 
   const sortRaw = searchparams.get('sort') || 'startDate-desc';
   const [field, order] = sortRaw.split('-');
   const sortBy = {
      field,
      order,
   };
   //page
   
   const page = searchparams.get('page') ? Number(searchparams.get('page')) : 1;

   //query
   const { data: { data: bookings, count } = {}, isLoading, error } = useQuery({
      queryKey: ['bookings', filter, sortBy, page],
      queryFn: () => getBookings(filter, sortBy, page),
   })

   //prefecth
   const queryClient = useQueryClient();
   const totalPage = Math.ceil(count / PAGE_SIZE);
   if (page < totalPage) queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getBookings(filter, sortBy, page + 1),
   })

   if (page > 1) queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getBookings(filter, sortBy, page - 1),
   })

   return { bookings, error, isLoading, count };
}