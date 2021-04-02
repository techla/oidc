import { useEffect, useState, useMemo, useCallback } from "react";
import BrowserOnly from "../hocs/browser-only";
import Booking from "../components/booking";
import { useOidc } from "../contexts/oidc-context";

function App() {
  const userManager = useOidc();
  const [user, setUser] = useState(null);
  const isAuthenticated = useMemo(() => !!user && !user.expired, [user]);
  useEffect(async () => {
    const user = await userManager.getUser();
    setUser(user);
  }, []);

  const login = useCallback(async () => {
    await userManager.signinRedirect();
  }, []);

  const logout = useCallback(async () => {
    try {
      await userManager.signoutRedirect();
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(async () => {
    userManager.events.addAccessTokenExpired(() => {
      logout();
    });
  }, []);

  return (
    <>
      {!isAuthenticated ? (
        <button onClick={login}>Login</button>
      ) : (
        <>
          <button onClick={logout}>Logout</button>
          <Booking />
        </>
      )}
    </>
  );
}

export default BrowserOnly(App);
