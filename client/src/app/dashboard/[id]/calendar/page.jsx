"use client";
import { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { MdArrowBackIos } from "react-icons/md";
import { IoTriangleSharp } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";

const dummyTransactions = {
  "2025-05-15": [
    { type: "income", amount: 100, note: "Salary" },
    { type: "expense", amount: 120, note: "Groceries" },
    { type: "expense", amount: 120, note: "Groceries" },
  ],
  "2025-05-17": [
    { type: "income", amount: 100, note: "Salary" },
    { type: "expense", amount: 120, note: "Groceries" },
    { type: "expense", amount: 120, note: "Groceries" },
  ],
  "2025-05-16": [
    { type: "income", amount: 200, note: "Freelance" },
    { type: "expense", amount: 50, note: "Snacks" },
    { type: "expense", amount: 150, note: "Snacks" },
  ],
};



const Page = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const handleDateClick = (day) => setSelectedDate(day);

  const renderHeader = () => {
    const { net } = getMonthlyNetTotal();
    const isPositive = net >= 0;

    return (
      <div className="flex justify-between items-center mb-7">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevMonth}
            className="text-[#2FBFDE] text-[1.4rem] lg:text-[1.7rem]"
          >
            <MdArrowBackIos />
          </button>
          <h2 className="text-[1rem] lg:text-[1.2rem] lg:w-[15rem] text-center font-semibold">
            {format(currentMonth, "MMMM yyyy")}
          </h2>
          <button
            onClick={handleNextMonth}
            className="text-[#2FBFDE] text-[1.4rem] lg:text-[1.7rem]"
          >
            <MdArrowBackIos className="rotate-180" />
          </button>
        </div>
        <div
          className={`text-[1.1rem] lg:text-[1.3rem] font-medium transition-all duration-300 ease-in-out flex items-center gap-2 `}
        >
          Monthly Total <FaArrowRightLong />{" "}
          <span
            className={` ${isPositive ? "text-[#5A6ACF]" : "text-[#F99C30]"} `}
          >
            {isPositive ? "+" : ""}
            {net}$
          </span>
        </div>
      </div>
    );
  };

  const renderDaysOfWeek = () => (
    <div className="grid grid-cols-7 text-center font-medium text-gray-600">
      {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
        <div key={day} className="p-2">
          {day}
        </div>
      ))}
    </div>
  );

  const getDayData = (date) => {
    const key = format(date, "yyyy-MM-dd");
    const dayTxns = dummyTransactions[key] || [];
    const income = dayTxns
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const expense = dayTxns
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
    return { income, expense, net: income - expense, txns: dayTxns };
  };

  const getMonthlyNetTotal = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);

    let totalIncome = 0;
    let totalExpense = 0;

    for (
      let date = new Date(monthStart);
      date <= monthEnd;
      date = addDays(date, 1)
    ) {
      const key = format(date, "yyyy-MM-dd");
      const txns = dummyTransactions[key] || [];
      txns.forEach((txn) => {
        if (txn.type === "income") totalIncome += txn.amount;
        else if (txn.type === "expense") totalExpense += txn.amount;
      });
    }

    const net = totalIncome - totalExpense;
    return { totalIncome, totalExpense, net };
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, "d");
        const cloneDay = day;
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isSelected = isSameDay(day, selectedDate);
        const { net, txns } = getDayData(day);
        const isPositive = net > 0;
        const isNegative = net < 0;

        days.push(
          <div
            key={day}
            className={`relative border text-center rounded-lg text-lg font-semibold cursor-pointer p-6 lg:h-[100px]  flex items-center justify-center transition-all duration-300 ease-in-out
              ${!isCurrentMonth ? "text-gray-400" : ""}
              ${
                isSelected ? "bg-[#2FBFDE] text-white" : "hover:bg-[#2FBFDE]/20"
              }
            `}
            onClick={() => handleDateClick(cloneDay)}
          >
            {(isPositive || isNegative) && (
              <div
                className={`absolute top-1 right-1 text-sm lg:text-[1.2rem]  `}
              >
                {" "}
                {isPositive ? (
                  <IoTriangleSharp
                    className={` ${
                      isSelected ? "text-[#fff]" : "text-[#5A6ACF]"
                    }  `}
                  />
                ) : (
                  <IoTriangleSharp
                    className={` ${
                      isSelected ? "text-[#fff]" : "text-[#F99C30]"
                    }  rotate-180 `}
                  />
                )}
              </div>
            )}

            {/* Day Number */}
            <div className=" text-base lg:text-[1.1rem] ">{formattedDate}</div>

            {/* Net amount */}
            {txns.length > 0 && (
              <div
                className={` absolute bottom-0 lg:bottom-1 text-xs lg:text-sm font-medium ${
                  isSelected
                    ? "text-white"
                    : net >= 0
                    ? "text-[#5A6ACF]"
                    : "text-[#F99C30]"
                }`}
              >
                {net > 0 ? "+" : ""}
                {net}$
              </div>
            )}
          </div>
        );

        day = addDays(day, 1);
      }

      rows.push(
        <div key={day} className="grid grid-cols-7 gap-1 lg:gap-2 mb-2">
          {days}
        </div>
      );
      days = [];
    }

    return <div>{rows}</div>;
  };

  const renderTransactions = () => {
    const key = format(selectedDate, "yyyy-MM-dd");
    const txns = dummyTransactions[key] || [];

    return (
      <div className="mt-10">
        <h3 className="text-[1.3rem] font-semibold mb-5">
          Transactions on {format(selectedDate, "PPP")}
        </h3>
        {txns.length === 0 ? (
          <p className="text-gray-500">No transactions.</p>
        ) : (
          <ul className="space-y-2">
            {txns.map((txn, idx) => (
              <li
                key={idx}
                className={`p-3 rounded border-l-4 ${
                  txn.type === "income"
                    ? "border-[#5A6ACF] bg-[#5A6ACF]/5 "
                    : "border-[#F99C30] bg-[#F99C30]/5 "
                }`}
              >
                <div className="flex justify-between">
                  <span className="font-medium">{txn.note}</span>
                  <span>
                    {txn.type === "income" ? "+" : "-"}
                    {txn.amount}$
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div>
      <h3 className="text-[1.5rem] mb-[2rem]">Calendar</h3>
      <div className="w-full mx-auto lg:p-2">
        {renderHeader()}
        {renderDaysOfWeek()}
        {renderCells()}
        {renderTransactions()}
      </div>
    </div>
  );
};

export default Page;
