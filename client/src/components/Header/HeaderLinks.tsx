import { NavLink } from "react-router-dom";
import cn from "../../utils/cn";

export default function HeaderLinks({
  to,
  label,
  onClose,
}: {
  to: string;
  label: string;
  onClose?: () => void;
}) {
  return (
    <li
      className="flex items-center sm:h-full"
      onClick={() => {
        onClose?.();
        window.scrollTo({ top: 0, behavior: "smooth" });
        document.body.style.overflow = "";
      }}
    >
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
