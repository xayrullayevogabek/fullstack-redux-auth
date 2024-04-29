"use client";
import { getCurrentUser, setUser } from "@/lib/utils";
import { loginUser } from "@/redux/slices/login";
import { AppDispatch, RootState } from "@/redux/store";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { z } from "zod";

const LoginPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const store = useSelector((store: RootState) => store.login);
  const router = useRouter();
  const user = getCurrentUser();

  useEffect(() => {
    if (user) {
      redirect("/");
    }
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const LoginFormSchema = z.object({
    email: z.string(),
    password: z.string().min(6),
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const validatedFormData = LoginFormSchema.parse(formData);
      const data = await dispatch(loginUser(validatedFormData));
      if (data.payload.success) {
        toast.success("You are successfully logged in");
        setUser("user", data.payload.user);
        router.push("/profile");
      } else {
        toast.error(data.payload.response.data.message);
      }
    } catch (error) {
      console.log(error);
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
      <div className="bg-white flex flex-col justify-center text-center p-8 rounded shadow-lg w-[30vw] h-[40vh]">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form className="text-start" onSubmit={handleSubmit}>
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
              className="mt-1 p-3 block w-full rounded focus:outline-none border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
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
              className="mt-1 p-3 block w-full focus:outline-none rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            />
          </div>
          <span className=" mb-5 block">
            You don't have and account ?{" "}
            <Link className=" text-indigo-500" href={"/register"}>Register</Link>
          </span>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
          >
            {store.loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
