"use client";

import Image from "next/image";
import React from "react";
import { FiSearch } from "react-icons/fi";
import MyImg from "@/assets/MyImg.png";
import { IoNotificationsSharp } from "react-icons/io5";
import { BsLayoutSidebar } from "react-icons/bs";

interface TopbarProps {
  isOpenSidebar: boolean;
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const TopBar = ({ isOpenSidebar, setIsOpenSidebar }: TopbarProps) => {
  return (
    <div
      className={` ${
        isOpenSidebar ? "pl-4 xl:pl-[40px]" : "lg:pl-[340px]"
      } fixed top-0 left-0 z-50 bg-[#fff] h-[70px] pr-5 xl:pr-10 flex items-center justify-between border-b  w-full transition-all duration-300 ease-in-out `}
    >
      <div className=" w-[60%] relative flex items-center gap-6  ">
        <div
          onClick={() => setIsOpenSidebar(!isOpenSidebar)}
          className=" text-[1.3rem] cursor-pointer "
        >
          <BsLayoutSidebar
            className={` ${
              isOpenSidebar ? "rotate-180" : "rotate-0"
            } transition-all duration-300 ease-in-out `}
          />
        </div>
        <input
          type="text"
          name=""
          id=""
          placeholder="Search..."
          className=" w-full outline-none border-none py-2 pl-4 pr-[3rem] bg-[#F6F6FB] rounded-md "
        />
        <div className=" absolute top-0 right-0 px-4 h-full flex items-center  ">
          <FiSearch className=" text-[#A6ABC8] text-[1.2rem] " />
        </div>
      </div>
      <div className=" flex items-center gap-8 ">
        <div className=" relative cursor-pointer ">
          <IoNotificationsSharp className=" text-[#8ea0a8] text-[1.5rem] " />
          <div className=" absolute top-[-2px] right-0 bg-[#fff] p-[1px] rounded-full   ">
            <div className=" w-2 h-2 bg-red-400 rounded-full "></div>
          </div>
        </div>
        <div className=" w-[3rem] h-[3rem] cursor-pointer p-2 rounded-full bg-[#5A6ACF]/20 flex items-center justify-center overflow-hidden ">
          <Image src={MyImg} alt="My Img" className=" rounded-full " />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
