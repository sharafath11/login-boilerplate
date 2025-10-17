"use client"
import { authService } from "@/services/authService";
import { IUser } from "@/types/userTypes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<IUser|null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    
    const res = await authService.getUser();
    // console.log("abcs",res)
      if (!res?.ok || !res?.data) {
        return router.push("/login");
      }
      setUser(res.data);
   
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading user data...</p>
      </div>
    );
  }

  if (user) {
    return (
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <h1>Welcome, {user.name || user.email}!</h1>
        <p>This is your protected Home page content.</p>
      </div>
    );
  }

  return null;
}