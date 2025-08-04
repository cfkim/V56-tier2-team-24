import { useEffect, useState } from "react";
import { getUser, logout } from "../lib/api";
import Hero from "../components/hero";

// basic profile page to validate login
export default function Account() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser();
        setUser(data);
      } catch (err) {
        console.error("failed to fetch user:", err);
      }
    };

    fetchUser();
  }, []);

  return (
   <>
    <h1 className="text-2xl">
        {user ? `Welcome, ${user.user.email}. You are an ${user.user.role}.` : "Loading user data..."}
    </h1>
    <button className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer" onClick={() => logout()}>Sign out</button>
  </>
    
      
  );
}
