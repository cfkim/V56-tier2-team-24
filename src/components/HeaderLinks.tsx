import { NavLink } from "react-router-dom";
import cn from "../utils/cn";

export default function HeaderLinks({
    to,
    label,
}: {
    to: string;
    label: string;
}) {
    return (
        <li className="h-full flex items-center">
            <NavLink
                to={to}
                className={({ isActive }) =>
                    cn(
                        "h-full flex items-center border-b-4 px-4 pt-1",
                        isActive
                            ? "text-primary border-primary"
                            : "border-transparent hover:border-primary"
                    )
                }>
                {label}
            </NavLink>
        </li>
    );
}
