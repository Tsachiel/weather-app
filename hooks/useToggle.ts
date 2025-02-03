import { useState } from "react";

export function useToggle(initialValue: boolean = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = (newValue?: boolean) => {
    setValue((prev) => (newValue !== undefined ? newValue : !prev));
  };

  return { value, toggle };
}
