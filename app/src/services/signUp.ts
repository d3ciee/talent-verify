import { API_URL } from "../consts";
import { APIResponse } from "../types/global";
import { signInService } from "./signIn";

export const signUpService: (
  username: string,
  password1: string,
  password2: string
) => Promise<APIResponse<never>> = async (username, password1, password2) => {
  try {
    const resp = await fetch(API_URL + "/auth/signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password1,
        password2,
      }),
    });

    if (resp.status <= 204 && resp.status >= 200) {
      const login = await signInService(username, password1);
      if (login.status === "error")
        return { status: "success", message: "LOGIN_NEEDED" };
      return { status: "success" };
    }
    const respJson = await resp.json();

    //found this dumb. why dj_rest_auth's verbosity is so high? error:{descr} is enough.
    //Probably some way to configure it tbf

    return {
      status: "error",
      description:
        respJson.username[0] ||
        respJson.password1[0] ||
        respJson.password2[0] ||
        respJson.non_field_errors[0] ||
        "Something went wrong while signing up",
    };
  } catch (error) {
    return {
      status: "error",
      message: "ERR_SIGNUP",
      description: "Something went wrong while signing up",
    };
  }
};
