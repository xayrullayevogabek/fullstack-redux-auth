"use client";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/redux/slices/register";
import type { AppDispatch, RootState } from "@/redux/store";
import { redirect, useRouter } from "next/navigation";
import { toast } from "sonner";
import { getCurrentUser } from "@/lib/utils";
import Link from "next/link";

const RegisterPage = () => {
  const router = useRouter();
  const store = useSelector((store: RootState) => store.register);
  const dispatch: AppDispatch = useDispatch();
  const user = getCurrentUser();

  useEffect(() => {
    if (user) {
      redirect("/");
    }
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    bio: "",
  });

  const RegisterFormSchema = z.object({
    name: z.string(),
    email: z.string(),
    username: z.string().min(4).max(20),
    password: z.string().min(6),
    bio: z.string(),
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const validatedFormData = RegisterFormSchema.parse(formData);
      const data = await dispatch(registerUser(validatedFormData));
      if (data.type.includes("rejected")) {
        toast.error("This account is already exists");
      } else {
        toast.success("You are successfully registered");
        router.replace("/login");
      }
    } catch (error) {
      toast.error("Check your information");
    }
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="w-full h-screen bg-slate-200 flex justify-center items-center">
      <div className="bg-white flex flex-col justify-center text-center p-8 rounded shadow-lg w-[30vw]">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <form className="text-start" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 p-3 block w-full rounded focus:outline-none border-gray-700 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleInputChange}
              className="mt-1 p-3 block w-full rounded focus:outline-none border-gray-700 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 p-3 block w-full rounded focus:outline-none border-gray-700 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 p-3 block w-full focus:outline-none rounded border-gray-700 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700"
            >
              Bio
            </label>
            <textarea
              className="p-2 rounded w-full border-gray-700 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              placeholder="Enter your bio here"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              cols={53}
              rows={5}
            ></textarea>
          </div>
          <span className=" mb-5 block">
            Do you have an account ?{" "}
            <Link className=" text-indigo-500" href={"/register"}>
              Login
            </Link>
          </span>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
          >
            {store.loading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
