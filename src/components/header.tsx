"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, removeItem } from "@/lib/utils";
import Link from "next/link";

const Header = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleLogout = async () => {
    router.push("/login");
    removeItem("user");
    setUser(null);
  };

  return (
    <div className="w-full bg-slate-400 p-5 flex items-center justify-between">
      <h1>Redux Auth</h1>
      <ul className=" flex items-center gap-5">
        {!user ? (
          <>
            <li>
              <Link href={"/login"}>Login</Link>
            </li>
            <li>
              <Link href={"/register"}>Register</Link>
            </li>
          </>
        ) : (
          <li>
            <button onClick={handleLogout}>LogOut</button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Header;
