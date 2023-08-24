import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { UseDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import useCreateCabin from "./useCreateCabin";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;


export default function CabinRow({ cabin }) {
  const { image, name, regularPrice, maxCapacity, discount, id ,description} = cabin;
  const [showEdit, setShowEdit] = useState(false);

  const {isDeleting ,deleteCabin} = UseDeleteCabin();
  const {createCabin, isCreateing} = useCreateCabin();

  return (
    <>
    <TableRow role="row">
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>fill up to {maxCapacity}</div>
      <Price>{formatCurrency(regularPrice)}</Price>

      {discount?<Discount>{formatCurrency(discount)}</Discount>:<span>&mdash;</span>}
      <div>
      <button disabled= {isCreateing} onClick={()=>createCabin({image, regularPrice, maxCapacity, discount, description, name:`coppy of ${name}`})}>
      <HiSquare2Stack/>
      </button>

      <button disabled= {false} onClick={()=>setShowEdit(show=>!show)}>
      <HiPencil/>
      </button>
      <button disabled={isDeleting} onClick={() => deleteCabin(id)}><HiTrash/></button>
      </div>

    </TableRow>
    {showEdit && <CreateCabinForm editCabin={cabin} editId={id}/>}
    </>
  );
}
