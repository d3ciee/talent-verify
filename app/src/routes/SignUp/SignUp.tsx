import { FormEvent, useState } from "react";
import Styles from "./SignUp.module.css";
import { Card, Stack, Input, Button } from "@nordhealth/react";
import useField from "../../hooks/useField";
import { signUpService } from "../../services/signUp";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export function SignUpPage() {
  const { GuardComponent } = useAuth();

  const username = useField("username");
  const password = useField(
    "password",
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  );
  const confirmPassword = useField("confirm-password");
  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!username.valid) {
      if (!username.value) username.setError("An email is required.");
      username.setError("Please enter a valid email");
      username.focus();
    }

    if (!password.valid) {
      if (!password.value) password.setError("A password is required.");
      password.setError("Please enter a stronger password.");
      password.focus();
    }

    if (confirmPassword.value !== password.value) {
      confirmPassword.setError("Please make sure the 2 passwords match.");
      confirmPassword.focus();
    }

    if (username.valid && password.valid) {
      setLoading(true);
      const resp = await signUpService(
        username.value,
        password.value,
        confirmPassword.value
      );

      if (resp.status === "success") return (window.location.href = "/details");

      setError(resp.description as string);
      setLoading(false);
    }
  }
  return (
    <GuardComponent on={true} goto={`/c`}>
      <div className={Styles["container"]}>
        <Card padding="l" className={Styles["card"]}>
          <h2 slot="header">Sign up for Talent Verify</h2>
          <form action="#" onSubmit={handleSubmit}>
            <Stack direction="vertical">
              <Input
                label="Username"
                hint="NB: Use this username to log into your account later."
                expand
                required
                type="text"
                placeholder="peter"
                {...username.inputProps}
              />

              <Input
                label="Password"
                expand
                required
                hint="Minimum eight characters, at least one letter and one number"
                type="password"
                placeholder="••••••••"
                {...password.inputProps}
              />

              <Input
                label="Confirm Password"
                expand
                required
                type="password"
                placeholder="••••••••"
                {...confirmPassword.inputProps}
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

        <Card className={Styles["card"]}>
          <Link to="/sign-in">Already have an account?</Link>
        </Card>
      </div>
    </GuardComponent>
  );
}
