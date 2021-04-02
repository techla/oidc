import { useRouter } from "next/router";
import React, { useEffect } from "react";
import BrowserOnly from "../hocs/browser-only";
import { useOidc } from "../contexts/oidc-context";

function SigninRedirect() {
  const router = useRouter();
  const userManager = useOidc();
  useEffect(async () => {
    try {
      await userManager.signoutRedirectCallback();
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  }, []);

  return null;
}

export default BrowserOnly(SigninRedirect);
