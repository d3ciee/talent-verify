import { Account } from "../types/company/account";
import { APIResponse } from "../types/global";

export const getAccountService: () => Promise<
  APIResponse<Account>
> = async () => {
  try {
    const resp = await fetch("http://localhost:8000/company/get/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + sessionStorage.getItem("key"),
      },
    });

    if (resp.status === 200) {
      const data = await resp.json();
      if (data.status === "error") {
        return {
          status: "success",
          data: null,
        };
      }
      return { status: "success", data };
    }
    throw new Error("ERR_GET_ACCOUNT");
  } catch (error) {
    return {
      status: "error",
      message: "ERR_GET_ACCOUNT",
      description: "Something went wrong while getting account",
    };
  }
};
