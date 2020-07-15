import React from "react";

export default function Button({
  handleSubmit,
  isSubmitting,
  compoment,
  isValid,
  value,
  type,
}) {
  const button = compoment || "button";

  return (
    <button
      {...(isSubmitting && { disabled: true })}
      {...(!isValid && { disabled: true })}
      type={type || "submit"}
      onClick={handleSubmit}
    >
      {value}
    </button>
  );
}
