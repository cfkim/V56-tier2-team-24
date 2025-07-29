import { Link, useNavigate } from "react-router-dom";
import type { Role } from "../types/Role";

function capitalize(role: Role) {
  return role.charAt(0).toUpperCase() + role.slice(1);
}

export default function Home({
  role,
  isLoggedIn,
  setIsLoggedIn,
}: {
  role: Role | undefined;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  const guestLogin = () => {
    setIsLoggedIn(true);
    navigate("/");
  };
  return (
    <section className="px-1.5 md:px-6">
      <div className="relative flex w-full items-center">
        <img
          src="/static/images/hero.svg"
          alt="Hero"
          className="z-[-1] h-auto w-full rounded-t-[3.125rem] object-top"
        />
        <div className="text-bg-text font-nunito absolute inset-0 flex w-1/2 flex-col justify-between py-24 pl-14">
          <div className="flex flex-col gap-3.5">
            {role && (
              <h2 className="font-kaisei text-lg font-bold md:text-3xl">
                Hi, {capitalize(role)}
              </h2>
            )}
            <h1 className="font-kaisei text-2xl font-bold md:text-5xl">
              Track Surgery Patient Status in Real-Time
            </h1>
            <p className="md:text-xl">
              Surgical procedures can be stressful for loved ones waiting
              nearby. Beacon shows real-time patient progress from check-in to
              recovery so you're less anxious and more in tune with what's
              happening.
            </p>
          </div>
          {!isLoggedIn && (
            <div className="flex gap-3">
              <Link
                className="bg-primary text-background rounded-xl px-8 py-5"
                to={"/login"}
              >
                Authorization Login
              </Link>
              <button
                className="bg-background/50 text-primary border-primary cursor-pointer rounded-xl border border-2 px-8 py-5"
                onClick={() => guestLogin()}
              >
                Guest Access
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
