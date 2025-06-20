"use client";

import { IncomeExpensePieChart } from "@/utils/DashboardDynamicUtils";
import React, { useId, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { MdAccountBalance } from "react-icons/md";
import { TbDotsVertical } from "react-icons/tb";

const Page = () => {
  const accounts = [
    {
      title: "Rupali Bank",
      balance: 3000,
      currency: "$",
      initialAmount: 500,
    },
    {
      title: "Bkash",
      balance: 3000,
      currency: "$",
      initialAmount: 500,
    },
    {
      title: "Nagad",
      balance: 3000,
      currency: "$",
      initialAmount: 500,
    },
  ];

  const cards = [
    {
      title: "DBL Credit Card",
      balance: 3000,
      currency: "$",
      initialAmount: 500,
    },
    {
      title: "City Bank Credit Card",
      balance: 3000,
      currency: "$",
      initialAmount: 500,
    },
  ];

  return (
    <div>
      <h3 className=" text-[1.5rem] mb-[2rem] ">Accounts</h3>
      <Summary />
      <div className=" mt-[3rem]   ">
        <h3 className=" mb-[2rem] font-medium ">Personal Accounts</h3>
        <div className=" ">
          {accounts.map((account, idx) => (
            <div
              key={idx}
              className=" w-full flex items-center  gap-4 pb-[1rem] mb-[1rem] border-b hover:bg-[#5A6ACF]/5 px-2 hover:rounded-md pt-2 "
            >
              <div className=" text-[2rem] text-[#5A6ACF] bg-[#5A6ACF]/10 p-3 rounded-md ">
                <MdAccountBalance />
              </div>
              <div className=" w-full space-y-2 ">
                <div className=" flex items-center justify-between ">
                  <div className=" text-[1.1rem] text-nowrap ">
                    {account.title}
                  </div>
                  <div className=" text-nowrap text-[1.2rem] font-medium ">
                    {account.currency}
                    {account.balance}
                  </div>
                </div>
                <div className=" flex items-center justify-between text-[#000]/70 ">
                  <div className=" flex items-center gap-2 ">
                    <ToggleButton />
                    <div className=" text-[1.1rem] p-2 rounded-full bg-[#5A6ACF]/10 ">
                      <FaRegEye />
                    </div>
                  </div>
                  <div className=" flex items-center gap-2 ">
                    <div className=" text-[1.1rem] p-2 rounded-full bg-[#5A6ACF]/10 ">
                      <GrTransaction />
                    </div>
                    <div className=" text-[1.2rem] p-2 rounded-full bg-[#5A6ACF]/10 ">
                      <TbDotsVertical />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Cards cards={cards} />
    </div>
  );
};

export default Page;

const Cards = ({ cards }) => {
  return (
    <div className=" mt-[5rem]   ">
      <h3 className=" mb-[2rem] font-medium ">Credit Cards</h3>
      <div className=" ">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className=" w-full flex items-center  gap-4 pb-[1rem] mb-[1rem] border-b hover:bg-[#F99C30]/5 px-2 hover:rounded-md pt-2 "
          >
            <div className=" text-[2rem] text-[#F99C30] bg-[#F99C30]/10 p-3 rounded-md ">
              <MdAccountBalance />
            </div>
            <div className=" w-full space-y-2 ">
              <div className=" flex items-center justify-between ">
                <div className=" text-[1.1rem] text-nowrap ">{card.title}</div>
                <div className=" text-nowrap text-[1.2rem] font-medium ">
                  {card.currency}
                  {card.balance}
                </div>
              </div>
              <div className=" flex items-center justify-between text-[#000]/70 ">
                <div className=" flex items-center gap-2 ">
                  <ToggleButton type="CREDIT_CARD" />
                  <div className=" text-[1.1rem] p-2 rounded-full bg-[#F99C30]/10 ">
                    <FaRegEye />
                  </div>
                </div>
                <div className=" flex items-center gap-2 ">
                  <div className=" text-[1.1rem] p-2 rounded-full bg-[#F99C30]/10 ">
                    <GrTransaction />
                  </div>
                  <div className=" text-[1.2rem] p-2 rounded-full bg-[#F99C30]/10 ">
                    <TbDotsVertical />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ToggleButton = ({ type }) => {
  const [checked, setChecked] = useState(false);
  const id = useId();

  const handleToggle = () => {
    setChecked(!checked);
  };

  return (
    <div className="toggle-wrapper flex items-center">
      <div className="toggle checkcross relative">
        <input
          id={id}
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={handleToggle}
        />
        <label
          htmlFor={id}
          className={`toggle-item w-[5.8rem] h-9 ${
            type === "CREDIT_CARD" ? "bg-[#F99C30]/10" : "bg-[#5A6ACF]/10"
          } shadow-inner rounded-full p-1 transition-colors duration-300 cursor-pointer relative flex items-center `}
        >
          <span
            className={`${
              checked ? "justify-start" : "justify-end"
            } flex absolute left-0 px-2 w-full text-sm font-medium text-gray-700 pointer-events-none`}
          >
            {checked ? "Hidden" : "Visible"}
          </span>

          <div
            className={`check w-7 h-7 ${
              type === "CREDIT_CARD" ? "bg-[#F99C30]" : "bg-[#5A6ACF]"
            } rounded-full shadow-md transform duration-300 ${
              checked ? "translate-x-[3.5rem]" : "translate-x-0"
            }`}
          ></div>
        </label>
      </div>
    </div>
  );
};

const Summary = () => {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-4 ">
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
      <div className=" border relative rounded-md px-5 pt-3 pb-2 ">
        <h4 className=" bg-[#fff] w-fit px-1 absolute left-4 -top-3.5 italic font-medium text-[#5A6ACF] ">
          Summary
        </h4>
        <div className=" flex items-center justify-between  ">
          <IncomeExpensePieChart income={4000} expense={2000} />
          <div className=" space-y-2 text-[1.2rem] text-end ">
            <div className=" text-[#5A6ACF] ">$ 4000.00</div>
            <div className=" text-[#F99C30] ">-$ 2000.00</div>
            <div className=" border-t-2 pl-14 border-[#C8CBD9] text-[#5A6ACF] ">
              $ 2000.00
            </div>
          </div>
        </div>
        <div className=" flex items-center justify-center gap-3 ">
          <div className=" flex items-center gap-1 ">
            <div className=" w-3 h-3 rounded-full bg-[#5A6ACF] "></div>
            <div>Account</div>
          </div>
          <div className=" flex items-center gap-1 ">
            <div className=" w-3 h-3 rounded-full bg-[#F99C30] "></div>
            <div>Credit Card</div>
          </div>
        </div>
      </div>
      {/* <div className=" border relative rounded-md px-5 pt-3 pb-2  ">
        <h4 className=" bg-[#fff] w-fit px-1 absolute left-4 -top-3.5 italic font-medium text-[#5A6ACF] ">
          Last Month
        </h4>
        <div className=" flex items-center justify-between ">
          <IncomeExpensePieChart income={5000} expense={2000} />
          <div className=" space-y-2 text-[1.2rem] text-end ">
            <div className=" text-[#5A6ACF] ">$ 5000.00</div>
            <div className=" text-[#F99C30] ">-$ 2000.00</div>
            <div className=" border-t-2 pl-14 border-[#C8CBD9] text-[#5A6ACF] ">
              $ 3000.00
            </div>
          </div>
        </div>
        <div className=" flex items-center justify-center gap-3 ">
          <div className=" flex items-center gap-1 ">
            <div className=" w-3 h-3 rounded-full bg-[#5A6ACF] "></div>
            <div>Income</div>
          </div>
          <div className=" flex items-center gap-1 ">
            <div className=" w-3 h-3 rounded-full bg-[#F99C30] "></div>
            <div>Expense</div>
          </div>
        </div>
      </div> */}
      {/* <div className=" border relative rounded-md px-5 pt-3 pb-2 ">
        <h4 className=" bg-[#fff] w-fit px-1 absolute left-4 -top-3.5 italic font-medium text-[#5A6ACF] ">
          This Year
        </h4>
        <div className=" flex items-center justify-between ">
          <IncomeExpensePieChart income={20000} expense={12000} />
          <div className=" space-y-2 text-[1.2rem] text-end ">
            <div className=" text-[#5A6ACF] ">$ 20,000.00</div>
            <div className=" text-[#F99C30] ">-$ 12,000.00</div>
            <div className=" border-t-2 pl-14 border-[#C8CBD9] text-[#5A6ACF] ">
              $ 8,000.00
            </div>
          </div>
        </div>
        <div className=" flex items-center justify-center gap-3 ">
          <div className=" flex items-center gap-1 ">
            <div className=" w-3 h-3 rounded-full bg-[#5A6ACF] "></div>
            <div>Income</div>
          </div>
          <div className=" flex items-center gap-1 ">
            <div className=" w-3 h-3 rounded-full bg-[#F99C30] "></div>
            <div>Expense</div>
          </div>
        </div>
      </div> */}
    </div>
  );
};
