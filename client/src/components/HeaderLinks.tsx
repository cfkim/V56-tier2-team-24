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
    <li className="flex items-center sm:h-full">
      <NavLink
        to={to}
        className={({ isActive }) =>
          cn(
            "flex h-full items-center sm:px-4 sm:pt-1",
            isActive
              ? "text-primary font-bold"
              : "hover:text-primary hover:font-bold",
          )
        }
      >
        {label}
      </NavLink>
    </li>
  );
}
