import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";

import useCabins from "./useCabins";
import AddCabin from "./AddCabin";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";





export default function CabinTable() {

  const { isLoading, error, cabins } = useCabins();


  if (isLoading) return <Spinner />;

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
        <Table.Body data={cabins} render={cabin => <CabinRow cabin={cabin} key={cabin.id} />} />
        
      </Menus>

      <AddCabin />

    </Table>
  )
}