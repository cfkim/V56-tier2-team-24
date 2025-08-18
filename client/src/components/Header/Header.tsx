import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { Role } from "../../types/Role";
import Sidebar from "../Sidebar";
import HeaderLinks from "./HeaderLinks";
import ProfileIcon from "./ProfileIcon";

export default function Header({
  role,
  isLoggedIn,
  setIsLoggedIn,
  setUser,
}: {
  role: Role | undefined;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}) {
  const date = useMemo(() => new Date(), []);
  const [isOpen, setIsOpen] = useState(false);

  const currentDate = date.toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  interface NavLinkItem {
    to: string;
    label: string;
    roles: Role[];
  }

  const navLinks: NavLinkItem[] = [
    {
      to: "/status",
      label: "Patient Status",
      roles: ["guest", "surgeon", "admin"],
    },
    {
      to: "/info",
      label: "Patient Information",
      roles: ["admin"],
    },
    {
      to: "/update",
      label: "Update Patient Status",
      roles: ["admin", "surgeon"],
    },
  ];

  return (
    <header className="font-nunito bg-background text-header-text align-center flex h-14 flex-none px-6 text-xs sm:h-20 sm:text-base">
      <nav className="mx-auto flex w-full items-center justify-between">
        <div className="flex items-center">
          <button
            className="text-bg-text z-10 block cursor-pointer sm:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
            </svg>
          </button>
          <Link
            to="/"
            className="mx-4 flex items-center gap-2.5 text-base font-semibold sm:mx-7 sm:gap-3 md:mx-10 md:gap-3.5 lg:mx-13 lg:gap-4 lg:text-lg xl:mx-16 xl:gap-5 xl:text-xl"
          >
            <img
              className="hidden h-10 sm:inline-block"
              src="/favicon.svg"
              alt="Beacon Logo"
            />
            Beacon
          </Link>
        </div>
        <ul className="text-text hidden h-full items-center text-xs sm:flex sm:gap-0.5 md:gap-1 md:text-sm lg:gap-1.5 xl:gap-2 xl:text-base">
          {isLoggedIn && (
            <>
              <HeaderLinks to="/" label="Home" />
              {navLinks
                .filter((link) => link.roles.includes(role!))
                .map((link) => {
                  return (
                    <HeaderLinks
                      key={link.to}
                      to={link.to}
                      label={link.label}
                    />
                  );
                })}
            </>
          )}
        </ul>
        <div className="flex items-center gap-4 pt-1 text-xs md:text-sm xl:text-base">
          <p>{currentDate}</p>
          {isLoggedIn && (
            <ProfileIcon
              role={role}
              setIsLoggedIn={setIsLoggedIn}
              setUser={setUser}
            />
          )}
        </div>
        <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <nav className="flex h-full flex-col">
            <button
              className="text-header-black mb-7 cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="34px"
                viewBox="0 -960 960 960"
                width="34px"
                fill="currentColor"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </button>
            <ul className="text-text flex flex-1 flex-col gap-2">
              {isLoggedIn && (
                <>
                  <HeaderLinks to="/" label="Home" />
                  {navLinks
                    .filter((link) => link.roles.includes(role!))
                    .map((link) => {
                      return (
                        <HeaderLinks
                          key={link.to}
                          to={link.to}
                          label={link.label}
                        />
                      );
                    })}
                </>
              )}
            </ul>
            {isLoggedIn && (
              <div className="border-t border-[#D3D3D3] py-5">
                <ProfileIcon
                  role={role}
                  setIsLoggedIn={setIsLoggedIn}
                  setUser={setUser}
                  forSidebar={true}
                />
              </div>
            )}
          </nav>
        </Sidebar>
      </nav>
    </header>
  );
}
