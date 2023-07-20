import { FormEvent, useState } from "react";
import Styles from "./SignIn.module.css";
import { Card, Stack, Input, Button } from "@nordhealth/react";
import useField from "../../hooks/useField";
import { signInService } from "../../services/signIn";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export function SignInPage() {
  const { GuardComponent } = useAuth();

  const email = useField("email", /^\S+@\S+\.\S+$/);
  const password = useField("password");

  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email.valid) {
      if (!email.value) email.setError("An email is required.");
      email.setError("Please enter a valid email");
      email.focus();
    }

    if (!password.value) {
      password.focus();
      password.setError("A password is required.");
    }

    if (email.valid && password.valid) {
      setLoading(true);
      const resp = await signInService(email.value, password.value);

      if (resp.status === "success") return (window.location.href = "/details");

      setError(resp.description as string);
      setLoading(false);
    }
  }
  return (
    <GuardComponent on={true} goto={`/c`}>
      <div className={Styles["container"]}>
        <Card padding="l" className={Styles["card"]}>
          <h2 slot="header">Sign in to Talent Verify</h2>
          <form action="#" onSubmit={handleSubmit}>
            <Stack direction="vertical">
              <Input
                label="Email"
                expand
                required
                type="email"
                placeholder="user@example.com"
                {...email.inputProps}
              />

              <Input
                label="Password"
                expand
                required
                type="password"
                placeholder="••••••••"
                {...password.inputProps}
              />
            </Stack>

            <label
              style={{
                marginTop: "var(--n-space-xs)",
                color: "var(--n-color-text-error)",
              }}
            >
              ㅤ{error}
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
          <Link to="/sign-up">Don't have an account?</Link>
        </Card>
      </div>
    </GuardComponent>
  );
}
