"use client";

import React, { ReactNode, useState } from "react";
import Logo from "@/assets/Logo.png";
import Image from "next/image";
import { IoTennisballOutline } from "react-icons/io5";
import Link from "next/link";
import { FaMountain } from "react-icons/fa";
import { FaBasketball } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { IoIosArrowForward } from "react-icons/io";

interface SidebarProps {
  id: string;
  isOpenSidebar: boolean
}

const Sidebar = ({ id, isOpenSidebar  }: SidebarProps) => {
  const currentPath = usePathname();

  const items1 = [
    {
      name: "Overview",
      icon: <FaBasketball />,
      path: `/dashboard/${id}`,
    },
    {
      name: "Transactions",
      icon: <FaBasketball />,
      path: `/dashboard/${id}/transactions`,
    },
    {
      name: "Accounts",
      icon: <FaBasketball />,
      path: `/dashboard/${id}/accounts`,
    },
    {
      name: "Budgets",
      icon: <FaBasketball />,
      path: `/dashboard/${id}/budgets`,
    },
    {
      name: "Debts & Credits",
      icon: <FaBasketball />,
      path: `/dashboard/${id}/debts-credits`,
    },
    {
      name: "Calendar",
      icon: <FaBasketball />,
      path: `/dashboard/${id}/calendar`,
    },
    {
      name: "Charts",
      icon: <FaBasketball />,
      path: `/dashboard/${id}/chats`,
    },
    {
      name: "Categories",
      icon: <FaBasketball />,
      path: `/dashboard/${id}/categories`,
    },
  ];

  const items2 = [
    {
      name: "Preferences",
      icon: <FaBasketball />,
      path: `/dashboard/${id}/setting`,
      subItems: [
        {
          name: "Category Management",
          icon: <FaBasketball />,
          path: `/dashboard/${id}/setting`,
        },
        {
          name: "Transaction Templates",
          icon: <FaBasketball />,
          path: `/dashboard/${id}/setting`,
        },
      ],
    },
    {
      name: "Setting",
      icon: <FaBasketball />,
      path: `/dashboard/${id}/setting`,
    },
    {
      name: "Help",
      icon: <FaBasketball />,
      path: `/dashboard/${id}/setting`,
    },
  ];

  return (
    <div className={` ${isOpenSidebar ? "w-[0px]" : "w-[300px]"} fixed top-0 left-0 z-[60] bg-[#F1F2F7]  h-[100vh] flex flex-col justify-between pb-[2rem] transition-all duration-300 overflow-hidden `}>
      <div>
        <div className=" h-[70px] w-full border-b border-[#d6d8dd] flex items-center font-poppins px-8 gap-2 ">
          <div className=" p-2 rounded-full text-[#fff] bg-[#5A6ACF] mt-1 ">
            <FaMountain />
          </div>
          <span className=" text-[1.5rem] font-medium ">Fintrack</span>
        </div>
        <div className=" px-4 pt-8 space-y-3 ">
          <div className=" text-[#082431]/50 px-4 ">Menu</div>
          <div className=" space-y-2 ">
            {items1.map((item, idx) => (
              <Link
                href={item.path}
                key={idx}
                className={` ${
                  item.path === currentPath
                    ? "bg-[#707FDD]/10 text-[#5A6ACF]"
                    : " bg-transparent text-[#A6ABC8]/60 "
                } flex items-center gap-3 hover:bg-[#707FDD]/10 py-2 px-4 rounded-md text-[1.1rem] group  `}
              >
                <div
                  className={` ${
                    item.path === currentPath
                      ? "text-[#5A6ACF]"
                      : " text-[#A6ABC8]/60 "
                  } group-hover:text-[#5A6ACF] `}
                >
                  {item.icon}
                </div>
                <div
                  className={` ${
                    item.path === currentPath
                      ? "text-[#5A6ACF]"
                      : " text-[#273240]/60 "
                  } text-[1rem] group-hover:text-[#5A6ACF] `}
                >
                  {item.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className=" px-4 pt-8 space-y-3 ">
          <div className=" text-[#082431]/50 px-4 ">Others</div>

          <Items items={items2} currentPath={currentPath} />
        </div>
      </div>
      <SwitchMode />
    </div>
  );
};

export default Sidebar;

type ItemType = {
  name: string;
  icon: ReactNode;
  path: string;
  subItems?: ItemType[];
};

type ItemsProps = {
  items: ItemType[];
  currentPath: string;
};

const Items = ({ items, currentPath }: ItemsProps) => {
  const [isActive, setIsActive] = useState<number | null>(null);
  const handleToggle = (idx: number) => {
    setIsActive((prevIdx) => (prevIdx === idx ? null : idx));
  };

  return (
    <div className=" space-y-2 ">
      {items.map((item, idx) => (
        <div key={idx}>
          <Link
            onClick={() => handleToggle(idx)}
            href={item.subItems ? currentPath : item.path}
            className={` ${
              item.path === currentPath
                ? "bg-[#707FDD]/10 text-[#5A6ACF]"
                : " bg-transparent text-[#A6ABC8]/60 "
            }  hover:bg-[#707FDD]/10 py-2 px-4 rounded-md text-[1.1rem] group flex items-center justify-between  `}
          >
            <div className=" flex items-center gap-3 ">
              <div
                className={` ${
                  item.path === currentPath
                    ? "text-[#5A6ACF]"
                    : " text-[#A6ABC8]/60 "
                } group-hover:text-[#5A6ACF] `}
              >
                {item.icon}
              </div>
              <div
                className={` ${
                  item.path === currentPath
                    ? "text-[#5A6ACF]"
                    : " text-[#273240]/60 "
                } text-[1rem] group-hover:text-[#5A6ACF] `}
              >
                {item.name}
              </div>
            </div>
            {item.subItems && (
              <div
                className={` ${
                  item.path === currentPath
                    ? "text-[#5A6ACF]"
                    : " text-[#273240]/60 "
                } text-[1rem] group-hover:text-[#5A6ACF] `}
              >
                <IoIosArrowForward
                  className={` ${
                    isActive === idx ? "rotate-90" : ""
                  } transition-all duration-300 ease-in-out `}
                />
              </div>
            )}
          </Link>

          <div
            className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
              isActive === idx
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden *:cursor-pointer pl-4 ">
              {item.subItems?.map((sub, idx) => (
                <div
                  key={idx}
                  className="w-full flex items-center gap-2 border-x-4 py-3 pl-3 border-[#A6ABC8]/60 text-sm text-gray-400 transition-all duration-300 hover:border-[#5A6ACF] hover:bg-[#707FDD]/10 hover:text-[#5A6ACF] "
                >
                  {sub.icon}
                  {sub.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const SwitchMode = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className=" px-8 flex items-center gap-2 ">
      <button
        onClick={() => setToggle((prev) => !prev)}
        className={`flex h-5 w-12 items-center rounded-full border border-[#5A6ACF] p-1 ${
          toggle ? "bg-[#5A6ACF]/50" : null
        }`}
      >
        <div
          className={`size-4 rounded-full bg-[#5A6ACF] duration-200 ${
            toggle ? "translate-x-[1.45rem]" : "translate-x-0"
          }`}
        ></div>
      </button>
      <span>Dark Mode</span>
    </div>
  );
};
