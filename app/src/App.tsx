import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Header, Stack } from "@nordhealth/react";
import "./App.css";
import { SignInPage } from "./routes/SignIn/SignIn";
import { SignUpPage } from "./routes/SignUp/SignUp";
import { createContext, useEffect, useState } from "react";
import { AuthContext } from "./types/context/auth";
import { LoadingScreen } from "./screens/LoadingScreen";
import { ErrorScreen } from "./screens/ErrorScreen";
import { getAccountService } from "./services/getAccount";
import { Account } from "./types/company/account";
import { CompanyDetails } from "./routes/CompanyDetails/CompanyDetails";
import { Dashboard } from "./routes/Dashboard/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>index</div>,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
  {
    path: "/sign-in",
    element: <SignInPage />,
  },
  {
    path: "/details",
    element: <CompanyDetails />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

export const authContext = createContext<AuthContext>({
  isLoggedIn: null,
  account: null,
});

function App() {
  const [getAuthState, setGetAuthState] = useState<
    "LOADING" | "SUCCESS" | "ERROR"
  >("LOADING");

  const [error, setError] = useState("");
  const [authContextState, setAuthContextState] = useState<AuthContext>({
    isLoggedIn: null,
    account: null,
  });

  useEffect(() => {
    (async () => {
      const resp = await getAccountService();

      if (resp.status === "error") {
        if (resp.message === "ERR_NOT_SIGNED_IN") {
          setGetAuthState("SUCCESS");
          setAuthContextState({ isLoggedIn: false, account: null });
          return;
        }
        setGetAuthState("ERROR");
        setError(resp?.description ?? "");
      }

      setGetAuthState("SUCCESS");
      setAuthContextState({ isLoggedIn: true, account: resp?.data as Account });
    })();
  }, []);

  switch (getAuthState) {
    case "LOADING":
      return <LoadingScreen />;
    case "ERROR":
      return (
        <ErrorScreen
          buttons={{
            primary: {
              title: "Retry",
              href: window.location.href,
            },
            secondary: {
              title: "Return to homepage",
              href: "/",
            },
          }}
          description={
            error + " Click Retry to try again or return to homepage."
          }
        />
      );
    case "SUCCESS":
      return (
        <>
          <main className="n-reset n-stack-horizontal">
            <authContext.Provider value={authContextState}>
              <Stack className="stack">
                <RouterProvider router={router} />
              </Stack>
            </authContext.Provider>
          </main>
        </>
      );
  }
}

export default App;
