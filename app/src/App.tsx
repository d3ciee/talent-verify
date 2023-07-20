import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Header, Stack } from "@nordhealth/react";
import "./App.css";
import { SignInPage } from "./routes/SignIn/SignIn";
import { SignUpPage } from "./routes/SignUp/SignUp";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./types/context/auth";
import { LoadingScreen } from "./screens/LoadingScreen";
import { ErrorScreen } from "./screens/ErrorScreen";

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
]);

export const authContext = createContext<AuthContext>({
  isLoggedIn: false,
  account: null,
});

function App() {
  const [getAuthState, setGetAuthState] = useState<
    "LOADING" | "SUCCESS" | "ERROR"
  >("ERROR");

  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      const resp = getAccount();
    })();
  });

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
            <Stack className="stack">
              <RouterProvider router={router} />
            </Stack>
          </main>
        </>
      );
  }
}

export default App;
