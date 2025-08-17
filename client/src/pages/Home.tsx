import { Link, useNavigate } from "react-router-dom";
import type { Role } from "../types/Role";
import Chatbot from "../components/Chatbot";
import { useState } from "react";
import { Chat } from "@google/genai";

function capitalize(role: Role) {
  return role.charAt(0).toUpperCase() + role.slice(1);
}

export default function Home({
  role,
  isLoggedIn,
  setIsLoggedIn,
  setRole,
}: {
  role: Role | undefined;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setRole: React.Dispatch<React.SetStateAction<Role | undefined>>;
}) {
  const navigate = useNavigate();
  const guestLogin = () => {
    setIsLoggedIn(true);
    setRole("guest");
    navigate("/");
  };
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <section className="mb-[-0.5rem] px-1.5 sm:px-6 relative">
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
        
        <div className="absolute z-100 bottom-0 right-0">
          {showChatbot && (
            <div className="flex flex-col md:w-[600px] gap-2 px-5">
              <Chatbot></Chatbot>
              <div className="flex justify-end">
                <button className="h-15 w-15 rounded-full bg-accent flex justify-center items-center hover:cursor-pointer" onClick={() => setShowChatbot(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#000000">
                  <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>
                </button>
              </div>
              
            </div>
          )}
        </div>
      </div>
      {!showChatbot &&
        (
          <button className="w-30 h-30 flex items-center justify-center bg-accent rounded-l-2xl hover:cursor-pointer absolute z-100 right-0 bottom-30" onClick={() => setShowChatbot(!showChatbot)}>
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_4418_5763)">
              <path d="M8.5 19H8C4 19 2 18 2 13V8C2 4 4 2 8 2H16C20 2 22 4 22 8V13C22 17 20 19 16 19H15.5C15.19 19 14.89 19.15 14.7 19.4L13.2 21.4C12.54 22.28 11.46 22.28 10.8 21.4L9.3 19.4C9.14 19.18 8.77 19 8.5 19Z" stroke="#1c0000" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path opacity="0.4" d="M15.9965 11H16.0054" stroke="#1c0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path opacity="0.4" d="M11.9955 11H12.0045" stroke="#1c0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path opacity="0.4" d="M7.99451 11H8.00349" stroke="#1c0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
              <defs>
              <clipPath id="clip0_4418_5763">
              <rect width="30" height="30" fill="none"/>
              </clipPath>
              </defs>
            </svg>
          </button>
        )}
    </section>
  );
}
