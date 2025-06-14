import {
  BudgetBar,
  IncomeExpensePieChart,
} from "@/utils/DashboardDynamicUtils";
import React, { ReactElement } from "react";
import { BsFuelPumpDieselFill } from "react-icons/bs";
import { FaFilm, FaRegEye } from "react-icons/fa";
import { GiEating } from "react-icons/gi";
import { PiDotsThreeOutlineFill } from "react-icons/pi";

const page = () => {
  const budgets = [
    {
      title: "Entertainment",
      icon: <FaFilm />,
      price: 300,
    },
    {
      title: "Eating Out",
      icon: <GiEating />,
      price: 200,
    },
    {
      title: "Fuel",
      icon: <BsFuelPumpDieselFill />,
      price: 120,
    },
  ];

  return (
    <div>
      <h3 className=" text-[1.5rem] mb-[2rem] ">Budgets</h3>
      <Summary />
      <div className=" flex mt-[5rem] pb-[2rem] ">
        <WeeklyBudget budgets={budgets} />
        <MonthlyBudget budgets={budgets} />
      </div>
    </div>
  );
};

export default page;

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
          Weekly Budget
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
      <div className=" border relative rounded-md px-5 pt-3 pb-2  ">
        <h4 className=" bg-[#fff] w-fit px-1 absolute left-4 -top-3.5 italic font-medium text-[#5A6ACF] ">
          Monthly Budget
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

type BudgetItem = {
  title: string;
  icon: ReactElement;
  price: number;
};

type WeeklyBudgetProps = {
  budgets: BudgetItem[];
};
const WeeklyBudget = ({ budgets }: WeeklyBudgetProps) => {
  return (
    <div className=" flex-1 pr-[2rem] border-r ">
      <div className=" flex items-center justify-between mb-[2rem] ">
        <h3 className=" font-medium text-[#5A6ACF] ">Weekly Budget</h3>
      </div>
      <div className=" ">
        <div className="  ">
          {budgets.map((budget, idx) => (
            <div
              key={idx}
              className={` pb-[1rem] mb-[1rem] ${
                budgets.length === idx + 1 ? "border-none" : "border-b"
              } space-y-1 `}
            >
              <div className=" flex items-center justify-between ">
                <h4 className=" text-[1.2rem] font-medium ">{budget.title}</h4>
                <div className=" text-[1.2rem] p-2 rounded-full bg-[#5A6ACF]/10 ">
                  <PiDotsThreeOutlineFill />
                </div>
              </div>
              <div className=" w-full flex items-center gap-4 ">
                <div className=" text-[2rem] text-[#5A6ACF] bg-[#5A6ACF]/10 p-3 rounded-md ">
                  {budget.icon}
                </div>
                <div className=" w-full ">
                  <div className=" flex items-center justify-between ">
                    <div className=" text-base text-nowrap ">11/05/2025</div>
                    <div className=" text-base text-nowrap ">60%</div>
                    <div className=" text-nowrap ">18/05/2025</div>
                  </div>
                  <BudgetBar amount={Number(budget.price)} />
                  <div className=" flex items-center justify-between text-[#000]/50 ">
                    <div className=" text-nowrap ">$0.00</div>
                    <div className=" text-nowrap ">$100.00</div>
                    <div className=" text-nowrap ">$180</div>
                  </div>
                </div>
              </div>
              <div className=" flex items-center justify-between ">
                <h4 className=" font-medium ">
                  Rest Amount <span className=" text-[#5A6ACF] ">$20.00</span>
                </h4>
                <div className=" text-[1.1rem] p-2 rounded-full bg-[#5A6ACF]/10 ">
                  <FaRegEye />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MonthlyBudget = ({ budgets }: WeeklyBudgetProps) => {
  return (
    <div className=" flex-1 pl-[2rem] ">
      <div className=" flex items-center justify-between mb-[2rem] ">
        <h3 className=" font-medium text-[#5A6ACF] ">Monthly Budget</h3>
      </div>
      <div className=" ">
        <div className="  ">
          {budgets.map((budget, idx) => (
            <div
              key={idx}
              className={` pb-[1rem] mb-[1rem] ${
                budgets.length === idx + 1 ? "border-none" : "border-b"
              } space-y-1 `}
            >
              <div className=" flex items-center justify-between ">
                <h4 className=" text-[1.2rem] font-medium ">{budget.title}</h4>
                <div className=" text-[1.2rem] p-2 rounded-full bg-[#5A6ACF]/10 ">
                  <PiDotsThreeOutlineFill />
                </div>
              </div>
              <div className=" w-full flex items-center gap-4 ">
                <div className=" text-[2rem] text-[#5A6ACF] bg-[#5A6ACF]/10 p-3 rounded-md ">
                  {budget.icon}
                </div>
                <div className=" w-full ">
                  <div className=" flex items-center justify-between ">
                    <div className=" text-base text-nowrap ">11/05/2025</div>
                    <div className=" text-base text-nowrap ">60%</div>
                    <div className=" text-nowrap ">18/05/2025</div>
                  </div>
                  <BudgetBar amount={Number(budget.price)} />
                  <div className=" flex items-center justify-between text-[#000]/50 ">
                    <div className=" text-nowrap ">$0.00</div>
                    <div className=" text-nowrap ">$100.00</div>
                    <div className=" text-nowrap ">$180</div>
                  </div>
                </div>
              </div>
              <div className=" flex items-center justify-between ">
                <h4 className=" font-medium ">
                  Rest Amount <span className=" text-[#5A6ACF] ">$20.00</span>
                </h4>
                <div className=" text-[1.1rem] p-2 rounded-full bg-[#5A6ACF]/10 ">
                  <FaRegEye />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
