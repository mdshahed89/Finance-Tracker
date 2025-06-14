"use client";

import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { RiCalendar2Line } from "react-icons/ri";
import { BarChart } from "recharts";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  Bar,
} from "recharts";

interface IncomeExpensePieChartProps {
  income: number;
  expense: number;
}

const COLORS = ["#5A6ACF", "#F99C30"];

export const IncomeExpensePieChart = ({
  income,
  expense,
}: IncomeExpensePieChartProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-[150px] h-[150px]"></div>;
  }

  const data = [
    { name: "Income", value: income },
    { name: "Expense", value: expense },
  ];

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) / 2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={20}
        pointerEvents="none"
        fontWeight="500"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="relative w-[150px] h-[150px] flex items-center justify-center">
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={1}
          dataKey="value"
          isAnimationActive={true}
          label={renderCustomizedLabel}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </div>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#37375C] text-white p-2 rounded shadow-lg text-xs">
        <p>{`${payload[0].name} : $${Number(payload[0].value).toFixed(2)}`}</p>
      </div>
    );
  }
  return null;
};

export const ProgressBar = ({ amount }: { amount: number }) => {
  // const [progressNumber, setProgressNumber] = useState(100);
  const progressNumber = 100;
  const [animatedPercent, setAnimatedPercent] = useState(0);

  const finalPercent = (progressNumber / amount) * 100;

  useEffect(() => {
    let start = 0;
    const duration = 700;
    const increment = finalPercent / (duration / 10);

    const animate = setInterval(() => {
      start += increment;
      if (start >= finalPercent) {
        start = finalPercent;
        clearInterval(animate);
      }
      setAnimatedPercent(start);
    }, 10);

    return () => clearInterval(animate);
  }, [finalPercent]);

  return (
    <div className="mt-3 mx-auto flex w-full flex-col gap-2">
      <div className="flex h-2 w-full items-center justify-center overflow-hidden rounded-full bg-[#5A6ACF]/10">
        <div
          style={{ width: `${animatedPercent}%` }}
          className="transition-all mr-auto h-3 rounded-full bg-[#5A6ACF] duration-300"
        ></div>
      </div>
      <span
        style={{ marginLeft: `${animatedPercent - 3}%` }}
        className="flex text-sm font-medium text-[#5A6ACF]"
      >
        {animatedPercent.toFixed(0)}%
      </span>
    </div>
  );
};

export const BudgetBar = ({ amount }: { amount: number }) => {
  // const [progressNumber, setProgressNumber] = useState(100);
  const progressNumber = 100;
  const [animatedPercent, setAnimatedPercent] = useState(0);

  const finalPercent = (progressNumber / amount) * 100;

  useEffect(() => {
    let start = 0;
    const duration = 700;
    const increment = finalPercent / (duration / 10);

    const animate = setInterval(() => {
      start += increment;
      if (start >= finalPercent) {
        start = finalPercent;
        clearInterval(animate);
      }
      setAnimatedPercent(start);
    }, 10);

    return () => clearInterval(animate);
  }, [finalPercent]);

  return (
    <div className=" my-2 mx-auto flex w-full flex-col gap-2">
      <div
        className={` ${
          animatedPercent > 50 ? "bg-[#F99C30]/10" : "bg-[#5A6ACF]/10"
        } flex h-2 w-full items-center justify-center overflow-hidden rounded-full `}
      >
        <div
          style={{ width: `${animatedPercent}%` }}
          className={` ${
            animatedPercent > 50 ? "bg-[#F99C30]" : "bg-[#5A6ACF]"
          } transition-all mr-auto h-3 rounded-full duration-300`}
        ></div>
      </div>
    </div>
  );
};

const data = [
  { date: "Jan", balance: 4000 },
  { date: "Feb", balance: 11000 },
  { date: "Mar", balance: 12000 },
  { date: "Apr", balance: 12750 },
  { date: "May", balance: 14000 },
  { date: "Jun", balance: 14100 },
  { date: "Jul", balance: 14000 },
  { date: "Aug", balance: 13800 },
  { date: "Sep", balance: 13800 },
  { date: "Oct", balance: 15500 },
  { date: "Nov", balance: 15500 },
  { date: "Dec", balance: 20500 },
];

const CustomBalanceTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#37375C] py-2 rounded shadow w-[6rem] ">
        <p className="text-sm text-[#fff] border-b border-[#838383] px-2 pb-2 mb-2 ">
          {label}
        </p>
        <p className="text-sm font-medium text-[#fff] px-2 ">
          ${payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

export const BalanceChart = () => {
  return (
    <div className=" pt-[2rem] ">
      <h3 className="mb-[2rem] font-medium ">Balance</h3>
      <div className="w-full h-[25rem] pb-[2rem] lg:pr-[1.5rem] border-b ">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ right: 8 }}>
            {" "}
            <defs>
              <linearGradient id="colorFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5A6ACF" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#5A6ACF" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              angle={-45}
              textAnchor="end"
              height={40}
              interval={0}
              tick={{ fill: "#6B7280", fontSize: 14 }}
              axisLine={{ stroke: "#A1A1AA", strokeWidth: 1 }}
            />
            <YAxis
              tick={{ fill: "#6B7280", fontSize: 14 }}
              axisLine={{ stroke: "#A1A1AA", strokeWidth: 1 }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
            />
            <Tooltip content={<CustomBalanceTooltip />} />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="#5A6ACF"
              fill="url(#colorFill)"
              fillOpacity={1}
              animationDuration={2000}
              dot={{ r: 4, stroke: "#8f99db", strokeWidth: 1, fill: "#7e86c4" }}
              activeDot={{ r: 6 }}
              isAnimationActive={true}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);

  useEffect(() => {
    const updateSize = () => setSize([window.innerWidth, window.innerHeight]);
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
}

export const IncomeAndExpenseChart = () => {
  const [width] = useWindowSize();
  const data = [
    { month: "Jan", income: 2500, expense: 1500 },
    { month: "Feb", income: 2200, expense: 1400 },
    { month: "Mar", income: 1000, expense: 800 },
    { month: "Apr", income: 2400, expense: 1700 },
    { month: "May", income: 900, expense: 700 },
    { month: "Jun", income: 2300, expense: 1600 },
    { month: "July", income: 1200, expense: 900 },
    { month: "Aug", income: 1300, expense: 1200 },
    { month: "Sep", income: 2400, expense: 1800 },
    { month: "Oct", income: 800, expense: 600 },
    { month: "Nov", income: 3500, expense: 2000 },
    { month: "Dec", income: 2000, expense: 1000 },
  ];

  const getBarSize = () => {
    if (width < 480) return 4;
    if (width < 768) return 6;
    if (width < 1024) return 8;
    return 10;
  };

  return (
    <div className=" pb-[2rem] lg:pl-[2rem] border-b ">
      <div className=" flex items-center justify-between mb-[2rem] ">
        <h3 className=" font-medium ">Income & Expense</h3>
        <div className=" flex items-center gap-1 bg-[#5A6ACF]/10 px-3 py-1 rounded-md cursor-pointer ">
          <RiCalendar2Line />
          <h4>Weekly</h4>
          <IoIosArrowDown />
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300} className={` `}>
        <BarChart
          data={data}
          barCategoryGap={30}
          barGap={5}
          margin={{ right: 0, left: -10, bottom: 0 }}
        >
          <CartesianGrid
            stroke="#E5E7EB"
            strokeDasharray="2"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            stroke="#9CA3AF"
            tick={{ fill: "#6B7280", fontSize: 14, fontWeight: 400 }}
            tickLine={false}
            axisLine={{ stroke: "#dadada", strokeWidth: 0.5 }}
          />
          <YAxis
            domain={[0, "dataMax + 1000"]}
            tickLine={false}
            tick={{ fill: "#6B7280", fontSize: 14 }}
            axisLine={{ stroke: "#dadada", strokeWidth: 0.5 }}
          />
          <Tooltip
            content={<IncomeAndExpenseTooltip />}
            cursor={{ fill: "rgba(90, 106, 207, 0.1)" }}
          />
          <Bar
            dataKey="income"
            fill="#5A6ACF"
            radius={[6, 6, 0, 0]}
            barSize={getBarSize()}
          />
          <Bar
            dataKey="expense"
            fill="#F99C30"
            radius={[6, 6, 0, 0]}
            barSize={getBarSize()}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const IncomeAndExpenseTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const income = payload.find((p: any) => p.dataKey === "income");
    const expense = payload.find((p: any) => p.dataKey === "expense");
    const month = payload[0]?.payload?.month;

    return (
      <div className="bg-[#37375C] rounded shadow py-2 text-sm text-[#fff] ">
        {month && (
          <div className="font-semibold mb-1 border-b border-[#838383] px-2 pb-2 ">
            {month}
          </div>
        )}
        {income && (
          <p className=" px-2 ">
            Income: <span className="text-white  ">${income.value}</span>
          </p>
        )}
        {expense && (
          <p className=" px-2 ">
            Expense:{" "}
            <span className="text-[#F99C30]  ">${Math.abs(expense.value)}</span>
          </p>
        )}
      </div>
    );
  }
  return null;
};

export const TransactionPagination = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const page = 5;
  const updatePageNumber = (num: number) => {
    if (num > page - 1 || 0 > num) {
      return setPageNumber(0);
    }
    setPageNumber(num);
  };
  return (
    <div className=" pt-[2rem] flex items-center justify-between ">
      <p>Showing 1 to 10 of 50 entries</p>
      <div className="flex justify-center items-center gap-5 p-2 rounded-md w-fit select-none">
        {/* left arrow */}
        <div
          onClick={() => {
            updatePageNumber(pageNumber - 1);
          }}
          className="text-[12px] cursor-pointer font-semibold px-1 py-1"
        >
          PREV
        </div>
        <div className="flex justify-center items-center gap-2 ">
          {[...Array(page).keys()].map((item, ind) => (
            <div
              key={item}
              onClick={() => {
                setPageNumber(item);
              }}
              className={`cursor-pointer hover:scale-110  border-b-2  text-sm scale-100 transition-all duration-200 px-3 ${
                pageNumber === item ? "border-[#5A6ACF]" : "border-white"
              }   font-semibold text-gray-700   py-[6px] `}
            >
              {item + 1}
            </div>
          ))}
        </div>
        {/* right arrow */}
        <div
          onClick={() => {
            updatePageNumber(pageNumber + 1);
          }}
          className="text-[12px] cursor-pointer font-semibold px-1 py-1"
        >
          NEXT
        </div>
      </div>
    </div>
  );
};
//   const totalAmount = 1000;
//   const incomeAmount = 700;
//   const expenseAmount = 280;

//   const incomePercentage = Number(
//     ((incomeAmount / totalAmount) * 100).toFixed(0)
//   );
//   const expensePercentage = Number(
//     ((expenseAmount / totalAmount) * 100).toFixed(0)
//   );
//   const otherPercentage = Number(
//     (100 - incomePercentage - expensePercentage).toFixed(0)
//   );

//   const [animatedIncome, setAnimatedIncome] = useState(0);
//   const [animatedExpense, setAnimatedExpense] = useState(0);

//   useEffect(() => {
//     // Animate from 0 to the actual percentage when the component mounts
//     setAnimatedIncome(incomePercentage);
//     setAnimatedExpense(expensePercentage);
//   }, [incomePercentage, expensePercentage]);

//   const incomeStrokeDashoffset = 141 - (141 * animatedIncome) / 100;
//   const expenseStrokeDashoffset = 141 - (141 * animatedExpense) / 100;

//   return (
//     <div className="pl-[2rem] py-[2rem] border-b">
//       <div className="flex items-center justify-between mb-[1.5rem]">
//         <h3 className=" font-medium ">Cash Flow</h3>
//         <div className="flex items-center gap-1 bg-[#5A6ACF]/10 px-3 py-1 rounded-md cursor-pointer">
//           <RiCalendar2Line />
//           <h4>Weekly</h4>
//           <IoIosArrowDown />
//         </div>
//       </div>

//       <div className="flex flex-col items-center justify-center rounded-lg w-full">
//         <div className="relative max-w-[25rem] w-full h-[15rem]">
//           <svg
//             className="absolute top-0 left-0"
//             width="100%"
//             height="100%"
//             viewBox="0 0 100 50"
//           >
//             {/* Yellow background arc */}
//             <path
//               d="M5 50 A45 45 0 1 1 95 50"
//               fill="none"
//               stroke="#F99C30"
//               strokeWidth="5"
//               strokeLinecap="round"
//             />
//             {/* Blue income arc with dynamic animation */}
//             <path
//               d="M5 50 A45 45 0 1 1 95 50"
//               fill="none"
//               stroke="#5A6ACF"
//               strokeWidth="5"
//               strokeDasharray="141"
//               strokeDashoffset={incomeStrokeDashoffset}
//               strokeLinecap="round"
//               className="animate-progress"
//             />
//           </svg>

//           <div className="absolute inset-0 flex items-center justify-center pt-4">
//             <span className="text-[1.5rem] font-medium">
//               {animatedIncome}%
//             </span>
//           </div>
//         </div>

//         <div className="max-w-[25rem] w-full mx-auto flex justify-between mt-4 text-sm font-medium text-[#717b8d]">
//           <div className="w-fit text-center">
//             <p>INCOME</p>
//             <p className="text-black font-semibold">{animatedIncome}%</p>
//           </div>
//           <div className="w-fit text-center">
//             <p>OTHER</p>
//             <p className="text-black font-semibold">{otherPercentage}%</p>
//           </div>
//           <div className="w-fit text-center">
//             <p>EXPENSE</p>
//             <p className="text-black font-semibold">{animatedExpense}%</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
