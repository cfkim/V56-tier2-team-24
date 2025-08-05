import { logout } from "../lib/api";
import type { User } from "../types/LoginResponse";

// basic profile page to validate login
export default function Account({ user }: { user: User | undefined }) {
  return (
    <>
      <h1 className="text-2xl">
        {user
          ? `Welcome, ${user.email}. You are an ${user.role}.`
          : "Loading user data..."}
      </h1>
      <button
        className="cursor-pointer rounded bg-blue-500 px-4 py-2 text-white"
        onClick={() => logout()}
      >
        Sign out
      </button>
    </>
  );
}
