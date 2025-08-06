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
      roles: ["surgeon", "admin"],
    },
    { to: "/update", label: "Update Patient Status", roles: ["admin"] },
  ];

  return (
    <header className="font-nunito bg-background text-header-text align-center flex h-14 px-1.5 text-xs md:h-20 md:px-6 md:text-base">
      <nav className="mx-auto flex w-full items-center justify-center relative">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xl font-semibold">
            Beacon
          </Link>
          <p>{currentDate}</p>
        </div>
        
        {isLoggedIn && (
          <ul className="text-text hidden h-full items-center gap-2 font-bold md:flex absolute left-6">
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
          </ul>
        )}
        
        {isLoggedIn && (
          <div className="absolute right-6">
            <ProfileIcon setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
          </div>
        )}
      </nav>
    </header>
  );
}
