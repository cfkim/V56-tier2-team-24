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
    <li className="flex h-full items-center">
      <NavLink
        to={to}
        className={({ isActive }) =>
          cn(
            "flex h-full items-center px-4 pt-1",
            isActive ? "text-primary" : "hover:text-primary",
          )
        }
      >
        {label}
      </NavLink>
    </li>
  );
}
