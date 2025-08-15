import { useState } from "react";
import cn from "../../utils/cn";

export default function EmailInput({
  email,
  emailErrors,
}: {
  email: string;
  emailErrors: string | undefined;
}) {
  const [emailVal, setEmailVal] = useState(email || "");
  return (
    <>
      <input
        type="email"
        name="email"
        placeholder="c7TlG@example.com"
        required
        inputMode="email"
        maxLength={50}
        value={emailVal}
        onChange={(e) => setEmailVal(e.target.value)}
        className={cn(
          "focus:outline-primary w-full rounded-xl border-b border-[#C1C7CD] bg-[#F2F4F8] px-4 py-3 placeholder:text-[#697077] focus:outline-2",
          emailErrors && "border-red",
        )}
      />
      {emailErrors && <div className="text-red">{emailErrors}</div>}
    </>
  );
}
