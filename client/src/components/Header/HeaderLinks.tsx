import { NavLink } from "react-router-dom";
import cn from "../../utils/cn";

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
            "flex h-full items-center px-2 sm:px-2.5 sm:pt-1 md:px-3 lg:px-3.5 xl:px-4",
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
