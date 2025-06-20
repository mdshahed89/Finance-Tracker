"use client"

import { TransactionPagination } from "@/utils/DashboardDynamicUtils";
import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoArrowDown, IoArrowUpOutline } from "react-icons/io5";
import { RiCalendar2Line } from "react-icons/ri";
import { TbArrowsTransferUpDown } from "react-icons/tb";
import Category1 from "@/assets/Category1.png";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";

const page = () => {
  // const data = [
  //   {
  //     from: "Bank Account",
  //     date: "29/04/2025",
  //     title: "Financial Income",
  //     amount: "120.00",
  //     type: "INCOME",
  //   },
  //   {
  //     from: "Credit Card",
  //     date: "25/04/2025",
  //     title: "Entertainment",
  //     amount: "50.00",
  //     type: "EXPENSE",
  //   },
  //   {
  //     from: "Bank Account",
  //     date: "29/04/2025",
  //     title: "Financial Income",
  //     amount: "120.00",
  //     type: "INCOME",
  //   },
  //   {
  //     from: "Credit Card",
  //     date: "25/04/2025",
  //     title: "Entertainment",
  //     amount: "50.00",
  //     type: "EXPENSE",
  //   },
  //   {
  //     from: "Bank Account",
  //     date: "29/04/2025",
  //     title: "Financial Income",
  //     amount: "120.00",
  //     type: "INCOME",
  //   },
  //   {
  //     from: "Credit Card",
  //     date: "25/04/2025",
  //     title: "Entertainment",
  //     amount: "50.00",
  //     type: "EXPENSE",
  //   },
  // ];

  return (
    <div className=" ">
      <h3 className=" text-[1.5rem] mb-[2rem] ">Transaction</h3>
      <Summary />
      <h3 className=" font-medium text-[1.5rem] mb-[2rem] ">All Transitions</h3>
      <div className=" border px-3 lg:px-[2rem] pt-[2rem] pb-[1rem] rounded-md ">
        <div className=" flex items-center justify-between lg:flex-row flex-col mb-[2rem] gap-7 ">
          <SearchBar />
          <Sort />
        </div>

        <TransactionTable />
      </div>
    </div>
  );
};

export default page;

interface DropdownOption {
  label: string;
  value: string;
}

const Sort = () => {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>('All (50)');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options: DropdownOption[] = [
    { label: 'All (50)', value: 'all' },
    { label: 'Income (30)', value: 'income' },
    { label: 'Expense (25)', value: 'expense' },
    { label: 'Transfer (5)', value: 'transfer' },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: DropdownOption) => {
    setSelectedOption(option.label);
    setIsOpen(false);
    // Add your filter logic here
    console.log('Selected:', option.value);
  };
  
  return (
    <div className=" w-full flex items-end md:items-center justify-end sm:flex-row flex-col gap-2 ">
      <div className="relative">
      {/* Original tabs - hidden on mobile */}
      <div className="hidden lg:flex items-center gap-1 px-2 py-1 bg-[#5A6ACF]/5 rounded-md">
        {options.map((option) => (
          <div
            key={option.value}
            className={`${
              selectedOption === option.label
                ? 'bg-[#5A6ACF] text-[#fff]'
                : 'hover:bg-[#5A6ACF] hover:text-[#fff]'
            } cursor-pointer transition-colors duration-300 ease-in-out px-2 rounded-md text-nowrap `}
            onClick={() => handleOptionClick(option)}
          >
            {option.label}
          </div>
        ))}
      </div>

      {/* Custom dropdown for mobile */}
      <div className="lg:hidden relative" ref={dropdownRef}>
        <button
          className="flex items-center justify-center px-2 w-[8rem] py-2 bg-[#5A6ACF]/5 rounded-md hover:bg-[#5A6ACF]/10 transition-colors duration-200"
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span>{selectedOption}</span>
          <svg
            className={`w-5 h-5 ml-2 text-[#5A6ACF] transition-transform duration-200 ${
              isOpen ? 'transform rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div 
            className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200"
            role="listbox"
          >
            {options.map((option) => (
              <div
                key={option.value}
                className={`px-4 py-2 cursor-pointer text-nowrap ${
                  selectedOption === option.label
                    ? 'bg-[#5A6ACF] text-white'
                    : 'hover:bg-[#5A6ACF]/10'
                } transition-colors duration-150`}
                onClick={() => handleOptionClick(option)}
                role="option"
                aria-selected={selectedOption === option.label}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>

      <div className=" flex items-center gap-1 bg-[#5A6ACF]/5 px-3 rounded-md cursor-pointer ">
        <div className=" flex items-center gap-2 border-r border-[#b5afb8] py-1 pr-2 mr-2 ">
          <h4 className=" text-nowrap ">Last 7 Days</h4>
          <IoIosArrowDown />
        </div>
        <div className=" flex items-center gap-2 borderr-r py-1 ">
          <RiCalendar2Line />
          <h4 className=" text-nowrap ">15 Apr - 25 Apr</h4>
          <IoIosArrowDown />
        </div>
      </div>
    </div>
  );
};

const SearchBar = () => {
  return (
    <div className=" lg:max-w-[25rem] w-full relative flex items-center gap-6  ">
      <input
        type="text"
        name=""
        id=""
        placeholder="Search"
        className=" w-full outline-none border-none py-2 pl-4 pr-[3rem] bg-[#F6F6FB] rounded-md "
      />
      <div className=" absolute top-0 right-0 px-4 h-full flex items-center  ">
        <FiSearch className=" text-[#A6ABC8] text-[1.2rem] " />
      </div>
    </div>
  );
};

const TransactionTable = () => {
  const data = [
    {
      from: "Bank Account",
      date: "29/04/2025",
      title: "Financial Income",
      amount: "120.00",
      type: "INCOME",
      icon: Category1,
    },
    {
      from: "Credit Card",
      date: "25/04/2025",
      title: "Entertainment",
      amount: "50.00",
      type: "EXPENSE",
      icon: Category1,
    },
    {
      from: "Bank Account",
      date: "29/04/2025",
      title: "Financial Income",
      amount: "120.00",
      type: "INCOME",
      icon: Category1,
    },
    {
      from: "Credit Card",
      date: "25/04/2025",
      title: "Entertainment",
      amount: "50.00",
      type: "EXPENSE",
      icon: Category1,
    },
    {
      from: "Bank Account",
      date: "29/04/2025",
      title: "Financial Income",
      amount: "120.00",
      type: "Scheduled",
      icon: Category1,
    },
    {
      from: "Credit Card",
      date: "25/04/2025",
      title: "Entertainment",
      amount: "50.00",
      type: "EXPENSE",
      icon: Category1,
    },
    {
      from: "Bank Account",
      date: "29/04/2025",
      title: "Financial Income",
      amount: "120.00",
      type: "Scheduled",
      icon: Category1,
    },
    {
      from: "Credit Card",
      date: "25/04/2025",
      title: "Entertainment",
      amount: "50.00",
      type: "EXPENSE",
      icon: Category1,
    },
    {
      from: "Credit Card",
      date: "25/04/2025",
      title: "Entertainment",
      amount: "50.00",
      type: "EXPENSE",
      icon: Category1,
    },
  ];

  // const deleteDriveHandler = async (id) => {
  //   if (!id) {
  //     toast.error("Driver id is required");
  //     return;
  //   }
  //   try {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/driver-info/${id}`,
  //       {
  //         method: "DELETE",
  //       }
  //     );

  //     if (response.ok) {
  //       toast.success("Driver deleted successfully!");
  //       fetchDrivers();
  //     } else {
  //       toast.error(data.message || "Failed to delete driver!");
  //     }
  //   } catch (error) {
  //     toast.error("Something went wrong! Please try again.");
  //     console.error("Error submitting driver delete:", error);
  //   }
  // };

  return (
    <div>
      <div className="overflow-x-auto">
      <table className=" w-full mx-auto my-6">
        <thead>
          <tr className="bg-[#edeef7] text-[#202020] ">
            <th className="py-3 px-4 text-left whitespace-nowrap border-b">
              Type
            </th>
            <th className="py-3 px-4 text-center whitespace-nowrap border-b">
              Account
            </th>
            <th className="py-3 px-4 text-center whitespace-nowrap border-b">
              Date
            </th>
            <th className="py-3 px-4 text-center whitespace-nowrap border-b">
              Amount
            </th>
            <th className="py-3 px-4 text-center whitespace-nowrap border-b">
              Status
            </th>
            <th className="py-3 px-4 text-end whitespace-nowrap border-b">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((dt, idx) => (
            <tr
              key={idx}
              className="hover:bg-gray-50 transition duration-300 border-b h-full "
            >
              <td className="py-4 px-2 whitespace-nowrap text-left h-full ">
                <div className=" flex items-center gap-2 ">
                  <div className=" lg:flex hidden ">
                  <Image
                    src={dt.icon}
                    alt="Category Icon"
                    className=" w-[3rem] h-[3rem] object-contain rounded-full "
                  />
                </div>
                {dt?.title}
                </div>
              </td>
              <td className="py-4 px-2 whitespace-nowrap text-center">
                {dt?.from}
              </td>
              <td className="py-4 px-2 whitespace-nowrap text-center">
                {dt?.date}
              </td>
              <td className="py-4 px-2 whitespace-nowrap text-center">
                ${dt?.amount}
              </td>
              <td
                className={` ${
                  dt.type === "INCOME"
                    ? "text-[#5A6ACF]"
                    : dt.type === "EXPENSE"
                    ? "text-[#F99C30]"
                    : "text-slate-500"
                } py-4 px-2 whitespace-nowrap text-center `}
              >
                <div
                  className={` text-[1.5rem] ${
                    dt.type === "INCOME"
                      ? "text-[#5A6ACF] bg-[#5A6ACF]/10"
                      : dt.type === "EXPENSE"
                      ? "text-[#F99C30] bg-[#F99C30]/10"
                      : " bg-slate-100 text-slate-600"
                  } p-3 rounded-full w-fit mx-auto  `}
                >
                  {dt.type === "INCOME" ? (
                    <IoArrowUpOutline />
                  ) : dt.type === "EXPENSE" ? (
                    <IoArrowDown />
                  ) : (
                    <TbArrowsTransferUpDown />
                  )}
                </div>
              </td>
              <td className=" py-4 ">
                <div className=" flex justify-end px-5 ">
                  <BsThreeDotsVertical className=" text-[1.4rem] cursor-pointer " />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      <TransactionPagination />
    </div>
  );
};

const Summary = () => {
  return (
    <div className=" mb-[3rem] grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-4 ">
      <div className=" relative rounded-md px-5 pt-7 pb-5 bg-[#5A6ACF] ">
        <div className=" w-full space-y-1 ">
          <h4 className=" text-[#e9e9e9] font-medium ">Total Balance</h4>
          <div className=" text-[2rem] font-medium leading-tight text-[#fff] ">
            $25, 000
          </div>
        </div>
        <div className=" mt-3  font-medium">
          <ul className=" flex items-center justify-between pb-2 border-b border-[#c5c5c5] ">
            <li className=" text-[#e9e9e9] ">Personal Funds</li>
            <li className=" text-[#fff] ">$20, 000.00</li>
          </ul>
          <ul className=" flex items-center justify-between pt-2 ">
            <li className=" text-[#e9e9e9] ">Credit Limits</li>
            <li className=" text-[#fff] ">$5, 000.00</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
