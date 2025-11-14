"use client";

import GoogleButton from "apps/user-ui/src/shared/components/google-button";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, {useState} from "react";
import {useForm} from "react-hook-form";

type FormData = {
    email: string;
    password: string;
};

const Login = () => {
    // set useState hooks
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [serverError, setSeverError] = useState<string | null>(null);
    const [rememberMe, setRememberMe] = useState(false);

    // set router from next navigation
    const router = useRouter();

    const {register, handleSubmit, formState: {errors}} = useForm<FormData>()

    //receive data from formdata
    const onSubmit = (data:FormData) => {

    };

  return (
    <div className="w-full py-10 min-h-[85vh] bg-[f1f1f1]">
        <h1 className="text-4xl font-poppins font-semibold text-black text-center"> 
            Login
        </h1>
        <p className="text-center text-lg font-medium py-3 text-[#00000099]">
            Home . Login
        </p>
        <div className="w-full justify-center flex">
            <div className="md:w-[480px] p-8 bg-white shadow rounded-lg">
                <h3 className="text-3xl text-center mb-2 font-semibold">
                    Login to Shopbay
                </h3>
                <p className="text-gray-500 mb-4 text-center">
                    Don't have an account? {" "}
                    <Link href={"/signup"} className="text-blue-500"> 
                     Sign up
                    </Link>
                </p>
                <GoogleButton />
                <div className="flex items-center my-5 text-gray-400 text-sm">
                    <div className="flex-1 border-t border-gray-300"/>
                    <span className="px-3">or Sign in with Email</span>
                    <div className="flex-1 border-t border-gray-300"/>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/*email*/}
                    <label className="block text-gray-700 mb-1">Email</label>
                    <input type="email" 
                     placeholder="ntsemibophilo@gmail.com"
                     className="w-full p-2 border border-gray-300 outline-0 !rounded  mb-1"
                     {... register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: "Invalid email address",
                        }
                     })}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">
                            {String(errors.email.message)}
                        </p>
                    )}
                    {/*password*/}
                    <label className="block text-gray-700 mb-1">Password</label>
                    <div className="relative">
                    <input 
                     type={passwordVisible ? "text" : "password"}
                     placeholder="Min. 6 characters"
                     className="w-full p-2 border border-gray-300 outline-0 !rounded  mb-1"
                     {... register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be atleast 6 characters",
                        }
                     })}
                    />

                    <button type="button" onClick={()=> setPasswordVisible(!passwordVisible)}
                     className="absolute inset-y-0 right-3 flex items-center text-gray-400"
                    >
                    {passwordVisible ? <Eye/> : <EyeOff/>}
                    </button>

                    </div>
                </form>
            </div>
        </div>
      </div>
  );
}

export default Login;