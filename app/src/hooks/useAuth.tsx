import { useContext, useEffect } from "react";
import { authContext } from "../App";
import React from "react";

interface GuardComponentProps {
  goto: string;
  on: boolean;
  children: React.ReactElement;
}

export default function useAuth() {
  return {
    GuardComponent: ({ children, goto, on }: GuardComponentProps) => {
      const { isLoggedIn } = useContext(authContext);
      useEffect(() => {
        if (on === isLoggedIn) window.location.href = goto;
      }, [isLoggedIn]);

      if (isLoggedIn === on || isLoggedIn == null) {
        return <React.Fragment />;
      }
      if (isLoggedIn !== on) {
        return children;
      }

      return <React.Fragment />;
    },
  };
}
