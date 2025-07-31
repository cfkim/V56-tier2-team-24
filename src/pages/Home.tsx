import { useEffect, useState } from "react";
import Hero from "../components/hero";
import { getUser } from "../lib/api";

export default function Home() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
      useEffect(() => {
        const fetchUser = async () => {
          try {
            const data = await getUser();
            setUser(data);
            setLoading(false);
            console.log("User data fetched:", data);
          } catch (err) {
            console.error("failed to fetch user:", err);
          }
        };
    
        fetchUser();

      }, []);
    return <Hero user={user} isLoading={loading}></Hero>
}
