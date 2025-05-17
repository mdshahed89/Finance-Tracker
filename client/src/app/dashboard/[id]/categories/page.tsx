"use client";

// components/FinanceCategories.tsx
import { useState } from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import { LuPlus } from "react-icons/lu";
import { TbDotsVertical } from "react-icons/tb";

type CategoryType = "income" | "expense" | "both";
type Category = {
  name: string;
  type: "income" | "expense";
  subcategories: string[];
  icon?: string;
};

export default function FinanceCategories() {
  const [activeTab, setActiveTab] = useState<CategoryType>("both");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const categories: Category[] = [
    {
      name: "Salary",
      type: "income",
      subcategories: ["Base Salary", "Bonus", "Overtime"],
      icon: "💰",
    },
    {
      name: "Freelance",
      type: "income",
      subcategories: ["Client Projects", "Consulting", "Side Hustle"],
      icon: "💼",
    },
    {
      name: "Investments",
      type: "income",
      subcategories: ["Dividends", "Stocks", "Crypto", "Real Estate"],
      icon: "📈",
    },
    {
      name: "Food/Drinks",
      type: "expense",
      subcategories: ["Groceries", "Dining Out", "Coffee/Snacks"],
      icon: "🍔",
    },
    {
      name: "Shopping",
      type: "expense",
      subcategories: ["Clothing", "Electronics", "Home Goods"],
      icon: "🛍️",
    },
    {
      name: "Transportation",
      type: "expense",
      subcategories: ["Fuel", "Public Transit", "Maintenance", "Ride Share"],
      icon: "🚗",
    },
    {
      name: "Housing",
      type: "expense",
      subcategories: ["Rent/Mortgage", "Utilities", "Repairs", "Furniture"],
      icon: "🏠",
    },
    {
      name: "Health",
      type: "expense",
      subcategories: ["Insurance", "Medications", "Gym", "Checkups"],
      icon: "🏥",
    },
  ];

  const filteredCategories = categories.filter(
    (category) => activeTab === "both" || category.type === activeTab
  );

  const toggleCategory = (name: string) => {
    setExpandedCategory(expandedCategory === name ? null : name);
  };

  return (
    <div className=" min-h-[80vh] max-w-[60rem] ">
      <div className=" flex items-center justify-between mb-[3rem] ">
        <h3 className="text-[1.5rem] ">Calendar</h3>
        <button className="mt-4 py-2 bg-[#2FBFDE] text-[#fff] font-medium px-5 rounded-lg hover:bg-blue-100 flex items-center justify-center gap-1 ">
          <LuPlus className=" text-[1.3rem] " />
          Add New Category
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex mb-6 border-b">
        <button
          onClick={() => setActiveTab("income")}
          className={`flex-1 py-2 font-medium ${
            activeTab === "income"
              ? "text-[#5A6ACF] border-b-2 border-[#5A6ACF]"
              : "text-gray-500"
          }`}
        >
          Income
        </button>
        <button
          onClick={() => setActiveTab("expense")}
          className={`flex-1 py-2 font-medium ${
            activeTab === "expense"
              ? "text-[#F99C30] border-b-2 border-[#F99C30]"
              : "text-gray-500"
          }`}
        >
          Expenses
        </button>
        <button
          onClick={() => setActiveTab("both")}
          className={`flex-1 py-2 font-medium ${
            activeTab === "both"
              ? "text-[#2FBFDE] border-b-2 border-[#2FBFDE]"
              : "text-gray-500"
          }`}
        >
          Both
        </button>
      </div>

      {/* Categories List */}
      <div className="space-y-3">
        {filteredCategories.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No categories found</p>
        ) : (
          filteredCategories.map((category) => (
            <div
              key={category.name}
              className={`border-b ${
                category.type === "income"
                  ? "border-[#aeb4dd]"
                  : "border-[#dfc7ad]"
              } overflow-hidden`}
            >
              <button
                onClick={() => toggleCategory(category.name)}
                className={`w-full px-3 py-2 text-left font-medium flex justify-between items-center ${
                  category.type === "income"
                    ? " hover:bg-[#5A6ACF]/5 text-[#5A6ACF] "
                    : " hover:bg-[#F99C30]/5 text-[#F99C30]"
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* {category.icon && <span className="mr-2">{category.icon}</span>} */}
                  <div className=" p-3 text-[1.5rem] rounded-full bg-gray-100 ">
                    <FaMoneyBillWave />
                  </div>
                  <span>{category.name}</span>
                </div>
                <div className="flex items-center">
                  {
                    expandedCategory !== category.name && <span className="text-xs bg-white shadow-inner px-2 py-1 rounded-full mr-2">
                    {category.subcategories.length}
                  </span>
                  }
                  {expandedCategory === category.name && (
                    <div className="ml-auto text-[1.3rem] transition-all duration-300 ease-in-out hover:bg-gray-200 p-2 rounded-full ">
                      <TbDotsVertical />
                    </div>
                  )}
                  <svg
                    className={`w-5 h-5 transition-transform ${
                      expandedCategory === category.name
                        ? "transform rotate-180"
                        : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  
                </div>
              </button>

              {expandedCategory === category.name && (
                <div className="bg-gray-50 p-3 pl-6 transition-all duration-300 ease-in-out ">
                  <ul className="space-y-2">
                    {category.subcategories.map((subcategory) => (
                      <li
                        key={subcategory}
                        className="text-gray-700 flex items-center hover:bg-gray-100 p-2 rounded"
                      >
                        <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                        {subcategory}
                        <button className="ml-auto text-[1.3rem] hover:bg-gray-200 p-2 rounded-full ">
                          <TbDotsVertical />
                        </button>
                      </li>
                    ))}
                    <li className="pt-2">
                      <button
                        className={` text-sm ${
                          category.type === "income"
                            ? " hover:text-[#5A6ACF] text-[#5A6ACF]"
                            : " hover:text-[#F99C30] text-[#F99C30]"
                        } flex items-center  `}
                      >
                        <LuPlus />
                        Add Subcategory
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Add New Category Button */}
    </div>
  );
}
