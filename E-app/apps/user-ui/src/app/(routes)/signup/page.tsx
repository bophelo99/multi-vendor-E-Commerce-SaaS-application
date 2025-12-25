"use client";

import GoogleButton from "apps/user-ui/src/shared/components/google-button";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, {useRef, useState} from "react";
import {useForm} from "react-hook-form";

type FormData = {
    name: string;
    email: string;
    password: string;
};

const Signup = () => {
    // set useState hooks
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [serverError, setSeverError] = useState<string | null>(null);
    const [showOtp, setShowOtp] = useState(true);
    const [canResend, setCanResend] = useState(true);
    const [timer, setTimer] = useState(60);
    const [otp, setOtp] = useState(["", "", "", ""]); // 4 digit code
    const [userData, setUserData] = useState<FormData | null>(null);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // set router from next navigation
    const router = useRouter();

    const {register, handleSubmit, formState: {errors}} = useForm<FormData>()

    //receive data from formdata
    const onSubmit = (data:FormData) => {};

    //handleOtpChange is a function called whenever the user types into an OTP input box.
    const handleOtpChange = (index:number, value:string) => {
        //check otp is number
        if(!/^[0-9]?$/.test(value)) return;
        const newOtp = [... otp]
        newOtp[index] = value;
        setOtp(newOtp);

        if(value && index  < inputRefs.current.length - 1){
            inputRefs.current[index+1]?.focus();
        }
    };

    //handle backspace to go back into previous otp backspace
    const handleOtpkeyDown = (index:number, e:React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key == "Backspace" && !otp[index] && index > 0 ){
            inputRefs.current[index - 1]?.focus();
        }
    };

  return (
    <div className="w-full py-10 min-h-[85vh] bg-[f1f1f1]">
        <h1 className="text-4xl font-poppins font-semibold text-black text-center"> 
            Signup
        </h1>
        <p className="text-center text-lg font-medium py-3 text-[#00000099]">
            Home . Signup
        </p>
        <div className="w-full justify-center flex">
            <div className="md:w-[480px] p-8 bg-white shadow rounded-lg">
                <h3 className="text-3xl text-center mb-2 font-semibold">
                    Signup to Shopbay
                </h3>
                <p className="text-gray-500 mb-4 text-center">
                    Already have an account? {" "}
                    <Link href={"/login"} className="text-blue-500"> 
                     Login
                    </Link>
                </p>
                <GoogleButton />
                <div className="flex items-center my-5 text-gray-400 text-sm">
                    <div className="flex-1 border-t border-gray-300"/>
                    <span className="px-3">or Sign in with Email</span>
                    <div className="flex-1 border-t border-gray-300"/>
                </div>
                
                {!showOtp ? (
                 <form onSubmit={handleSubmit(onSubmit)}>
                    {/*Name*/}
                    <label className="block text-gray-700 mb-1">Name</label>
                    <input type="text" 
                     placeholder="bophilo"
                     className="w-full p-2 border border-gray-300 outline-0 !rounded  mb-1"
                     {... register("name", {
                        required: "Name is required",
                     })}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">
                            {String(errors.email.message)}
                        </p>
                    )}
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
                    {errors.password && (
                        <p className="text-red-500 text-sm">
                            {String(errors.password.message)}
                        </p>
                    )}
                    </div>
                    <button type="submit" className="w-full text-lg cursor-pointer bg-black mt-6 text-white py-2 rounded-lg">
                        Signup
                    </button>
                    {serverError && (
                        <p className="text-red-500 text-sm mt-2">{serverError}</p>
                    )}
                </form>
                ) : (
                    <div>
                        <h3 className="text-xl font-semibold text-center mb-4">Enter verification code</h3>
                        <div className="justify-center flex gap-6">
                            {otp ?.map((digit,index)=>(
                                <input key={index} type="text" ref={(el)=> {
                                  if (el) inputRefs.current[index] = el;
                                }}
                                maxLength={1}
                                className="w-12 h-12 text-center border border-gray-500 outline-none !rounded"
                                value={digit}
                                onChange={(e) => handleOtpChange(index,e.target.value)}
                                onKeyDown={(e) => handleOtpkeyDown(index, e)}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>
  );
}

export default Signup;