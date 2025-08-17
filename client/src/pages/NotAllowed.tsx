import { Link, Navigate } from "react-router-dom";
import type { Role } from "../types/Role";

export default function NotAllowed({ role }: { role?: Role }) {
  if (role === "admin") return <Navigate to="/" />;

  return (
    <section className="font-nunito mx-auto grid h-full max-w-3xl grid-rows-2 gap-8 px-8 pt-16 text-sm font-semibold sm:grid-rows-3 md:text-base lg:text-lg xl:text-xl">
      <div className="flex flex-col gap-8 sm:row-span-2 sm:gap-9">
        <div className="flex gap-2.5 rounded-xl bg-[#F1F1F1] px-7 py-6 sm:px-8 md:gap-3 md:px-10 md:py-7 lg:px-12 xl:gap-3.5 xl:px-16 xl:py-8">
          <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 flex-shrink-0 sm:h-7 sm:w-7"
          >
            <g clipPath="url(#clip0_328_5592)">
              <path
                d="M12.0001 14.6667C14.9456 14.6667 17.3334 12.2789 17.3334 9.33333C17.3334 6.38781 14.9456 4 12.0001 4C9.05456 4 6.66675 6.38781 6.66675 9.33333C6.66675 12.2789 9.05456 14.6667 12.0001 14.6667Z"
                stroke="#CDA90C"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 28V25.3333C4 23.9188 4.5619 22.5623 5.5621 21.5621C6.56229 20.5619 7.91885 20 9.33333 20H14.6667C16.0812 20 17.4377 20.5619 18.4379 21.5621C19.4381 22.5623 20 23.9188 20 25.3333V28"
                stroke="#CDA90C"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M25.3333 9.3335V13.3335"
                stroke="#CDA90C"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M25.3333 18.6665V18.6798"
                stroke="#CDA90C"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_328_5592">
                <rect width="32" height="32" fill="white" />
              </clipPath>
            </defs>
          </svg>

          <p className="text-base text-[#707070] sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
            This section is for authorized medical staff only. Thank you for
            your understanding!
          </p>
        </div>
        <div className="flex flex-col gap-2.5 sm:gap-3">
          <p>
            If you're looking for status updates, please view the{" "}
            <Link className="font-bold text-[#082368] underline" to={"/status"}>
              Patient Status tab
            </Link>
            .
          </p>
          {role === "surgeon" && (
            <p>
              If you're looking to update patient status, please view the{" "}
              <Link
                className="font-bold text-[#082368] underline"
                to={"/update"}
              >
                Update Patient Status
              </Link>{" "}
              tab or ask our chatbot/reception for help.
            </p>
          )}
          {role === "surgeon" ? (
            <p>
              If you're an admin staff, please{" "}
              <Link className="font-bold text-[#082368] underline" to="/login">
                Login
              </Link>
              .
            </p>
          ) : (
            <p>
              If you're a medical staff, please{" "}
              <Link className="font-bold text-[#082368] underline" to="/login">
                Login
              </Link>
              .
            </p>
          )}
        </div>
      </div>
      <div />
    </section>
  );
}
