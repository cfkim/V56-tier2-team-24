import * as countryCodes from "country-codes-list";
import { useState } from "react";
import cn from "../../utils/cn";

export default function PhoneNumberInput({
  countryCodeError,
  phoneNumberError,
}: {
  countryCodeError: string | undefined;
  phoneNumberError: string | undefined;
}) {
  const [phoneNumber, setPhoneNumber] = useState("");

  const formatPhoneNumber = (value: string) => {
    if (!value) return "";
    const phoneNumber = value.replace(/\D/g, "");
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) {
      return phoneNumber;
    }
    if (phoneNumberLength < 7) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    }
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(formatPhoneNumber(e.target.value) || "");
  };

  const phoneNumberRegex = "^\\d{3}-\\d{3}-\\d{4}$";

  const myCountryCodesObject: Record<string, string> = countryCodes.customList(
    "countryNameEn",
    "+{countryCallingCode}",
  );

  return (
    <div className="flex gap-2">
      <div className="relative flex gap-2">
        <select
          id="countryCode"
          name="countryCode"
          required
          className={cn(
            "0 focus:outline-primary w-20 min-w-0 cursor-pointer appearance-none rounded-xl border-b border-[#C1C7CD] bg-[#F2F4F8] px-1 py-3 pl-2 focus:outline-2",
            countryCodeError && "border-red",
          )}
        >
          <option></option>
          {Object.entries(myCountryCodesObject).map(
            ([countryName, callingCode]) => (
              <option
                key={countryName}
                value={callingCode}
                className="text-[#697077]"
              >
                {callingCode}
              </option>
            ),
          )}
        </select>
        <svg
          className="pointer-events-none absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 text-[#697077]"
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="currentColor"
        >
          <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
        </svg>
      </div>
      <input
        type="tel"
        id="phoneNumber"
        name="phoneNumber"
        placeholder="123-456-7890"
        required
        inputMode="tel"
        maxLength={12}
        onChange={handlePhoneNumberChange}
        value={phoneNumber}
        pattern={phoneNumberRegex}
        className={cn(
          "focus:outline-primary w-full rounded-xl border-b border-[#C1C7CD] bg-[#F2F4F8] px-4 py-3 placeholder:text-[#697077] focus:outline-2",
          phoneNumberError && "border-red",
        )}
      />
    </div>
  );
}
