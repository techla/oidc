import { createContext, useContext } from "react";

const OidcContext = createContext(null);
export const useOidc = () => useContext(OidcContext);
export const OidcProvider = OidcContext.Provider;
