import { useRef, useState, useEffect } from "react";

export default function useField(
  name: string,
  validation_regex?: RegExp,
  initialValue = ""
) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string>();
  const ref = useRef<any>(null);

  const valid = validation_regex
    ? validation_regex?.test(value)
    : Boolean(value);

  useEffect(() => {
    if (valid) {
      setError(undefined);
    }
  }, [valid]);

  return {
    setError,
    valid,
    value,
    focus: () => ref.current?.focus(),
    inputProps: {
      name,
      value,
      onChange: (e: Event) => {
        const input: any = e.target;
        setValue(input.value);
      },
      error,
      ref,
    },
  };
}

export {};
