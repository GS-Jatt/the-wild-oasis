import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/ButtonText";


import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "./useBooking";
import { useNavigate } from "react-router-dom";
import useCheckout from "../check-in-out/useCheckout";
import useDeleteBooking from "../check-in-out/useDeleteBooking";
import { Modal } from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const { checkout, isCheckingOut } = useCheckout()
  const navigate = useNavigate();
  const moveBack = useMoveBack();
  const { deleteBooking, isDeleteing } = useDeleteBooking();

  if (isLoading) return <Spinner />
  if (!booking) return <Empty resource={'booking'}/>

  const { status, id: bookingId } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  function handleDelete() {
    deleteBooking(bookingId);
    moveBack();
  }
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Modal>

          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>
          {
            status === 'unconfirmed' && <Button onClick={() => navigate(`/checkin/${bookingId}`)}>Check In</Button>
          }

          {
            status === 'checked-in' && <Button disabled={isCheckingOut} onClick={() => checkout(bookingId)} >
              Check-out
            </Button>
          }
          {
            status === 'checked-out' && <Modal.Open open={bookingId}>
              <Button disabled={isDeleteing} variation='danger'  >
                Delete
              </Button>
            </Modal.Open>
          }

          <Modal.Window name={bookingId}>
            <ConfirmDelete resource={bookingId} onConfirm={handleDelete} disabled={isDeleteing} />
          </Modal.Window>


        </Modal>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
