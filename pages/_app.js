import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { OidcProvider } from "../contexts/oidc-context";
import { UserManager } from "oidc-client";
import { useState, useEffect } from "react";

const defaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};
const appoloClient = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_BACKEND_URI_BASE}/graphql`,
  cache: new InMemoryCache(),
  defaultOptions,
});

const oidcClientConfig = {
  authority: process.env.NEXT_PUBLIC_ISSUER,
  client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
  client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
  redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
  response_type: process.env.NEXT_PUBLIC_RESPONSE_TYPE,
  scope: process.env.NEXT_PUBLIC_SCOPE,
  post_logout_redirect_uri: process.env.NEXT_PUBLIC_POST_LOGOUT_REDIRECT_URI,
  automaticSilentRenew: true,
  silent_redirect_uri: process.env.NEXT_PUBLIC_SILENT_REDIRECT_URI,
};

function App({ Component, pageProps }) {
  const [oidcClient, setOidcClient] = useState(null);
  useEffect(() => {
    const useManager = new UserManager(oidcClientConfig);
    setOidcClient(useManager);
  }, []);
  return (
    <OidcProvider value={oidcClient}>
      <ApolloProvider client={appoloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </OidcProvider>
  );
}

export default App;
