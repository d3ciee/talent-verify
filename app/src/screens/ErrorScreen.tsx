import { EmptyState, Stack, Button } from "@nordhealth/react";

interface ErrorScreenProps {
  description: string;
  buttons: {
    primary: {
      title: string;
      action?: () => void;
      href?: string;
    };
    secondary?: {
      title: string;
      action?: () => void;
      href?: string;
    };
  };
}

export function ErrorScreen({ description, buttons }: ErrorScreenProps) {
  return (
    <EmptyState
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <h2>Something went wrong</h2>
      <p>{description}</p>
      <Stack justify-content="center" gap="s" direction="horizontal">
        {buttons.secondary && (
          <Button
            onClick={buttons.secondary.action}
            href={buttons.secondary.href}
          >
            {buttons.secondary.title}
          </Button>
        )}
        {buttons.primary && (
          <Button
            variant="primary"
            onClick={buttons.primary.action}
            href={buttons.primary.href}
          >
            {buttons.primary.title}
          </Button>
        )}
      </Stack>
    </EmptyState>
  );
}
