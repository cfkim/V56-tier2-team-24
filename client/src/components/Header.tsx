import { useMemo } from "react";
import { Link } from "react-router-dom";
import type { Role } from "../types/Role";
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
    <header className="font-nunito bg-background text-header-text align-center flex h-14 px-6 text-xs sm:h-20 sm:text-base">
      <nav className="mx-auto flex w-full items-center justify-between">
        <div className="flex items-center">
          <button className="text-bg-text z-10 block cursor-pointer sm:hidden">
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
          <Link to="/" className="px-4 text-xl font-semibold sm:px-16">
            Beacon
          </Link>
        </div>
        <ul className="text-text hidden h-full items-center gap-2 font-bold sm:flex">
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
        <div className="flex items-center gap-4">
          <p>{currentDate}</p>
          {isLoggedIn && (
            <ProfileIcon
              role={role}
              setIsLoggedIn={setIsLoggedIn}
              setUser={setUser}
            />
          )}
        </div>
      </nav>
    </header>
  );
}
