import { useState } from "react";
import { titleCase } from "title-case";

export default function PatientFormTextInput({ name }: { name: string }) {
  const [inputValue, setInputValue] = useState("");
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
      type="text"
      name={name}
      placeholder={placeHolder[name as keyof typeof placeHolder]}
      required
      maxLength={50}
      onChange={(e) => setInputValue(e.target.value)}
      onBlur={(e) => setInputValue(titleCase(e.target.value))}
      value={inputValue}
      className="w-full rounded-xl border-b border-[#C1C7CD] bg-[#F2F4F8] px-4 py-3 placeholder:text-[#697077]"
    />
  );
}
