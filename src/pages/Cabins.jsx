import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins";
import { useQueryClient } from "@tanstack/react-query";
import CabinTable from "../features/cabins/CabinTable";


function Cabins() {
 
  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
      <CabinTable  ></CabinTable>
    </Row>
  );
}

export default Cabins;
