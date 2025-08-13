import { useState } from "react";
import cn from "../../utils/cn";

const phoneNumberRegex = "/^[2-9]\\d{2}-\\d{3}-\\d{4}$/";
const internationalCountryCodeRegex = "/^\\+?[1-9][0-9]{1,3}$/";

export default function PhoneNumberInput({
  countryCodeError,
  phoneNumberError,
}: {
  countryCodeError: string | undefined;
  phoneNumberError: string | undefined;
}) {
  const [countryCode, setCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const formatCountryCode = (value: string) => {
    if (!value) return "";
    const countryCode = value.replace(/\D/g, "");
    if (!countryCode) return "+";
    return `+${countryCode.slice(0, 3)}`;
  };

  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountryCode(formatCountryCode(e.target.value) || "");
  };

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

  return (
    <div className="flex gap-2">
      <input
        type="tel"
        id="countryCode"
        name="countryCode"
        placeholder="+999"
        required
        inputMode="tel"
        maxLength={4}
        value={countryCode}
        onChange={handleCountryCodeChange}
        pattern={internationalCountryCodeRegex}
        className={cn(
          "w-20 min-w-0 rounded-xl border-b border-[#C1C7CD] bg-[#F2F4F8] px-1 py-3 text-center placeholder:text-[#697077]",
          countryCodeError && "border-red",
        )}
      />
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
          "w-full rounded-xl border-b border-[#C1C7CD] bg-[#F2F4F8] px-4 py-3 placeholder:text-[#697077]",
          phoneNumberError && "border-red",
        )}
      />
    </div>
  );
}
