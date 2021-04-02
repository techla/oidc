import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Booking {
    bookingId: String
    multipleSaleContracts: Boolean
    status: String
    type: String
    creationDate: String
    departureDate: String
    returnDate: Int
    expirationDate: String
    tripCountdownLink: String
  }

  type Query {
    getBooking(customerId: String!, bookingId: String!): Booking!
  }
`;
