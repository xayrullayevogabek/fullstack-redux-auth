"use client";
import { getCurrentUser } from "@/lib/utils";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      redirect("/login");
    }
  }, []);

  return <div>This is Home Page</div>;
}
