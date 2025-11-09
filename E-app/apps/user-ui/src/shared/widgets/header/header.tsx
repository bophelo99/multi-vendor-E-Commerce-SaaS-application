import React from 'react';
import Link from "next/link";
import { HeartIcon, Search } from "lucide-react";
import ProfileIcon from '../../../assets/svgs/profile-icon';


const Header = () => {
    return (
        <div className="w-full bg-white">
            <div className="w-[80%] py-5 m-auto flex items-center justify-between">
                <div>
                    <Link href={"/"}>
                        <span className="text-3xl font=[500]">Eshop</span> 
                    </Link>
                </div>
                <div className="w-[50%] relative"> 
                    <input type="text" placeholder="Search product/s ..."
                        className="w-full border px-4 font-poppins font-medium border-[2.5px] border-[#3489FF] outline-none h-[55px]"
                    />
                    <div className="w-[60px] cursor-pointer flex items-center justify-center h-[55px] bg-[#3489FF] absolute top-0 right-0">
                        <Search color="#fff"/>
                    </div>
                </div>
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2">
                        <Link href={"/login"} className="border-2 w-[50px] h-[50px] flex items-center justify-center rounded-full border-gray-300"> 
                         <ProfileIcon />
                        </Link>
                        <Link href={"/login"}>
                         <span className="block font-medium">Hello</span>
                         <span className="block font-semibold">Sign In</span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-5">
                        <Link href={"/wishlist"} className="relative">
                         <HeartIcon />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;