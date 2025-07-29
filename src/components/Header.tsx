import { useMemo } from "react";
import { Link } from "react-router-dom";
import type { Role } from "../types/Role";
import HeaderLinks from "./HeaderLinks";
import ProfileIcon from "./ProfileIcon";

export default function Header({
  role,
  isLoggedIn,
}: {
  role: Role | undefined;
  isLoggedIn: boolean;
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
      roles: ["surgeon", "admin"],
    },
    { to: "/update", label: "Update Patient Status", roles: ["admin"] },
  ];

  return (
    <header className="font-nunito bg-background text-header-text align-center flex h-14 px-6 text-xs md:h-20 md:px-16 md:text-base">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <Link to="/" className="text-xl font-semibold">
          Beacon
        </Link>
        <ul className="text-text hidden h-full items-center gap-2 font-bold md:flex">
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
          {isLoggedIn && <ProfileIcon />}
        </div>
      </nav>
    </header>
  );
}
