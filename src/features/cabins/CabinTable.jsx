import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";

import useCabins from "./useCabins";
import AddCabin from "./AddCabin";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import { split } from "postcss/lib/list";





export default function CabinTable() {

  const { isLoading, error, cabins } = useCabins();
  const [searchParam] = useSearchParams();

  if (isLoading) return <Spinner />;

  //filtering cabins
  function filter(cabins) {
    switch (searchParam.get('discount')) {
      // case 'all':
      //   return cabins;
      case 'with-discount':
        return cabins.filter((cabin) => cabin.discount > 0);
      case 'no-discount':
        return cabins.filter((cabin) => cabin.discount <= 0);
      default:
        return cabins
    }
  }

  const filteredCabins = filter(cabins);
  
  //sorting cabins
  const [sortBY, order] = split(searchParam.get('sort') || 'name-asc', '-0');
  const modifer = order === 'asc' ? 1:-1;
  const sortedcabins = filteredCabins.sort((a, b)=>(a[sortBY] - b[sortBY])*modifer)
  // console.log(sortBY , order , filteredCabins.at(0)[sortBY])
  return (
    <Table column='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
      <Table.Header >
        <div></div>
        <div>cabin</div>
        <div>capacity</div>
        <div>price</div>
        <div>discount</div>
        <div></div>
      </Table.Header>

      <Menus>
        <Table.Body data={sortedcabins} render={cabin => <CabinRow cabin={cabin} key={cabin.id} />} />

      </Menus>

      <AddCabin />

    </Table>
  )
}