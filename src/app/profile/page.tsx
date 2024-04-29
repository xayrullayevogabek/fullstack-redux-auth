"use client";
import { getCurrentUser } from "@/lib/utils";
import { redirect } from "next/navigation";
import React from "react";

const Profile = () => {
  const user = getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className=" w-full h-screen flex items-center pt-20 flex-col">
      <div className="flex items-center gap-2">
        <h2>Name:</h2>
        <span>{user.name}</span>
      </div>
      <div className="flex items-center gap-2">
        <h2>Email:</h2>
        <span>{user.email}</span>
      </div>
      <div className="flex items-center gap-2">
        <h2>Username:</h2>
        <span>{user.username}</span>
      </div>
      <div className="flex items-center gap-2">
        <h2>Created:</h2>
        <span>{user.createdAt}</span>
      </div>
      <div className="flex items-center gap-2">
        <h2>Updated:</h2>
        <span>{user.updatedAt}</span>
      </div>
    </div>
  );
};

export default Profile;
