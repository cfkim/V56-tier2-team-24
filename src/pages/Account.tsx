import { useEffect, useState } from "react";
import { getUser } from "../lib/api";

export default function Account() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser();
        console.log("fetched user:", data);
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
          {user ? `Welcome, ${user.user.email}` : "Loading user data..."}
    </h1>
    <button>Sign out</button>
  </>
    
      
  );
}
