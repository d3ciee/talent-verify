import { Account } from "../types/company/account";
import { APIResponse } from "../types/global";

interface updateAccountDetailsProps {
  companyName: string;
  companyRegNo: string;
  companyRegDate: string;
  contactPerson: string;
  contactPhone: string;
  companyAddress: string;
  companyEmail: string;
  companyEmployees: number;
}

// {
// 	"name": "Acme Corporation",
// 	"registration_number": "123456789",
// 	"date_of_registration": "2022-01-01",
// 	"address": "123 Main St, Springfield",
// 	"contact_person": "John Doe",
// 	"contact_phone": "+1-555-1234",
// 	"number_of_employees": 100,
// 	"email": "info@acme.com"
// }

export const updateAccountDetails: (
  arg0: updateAccountDetailsProps
) => Promise<APIResponse<Account>> = async (
 { companyName,
  companyRegNo,
  companyRegDate,
  contactPerson,
  contactPhone,
  companyAddress,
  companyEmail,
  companyEmployees,
}
) => {

 try {
    const resp = await fetch("http://localhost:8000/company/update/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + sessionStorage.getItem("key"),
      },
      body: JSON.stringify({
        name: companyName,
        registration_number: companyRegNo,
        date_of_registration: companyRegDate,
        address: companyAddress,
        contact_person: contactPerson,
        contact_phone: contactPhone,
        number_of_employees: companyEmployees,
        email: companyEmail})
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
};
