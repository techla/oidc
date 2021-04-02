import { gql } from "@apollo/client";

export const BOOKING_INFORMATION = gql`
  query Booking($customerId: String!, $bookingId: String!) {
    getBooking(customerId: $customerId, bookingId: $bookingId) {
      bookingId
      multipleSaleContracts
      status
      type
      creationDate
      departureDate
      returnDate
      expirationDate
      tripCountdownLink
    }
  }
`;
