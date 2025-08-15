import { useState } from "react";
import { titleCase } from "title-case";
import cn from "../../utils/cn";

export default function PatientFormTextInput({
  name,
  isEdit,
  defaultValue,
}: {
  name: string;
  isEdit?: boolean;
  defaultValue?: string;
}) {
  const [inputValue, setInputValue] = useState(defaultValue || "");
  const placeHolder = {
    firstName: "Jane",
    lastName: "Doe",
    streetAddress: "123 Main St",
    city: "New York",
    state: "NY",
    country: "United States",
  };
  return (
    <input
      id={name}
      type="text"
      name={name}
      placeholder={placeHolder[name as keyof typeof placeHolder]}
      required
      maxLength={50}
      readOnly={isEdit}
      onChange={(e) => setInputValue(e.target.value)}
      onBlur={(e) => setInputValue(titleCase(e.target.value))}
      value={inputValue}
      className={cn(
        "focus:outline-primary w-full rounded-xl border-b border-[#C1C7CD] bg-[#F2F4F8] px-4 py-3 placeholder:text-[#697077] focus:outline-2",
        isEdit &&
          "bg-accent pointer-events-none cursor-not-allowed text-[#B5B16F]",
      )}
    />
  );
}
