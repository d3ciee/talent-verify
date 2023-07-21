import { FormEvent, useState } from "react";
import Styles from "./CompanyDetails.module.css";
import {
  Card,
  Stack,
  Input,
  Button,
  DatePicker,
  Divider,
  Textarea,
} from "@nordhealth/react";
import useField from "../../hooks/useField";
import { signInService } from "../../services/signIn";
import useAuth from "../../hooks/useAuth";
import { updateAccountDetails } from "../../services/updateCompanyDetails";

export function CompanyDetails() {
  const { GuardComponent } = useAuth();

  const companyName = useField("company-name");
  const companyRegNo = useField("company-registration-number");

  const companyRegDate = useField("company-registration-date");
  const contactPhone = useField("contact-phone");

  const contactPerson = useField("contact-person");
  const companyAddress = useField("company-address");

  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const can_continue: boolean = [
      companyName,
      companyRegNo,
      companyRegDate,
      contactPerson,
      contactPhone,
      companyAddress,
    ]
      .map((field) => {
        if (!field.value) {
          field.setError(`A ${field.id.replaceAll("-", " ")} is required.`);
          field.focus();
          return false;
        }
        if (!field.valid) {
          field.setError(`Please enter a valid ${field.id.replace("-", " ")}.`);
          field.focus();
          return false;
        }
        return true;
      })
      .every((x) => !!x);

    if (can_continue) {
      setLoading(true);

      const resp = await updateAccountDetails({
        companyName: companyName.value,
        companyRegNo: companyRegNo.value,
        companyRegDate: companyRegDate.value,
        contactPerson: contactPerson.value,
        contactPhone: contactPhone.value,
        companyAddress: companyAddress.value,
      });

      if (resp.status === "success")
        return (window.location.href = "/dashboard");

      setError(resp.description as string);
      setLoading(false);
    }
  }
  return (
    <GuardComponent on={false} goto={`/sign-in?redirect=/details`}>
      <div className={Styles["container"]}>
        <Card padding="l" className={Styles["card"]}>
          <h2 slot="header">
            Company details{" "}
            <h5
              style={{
                fontWeight: 400,
              }}
            >
              Fill in the form below with your company details to continue
            </h5>
          </h2>
          <form action="#" onSubmit={handleSubmit}>
            <Stack>
              <Stack direction="horizontal">
                <Input
                  label="Company name"
                  expand
                  required
                  type="text"
                  placeholder=""
                  {...companyName.inputProps}
                />

                <Input
                  label="Registration number"
                  expand
                  required
                  type="text"
                  {...companyRegNo.inputProps}
                />
              </Stack>
              <Stack direction="horizontal">
                <DatePicker
                  label="Date of registration"
                  required
                  placeholder=""
                  {...companyRegDate.inputProps}
                />
              </Stack>

              <Divider />

              <Stack direction="horizontal">
                <Input
                  label="Contant person"
                  expand
                  required
                  type="text"
                  {...contactPerson.inputProps}
                />
                <Input
                  label="Contant phone"
                  expand
                  required
                  type="tel"
                  {...contactPhone.inputProps}
                />
              </Stack>
              <Textarea
                label="Address"
                expand
                required
                {...companyAddress.inputProps}
              />
            </Stack>
            <label
              style={{
                marginTop: "var(--n-space-xs)",
                color: "var(--n-color-text-error)",
              }}
            >
              {error}ㅤ
            </label>

            <Button
              loading={loading}
              className={Styles["submit-button"]}
              type="submit"
              expand
              variant="primary"
            >
              Continue
            </Button>
          </form>
        </Card>
      </div>
    </GuardComponent>
  );
}

{
  /* <Stack direction="horizontal">
<Input
  label="Company name"
  expand
  type="text"
  {...companyName.inputProps}
/>

<Input
  label="Company reg. #"
  expand
  placeholder="zw-123-235-665"
  type="text"
  {...companyRegNo.inputProps}
/>
</Stack>

<Textarea label="Address" expand {...companyAddress.inputProps} />
<Stack direction="horizontal">
<Input
  label="Contact Phone"
  expand
  type="tel"
  required
  placeholder="+263 777 1234 567"
  {...contactPhone.inputProps}
/>

<Input
  required
  label="Contact Person"
  expand
  type="text"
  {...contactPerson.inputProps}
/>
</Stack> */
}

export {};

// const contactPhone = useField("contact-phone");
// const contactPerson = useField("contact-person");
// const companyName = useField("company-name");
// const companyRegNo = useField("company-reg-no");
// const companyAddress = useField("company-address");
