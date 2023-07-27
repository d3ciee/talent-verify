import { API_URL } from "../consts";
import { APIResponse } from "../types/global";

export const signInService: (
  username: string,
  password: string
) => Promise<APIResponse<never>> = async (username, password) => {
  try {
    const resp = await fetch(API_URL + "/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (resp.status === 200) {
      const key = (await resp.json())?.key;
      sessionStorage.setItem("key", key);
      return { status: "success" };
    }
    if (resp.status === 400)
      return {
        status: "error",
        description: "Unable to log in with provided credentials.",
      };
    throw new Error("ERR_SIGNIN");
  } catch (error) {
    return {
      status: "error",
      description: "Something went wrong while signing in",
    };
  }
};
