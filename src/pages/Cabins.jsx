import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import CabinTable from "../features/cabins/CabinTable";
import CabinRow from "../features/cabins/CabinRow";
import Spinner from "../ui/Spinner";



function Cabins() {
 
  return (
    <>
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
    </Row>
    <Row>
      <CabinTable/> 
    </Row>
    
    
    </>
  );
}

export default Cabins;

