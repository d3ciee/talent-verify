import { Account } from "../types/company/account";
import { APIResponse } from "../types/global";

interface updateAccountDetailsProps {
  companyName: string;
  companyRegNo: string;
  companyRegDate: string;
  contactPerson: string;
  contactPhone: string;
  companyAddress: string;
}

export const updateAccountDetails: (
  arg0: updateAccountDetailsProps
) => Promise<APIResponse<Account>> = async () => {
  const resp = await new Promise<APIResponse<Account>>((res, _) => {
    //TODO:-> talk to django be.  for now, mock 👍

    const timeout = setTimeout(() => {
      res(
        true
          ? {
              status: "error",
              message: "ERR_INTERNAL",
              description: "The update failed for 123...",
            }
          : {
              status: "success",
              message: "ACC_UPDATED",
            }
      );
      clearTimeout(timeout);
    }, 1000);
  });

  return resp;
};
