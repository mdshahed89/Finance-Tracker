import {
  BalanceChart,
  BudgetBar,
  // Cashflow,
  IncomeAndExpenseChart,
  IncomeExpensePieChart,
  ProgressBar,
} from "@/utils/DashboardDynamicUtils";
import { DashboardFooter } from "@/utils/DashboardUtils";
import React from "react";
import { BsFuelPumpDieselFill } from "react-icons/bs";
import { FaFilm } from "react-icons/fa";
import { GiEating } from "react-icons/gi";
import { IoIosArrowDown } from "react-icons/io";
import { IoArrowDown, IoArrowUpOutline } from "react-icons/io5";
import { MdAccountBalance } from "react-icons/md";
import { RiCalendar2Line } from "react-icons/ri";
import { TfiCreditCard } from "react-icons/tfi";

const page = () => {
  return (
    <div>
      <h3 className=" text-[1.5rem] mb-[2rem] ">Dashboard</h3>
      <Summary />
      <div className=" mt-10 flex ">
        <div className=" flex-1 border-r ">
          <Accounts />
          <BalanceChart />
          <Transactions />
        </div>
        <div className=" flex-1 ">
          <IncomeAndExpenseChart />
          <Budgets />
          <Cashflow />
        </div>
      </div>
      
    </div>
  );
};

export default page;

const Cashflow = () => {
  const totalAmount = 1000;
  const incomeAmount = 700;
  const expenseAmount = 280;

  const incomePercentage = Number(
    ((incomeAmount / totalAmount) * 100).toFixed(0)
  );
  const expensePercentage = Number(
    ((expenseAmount / totalAmount) * 100).toFixed(0)
  );
  const otherPercentage = Number(
    (100 - incomePercentage - expensePercentage).toFixed(0)
  );

  return (
    <div className="pl-[2rem] py-[2rem] border-b">
      <div className="flex items-center justify-between mb-[1.5rem]">
        <h3 className=" font-medium ">Cash Flow</h3>
        <div className="flex items-center gap-1 bg-[#5A6ACF]/10 px-3 py-1 rounded-md cursor-pointer">
          <RiCalendar2Line />
          <h4>Weekly</h4>
          <IoIosArrowDown />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center rounded-lg w-full">
        <div className="relative max-w-[25rem] w-full h-[15rem]">
          <svg
            className="absolute top-0 left-0"
            width="100%"
            height="100%"
            viewBox="0 0 100 50"
          >
            {/* Yellow background arc */}
            <path
              d="M5 50 A45 45 0 1 1 95 50"
              fill="none"
              stroke="#F99C30"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Blue income arc */}
            <path
              d="M5 50 A45 45 0 1 1 95 50"
              fill="none"
              stroke="#5A6ACF"
              strokeWidth="5"
              strokeDasharray="141"
              strokeDashoffset={141 - (141 * incomePercentage) / 100}
              strokeLinecap="round"
            />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center pt-4">
            <span className="text-[1.5rem] font-medium">
              {incomePercentage}%
            </span>
          </div>
        </div>

        <div className="max-w-[25rem] w-full mx-auto flex justify-between mt-4 text-sm font-medium text-[#717b8d]">
          <div className="w-fit text-center">
            <p>INCOME</p>
            <p className="text-black font-semibold">{incomePercentage}%</p>
          </div>
          <div className="w-fit text-center">
            <p>OTHER</p>
            <p className="text-black font-semibold">{otherPercentage}%</p>
          </div>
          <div className="w-fit text-center">
            <p>EXPENSE</p>
            <p className="text-black font-semibold">{expensePercentage}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Summary = () => {
  return (
    <div className=" grid grid-cols-3 gap-4 ">
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
          This Month
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
            <div>Income</div>
          </div>
          <div className=" flex items-center gap-1 ">
            <div className=" w-3 h-3 rounded-full bg-[#F99C30] "></div>
            <div>Expense</div>
          </div>
        </div>
      </div>
      <div className=" border relative rounded-md px-5 pt-3 pb-2  ">
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
      </div>
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

const Accounts = () => {
  return (
    <div className=" flex-1 border-b pr-[2rem] pb-[2rem] ">
      <h3 className=" mb-[2rem] font-medium ">Accounts</h3>
      <div className=" ">
        <div className=" flex items-center justify-between border-b pb-[.8rem] mb-[.8rem] ">
          <div className=" flex items-center gap-2 ">
            <div className=" text-[1.5rem] text-[#5A6ACF] bg-[#5A6ACF]/10 p-3 rounded-md ">
              <MdAccountBalance />
            </div>
            <div className=" text-[1.1rem] text-nowrap ">Rupali Bank</div>
          </div>
          <div className=" text-nowrap ">$12, 000.00</div>
        </div>
        <div className=" flex items-center justify-between border-b pb-[.8rem] mb-[.8rem] ">
          <div className=" flex items-center gap-2 ">
            <div className=" text-[1.5rem] text-[#5A6ACF] bg-[#5A6ACF]/10 p-3 rounded-md ">
              <MdAccountBalance />
            </div>
            <div className=" text-[1.1rem] text-nowrap ">Bkash</div>
          </div>
          <div className=" text-nowrap ">$500.00</div>
        </div>
        <div className=" flex items-center justify-between ">
          <div className=" flex items-center gap-2 ">
            <div className=" text-[1.5rem] text-[#5A6ACF] bg-[#5A6ACF]/10 p-3 rounded-md ">
              <TfiCreditCard />
            </div>
            <div className=" text-[1.1rem] text-nowrap ">Credit Card</div>
          </div>
          <div className=" text-nowrap ">$500.00</div>
        </div>

        <ProgressBar amount={Number(500)} />
      </div>
    </div>
  );
};

const Budgets = () => {
  return (
    <div className=" flex-1 border-b pl-[2rem] py-[2rem] ">
      <div className=" flex items-center justify-between mb-[2rem] ">
        <h3 className=" font-medium ">Budgets</h3>
        <div className=" flex items-center gap-1 bg-[#5A6ACF]/10 px-3 py-1 rounded-md cursor-pointer ">
          <RiCalendar2Line />
          <h4>Weekly</h4>
          <IoIosArrowDown />
        </div>
      </div>
      <div className=" ">
        <div className=" pb-[.8rem] mb-[.8rem] ">
          <div className=" w-full flex items-center  gap-4 pb-[1rem] mb-[1rem] border-b ">
            <div className=" text-[1.5rem] text-[#5A6ACF] bg-[#5A6ACF]/10 p-3 rounded-md ">
              <FaFilm />
            </div>
            <div className=" w-full ">
              <div className=" flex items-center justify-between ">
                <div className=" text-base text-nowrap ">Entertainment</div>
                <div className=" text-nowrap ">$120.00</div>
              </div>
              <BudgetBar amount={Number(120)} />
              <div className=" flex items-center justify-between text-[#000]/50 ">
                <div className=" text-nowrap ">20 Transactions</div>
                <div className=" text-nowrap ">
                  {((100 / 120) * 100).toFixed(2)}%
                </div>
              </div>
            </div>
          </div>
          <div className=" w-full flex items-center  gap-4  pb-[1rem] mb-[1rem] border-b ">
            <div className=" text-[1.5rem] text-[#5A6ACF] bg-[#5A6ACF]/10 p-3 rounded-md ">
              <GiEating />
            </div>
            <div className=" w-full ">
              <div className=" flex items-center justify-between ">
                <div className=" text-base text-nowrap ">Eating Out</div>
                <div className=" text-nowrap ">$80.00</div>
              </div>
              <BudgetBar amount={Number(250)} />
              <div className=" flex items-center justify-between text-[#000]/50 ">
                <div className=" text-nowrap ">5 Transactions</div>
                <div className=" text-nowrap ">
                  {((100 / 80) * 100).toFixed(2)}%
                </div>
              </div>
            </div>
          </div>
          <div className=" w-full flex items-center  gap-4 ">
            <div className=" text-[1.5rem] text-[#5A6ACF] bg-[#5A6ACF]/10 p-3 rounded-md ">
              <BsFuelPumpDieselFill />
            </div>
            <div className=" w-full ">
              <div className=" flex items-center justify-between ">
                <div className=" text-base text-nowrap ">Fuel</div>
                <div className=" text-nowrap ">$200.00</div>
              </div>
              <BudgetBar amount={Number(200)} />
              <div className=" flex items-center justify-between text-[#000]/50 ">
                <div className=" text-nowrap ">8 Transactions</div>
                <div className=" text-nowrap ">
                  {((100 / 200) * 100).toFixed(2)}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Transactions = () => {
  const data = [
    {
      from: "Bank Account",
      date: "29/04/2025",
      title: "Financial Income",
      amount: "120.00",
      type: "INCOME",
    },
    {
      from: "Credit Card",
      date: "25/04/2025",
      title: "Entertainment",
      amount: "50.00",
      type: "EXPENSE",
    },
    {
      from: "Bank Account",
      date: "29/04/2025",
      title: "Financial Income",
      amount: "120.00",
      type: "INCOME",
    },
    {
      from: "Credit Card",
      date: "25/04/2025",
      title: "Entertainment",
      amount: "50.00",
      type: "EXPENSE",
    },
    {
      from: "Bank Account",
      date: "29/04/2025",
      title: "Financial Income",
      amount: "120.00",
      type: "INCOME",
    },
    {
      from: "Credit Card",
      date: "25/04/2025",
      title: "Entertainment",
      amount: "50.00",
      type: "EXPENSE",
    },
  ];

  return (
    <div className=" flex-1 border-b pr-[2rem] pt-[2rem] ">
      <div className=" flex items-center justify-between mb-[2rem] ">
        <h3 className=" font-medium ">Transactions</h3>
        <div className=" flex items-center gap-1 bg-[#5A6ACF]/10 px-3 py-1 rounded-md cursor-pointer ">
          <RiCalendar2Line />
          <h4>Weekly</h4>
          <IoIosArrowDown />
        </div>
      </div>
      <div className=" pb-[.8rem] mb-[.8rem] ">
        {data &&
          data.map((dt, idx) => (
            <div
              key={idx}
              className={` w-full flex items-start  gap-4 pb-[.5rem] ${
                idx === data.length - 1 ? "" : "border-b"
              } mb-[.5rem] `}
            >
              <div
                className={` text-[1.5rem] ${
                  dt.type === "INCOME"
                    ? "text-[#5A6ACF] bg-[#5A6ACF]/10"
                    : "text-[#F99C30] bg-[#F99C30]/10"
                } p-3 rounded-md `}
              >
                {dt.type === "INCOME" ? <IoArrowUpOutline /> : <IoArrowDown />}
              </div>
              <div className=" w-full ">
                <div className=" flex items-center justify-between text-sm text-[#000]/50 ">
                  <div className=" text-nowrap ">{dt.from}</div>
                  <div className=" text-nowrap ">{dt.date}</div>
                </div>
                <div className=" flex items-center justify-between text-[1.1rem] font-medium ">
                  <div className=" text-nowrap ">{dt.title}</div>
                  <div className=" text-nowrap ">${dt.amount}</div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
