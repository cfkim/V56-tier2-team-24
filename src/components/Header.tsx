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
        <header className="text-xs md:text-base font-nunito bg-background text-header-text h-14 md:h-20 flex align-center px-6 md:px-16">
            <nav className="w-full max-w-7xl mx-auto flex items-center justify-between">
                <Link to="/" className="text-xl font-semibold">
                    Beacon
                </Link>
                <ul className="md:flex hidden gap-2 text-text font-bold h-full items-center">
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
                <div className="flex items-center gap-4">
                    <p>{currentDate}</p>
                    {isLoggedIn && <ProfileIcon />}
                </div>
            </nav>
        </header>
    );
}
