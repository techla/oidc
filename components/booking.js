import { BOOKING_INFORMATION } from "../queries/booking";
import { useLazyQuery } from "@apollo/client";
import { useOidc } from "../contexts/oidc-context";
import { useState, useEffect, useCallback, useMemo } from "react";

function Booking() {
  const userManager = useOidc();
  const [user, setUser] = useState(null);
  useEffect(async () => {
    const user = await userManager.getUser();
    setUser(user);
  }, []);
  const accessToken = useMemo(() => user?.access_token, [user]);
  const [customerId, setCustomerId] = useState("144869377");
  const [bookingId, setBookingId] = useState("133157150");
  const [getBooking, { _, data }] = useLazyQuery(BOOKING_INFORMATION, {
    context: { headers: { Authorization: `Bearer ${accessToken}` } },
  });

  const handleCustomerIdChange = useCallback(
    ({ target: { value } }) => setCustomerId(value),
    []
  );
  const handleBookingIdChange = useCallback(
    ({ target: { value } }) => setBookingId(value),
    []
  );
  const handleBookingClick = useCallback(
    () => getBooking({ variables: { customerId, bookingId } }),
    []
  );
  return (
    <>
      <div>
        <label htmlFor="customerId">CustomerId</label>
        <input
          name="customerId"
          type="text"
          value={customerId}
          onChange={handleCustomerIdChange}
        />
      </div>
      <div>
        <label htmlFor="bookingId">BookingId </label>
        <input
          name="bookingId"
          type="text"
          value={bookingId}
          onChange={handleBookingIdChange}
        />
      </div>
      <div>
        <button onClick={handleBookingClick}>Fetch</button>
      </div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}

export default Booking;
