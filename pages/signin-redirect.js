import { useRouter } from "next/router";
import { useEffect } from "react";
import BrowserOnly from "../hocs/browser-only";
import { useOidc } from "../contexts/oidc-context";

function SigninRedirect() {
  const router = useRouter();
  const userManager = useOidc();
  useEffect(async () => {
    try {
      await userManager.signinRedirectCallback();
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  }, []);

  return <p>authenticating...</p>;
}

export default BrowserOnly(SigninRedirect);
