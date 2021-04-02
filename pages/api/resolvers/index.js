import axios from "axios";

export const resolvers = {
  Query: {
    getBooking: async (_, { customerId, bookingId }, { accessToken }) => {
      try {
        const booking = await axios
          .get(
            `${process.env.NEXT_PUBLIC_API_HOST}/v1/customers/${customerId}/bookings/${bookingId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
            {
              headers: {
                Authorization: "bearer " + accessToken,
                Accept: "application/json",
                "Accept-Language": "fr-FR",
              },
            }
          )
          .then(({ data }) => data);
        return booking;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
