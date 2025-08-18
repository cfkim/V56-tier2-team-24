import { Link, useNavigate } from "react-router-dom";
import { useAuthActions, useIsLoggedIn, useRole } from "../stores/authStore";
import type { Role } from "../types/Role";

function capitalize(role: Role) {
  return role.charAt(0).toUpperCase() + role.slice(1);
}

export default function Home() {
  const isLoggedIn = useIsLoggedIn();
  const role = useRole();
  const { setIsLoggedIn, setRole } = useAuthActions();

  const navigate = useNavigate();
  const guestLogin = () => {
    setIsLoggedIn(true);
    setRole("guest");
    navigate("/");
  };

  return (
    <section className="h-full px-1.5 sm:px-6">
      <div className="relative flex w-full flex-col items-center overflow-hidden sm:flex-row">
        <div className="absolute inset-0 z-0 hidden w-1/2 overflow-visible bg-white/60 blur-[80px] filter sm:block" />
        <div className="text-header-black font-nunito flex flex-col sm:absolute sm:inset-0 sm:w-1/2 sm:gap-2 sm:py-4 sm:pl-6 md:gap-4 md:py-10 md:pl-8 lg:gap-6 lg:py-14 lg:pl-10 xl:gap-10 xl:py-20 xl:pl-14">
          <div className="mx-auto flex w-3/4 flex-col gap-3 py-6 text-center sm:w-full sm:text-start md:gap-3.5">
            {isLoggedIn && role && (
              <h2 className="font-kaisei text-xl font-bold md:text-2xl lg:text-3xl">
                Hi, {capitalize(role)}
              </h2>
            )}
            <h1 className="font-kaisei text-2xl font-bold md:text-3xl lg:text-4xl xl:text-6xl">
              Track Surgery Patient Status in Real-Time
            </h1>
            <p className="text-sm font-semibold md:text-base lg:text-lg xl:text-xl">
              Surgical procedures can be stressful for loved ones waiting
              nearby. Beacon shows real-time patient progress from check-in to
              recovery so you're less anxious and more in tune with what's
              happening.
            </p>
          </div>
          <div className="relative">
            {!isLoggedIn && (
              <div className="absolute inset-x-0 bottom-1/5 z-30 flex flex-col items-center gap-3 font-semibold sm:static sm:flex-row sm:text-sm md:text-base lg:text-lg xl:text-xl">
                <Link
                  className="bg-primary text-background relative flex w-5/12 min-w-fit items-center justify-center gap-1 rounded-xl px-2.5 py-3 pr-8 text-xs sm:w-fit sm:gap-1 sm:px-8 sm:pr-10 sm:text-sm md:text-base lg:gap-2 lg:py-5 lg:text-lg xl:text-xl"
                  to={"/login"}
                >
                  Authorization Login
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-2 h-5 w-5 sm:h-6 sm:w-6"
                    viewBox="0 -960 960 960"
                    fill="currentColor"
                  >
                    <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
                  </svg>
                </Link>
                <button
                  className="bg-background/50 text-primary border-primary w-5/12 min-w-fit cursor-pointer rounded-xl border border-2 px-2.5 py-3 text-xs sm:w-fit sm:gap-1 sm:px-4 sm:text-sm md:text-base lg:gap-2 lg:px-8 lg:py-5 lg:text-lg xl:text-xl"
                  onClick={() => guestLogin()}
                >
                  Guest Access
                </button>
              </div>
            )}
            <img
              src="/static/images/hero-mobile.svg"
              alt="Hero"
              className="z-[-1] block h-auto w-full rounded-t-[3.125rem] object-top opacity-95 sm:hidden"
            />
          </div>
        </div>
        <img
          src="/static/images/hero.svg"
          alt="Hero"
          className="z-[-1] hidden h-auto w-full rounded-t-[3.125rem] object-top opacity-95 sm:block"
        />
      </div>
    </section>
  );
}
