import { APIResponse } from "../types/global";

export const signUpService: (
  email: string,
  password: string
) => Promise<APIResponse<never>> = async (email, password) => {
  const resp = await new Promise<APIResponse<never>>((res, _) => {
    //TODO:-> talk to django be.  for now, mock 👍

    const timeout = setTimeout(() => {
      res({
        status: "success",
        message: "ACC_CREATED",
      });
      clearTimeout(timeout);
    }, 1000);
  });

  return resp;
};
