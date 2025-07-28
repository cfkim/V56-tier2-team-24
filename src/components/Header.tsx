import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import HeaderLinks from "./HeaderLinks";

export default function Header() {
    const date = useMemo(() => new Date(), []);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

    const currentDate = date.toLocaleDateString(undefined, {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    return (
        <header className="font-roboto bg-background text-bg-text h-20 flex align-center px-10 md:px-16">
            <nav className="w-full max-w-7xl mx-auto flex items-center justify-between">
                <Link to="/" className="text-xl font-semibold">
                    Beacon
                </Link>
                {isLoggedIn && (
                    <ul className="flex gap-2 text-text font-bold h-full items-center">
                        <HeaderLinks to="/" label="Home" />
                        <HeaderLinks to="/info" label="Patient Information" />
                        <HeaderLinks
                            to="/update"
                            label="Update Patient Status"
                        />
                        <HeaderLinks to="/status" label="Patient Status" />
                    </ul>
                )}
                <p>{currentDate}</p>
            </nav>
        </header>
    );
}
