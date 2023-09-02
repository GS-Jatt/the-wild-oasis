import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import useCheckin from "./useCheckin";
import { formatCurrency } from "../../utils/helpers";
import useSettings from "../settings/useSetting";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [isPaid, setIsPaid] = useState(false);
  const [addBreakfast, setAddBreackfast] = useState(false);


  const moveBack = useMoveBack();
  const { booking, isLoading } = useBooking();
  const { checkin, isChecking } = useCheckin();
  const { settings, isLoading: isLoadingSetting } = useSettings()

  useEffect(() => {

    setIsPaid(booking?.isPaid || false);
  }, [booking])

  if (isLoading || isLoadingSetting) return <Spinner />

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    isPaid: paid,
  } = booking;

  const breakfastPrice = settings.breakfastPrice * numGuests * numNights;

  function handleCheckin() {
    if (addBreakfast) {
      checkin({ bookingId, breakfast: { hasBreakfast: true, totalPrice: totalPrice + breakfastPrice, extrasPrice: breakfastPrice, } })
    }
    else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && <Box>
        <Checkbox checked={addBreakfast} id={bookingId}  onChange={() => setAddBreackfast(!addBreakfast)}>
          want to add breakfast for {formatCurrency(breakfastPrice)}
        </Checkbox>
      </Box>}

      <Box>
        <Checkbox checked={isPaid} id={bookingId} disabled={paid} onChange={() => setIsPaid(!isPaid)}>
          I Confirem that {guests.fullName} has paid the total amount of { formatCurrency(totalPrice + breakfastPrice)} {addBreakfast? `(${formatCurrency(totalPrice)} + ${formatCurrency(breakfastPrice)})`: ''}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button disabled={!isPaid || isChecking} onClick={handleCheckin}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
