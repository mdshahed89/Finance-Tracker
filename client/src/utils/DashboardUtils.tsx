import Link from "next/link";
import { forwardRef, useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaMoneyBillWave } from "react-icons/fa";
import { HiMiniMinus } from "react-icons/hi2";
import { MdArrowForwardIos } from "react-icons/md";
import { RiAddFill, RiSubtractFill } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type ModalType = "income" | "expense" | null;

export const AddIncomeOrExpense = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [type, setType] = useState<ModalType>(null);

  const showModal = (modalType: "income" | "expense") => {
    setOpenModal(true);
    setType(modalType);
  };

  const closeModal = () => {
    setOpenModal(false);
    setType(null);
  };

  return (
    <>
      <div className="fixed bottom-10 right-7 z-[100] ">
        <div className="flex items-center justify-center">
          <div className=" flex flex-col justify-center items-center gap-2 text-[1.3rem] ">
            <div
              onClick={() => showModal("income")}
              className="bg-[#5A6ACF] p-3 rounded-full text-white cursor-pointer shadow-md transition-all "
            >
              <AiOutlinePlus />
            </div>
            <div
              onClick={() => showModal("expense")}
              className="bg-[#F99C30] p-3 rounded-full text-white cursor-pointer shadow-md"
            >
              <HiMiniMinus />
            </div>
          </div>
          <div
            onClick={closeModal}
            className={`fixed top-0 left-0 z-[100] flex items-center justify-center ${
              openModal ? "opacity-1 visible" : "invisible opacity-0"
            } inset-0 h-full w-full bg-black/70 duration-100`}
          >
            <div
              onClick={(e_) => e_.stopPropagation()}
              className={`absolute z-[100] rounded-lg drop-shadow-2xl bg-white min-h-[40rem] p-[.7rem] lg:p-[1.5rem] max-w-[40rem] w-full ${
                openModal
                  ? "opacity-1 translate-y-0 duration-300"
                  : "-translate-y-20 opacity-0 duration-150"
              } group overflow-hidden`}
            >
              <div className=" flex items-center justify-between ">
                <h3 className=" text-[1.4rem] font-medium ">
                  {type === "income" ? "New Income" : "New Expense"}
                </h3>
                <div
                  onClick={closeModal}
                  className=" text-[#000] text-[1.6rem] cursor-pointer p-2 rounded-full shadow-inner bg-gray-50 "
                >
                  <RxCross1 />
                </div>
              </div>

              <div className=" mt-[2rem] ">
                <CategoryAndAmount type={type} />
                <Accounts type={type} />
                <DateTimePicker type={type} />
                <OtherDetails type={type} />
              </div>

              <div className=" mt-[2rem] flex items-center gap-2 justify-end ">
                <button className={` ${type === "income" ? "bg-[#5A6ACF]" : "bg-[#F99C30]"}  px-8 py-2 font-medium rounded-md text-[#fff] `}>Save</button>
                <button className={` ${type === "income" ? "bg-[#5A6ACF]" : "bg-[#F99C30]"}  px-8 py-2 font-medium rounded-md text-[#fff] `}>Save & New</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

type Category = {
  name: string;
  subcategories: string[];
};

const incomeCategory: Category[] = [
  {
    name: "Salary",
    subcategories: ["Base Salary", "Bonus", "Overtime"],
  },
  {
    name: "Freelance",
    subcategories: ["Client Projects", "Consulting", "Side Hustle"],
  },
  {
    name: "Investments",
    subcategories: ["Dividends", "Stocks", "Crypto", "Real Estate"],
  },
  {
    name: "Food/Drinks",
    subcategories: ["Groceries", "Dining Out", "Coffee/Snacks"],
  },
  {
    name: "Shopping",
    subcategories: ["Clothing", "Electronics", "Home Goods"],
  },
  {
    name: "Transportation",
    subcategories: ["Fuel", "Public Transit", "Maintenance", "Ride Share"],
  },
  {
    name: "Housing",
    subcategories: ["Rent/Mortgage", "Utilities", "Repairs", "Furniture"],
  },
  {
    name: "Health",
    subcategories: ["Insurance", "Medications", "Gym", "Checkups"],
  },
];

type RowData = {
  category: string;
  value: string;
  categoryOpen: boolean;
  expandedCategory: string | null;
};

const CategoryAndAmount = ({type}:{type: string | null}) => {
  const [rows, setRows] = useState<RowData[]>([
    {
      category: "Select Category",
      value: "",
      categoryOpen: false,
      expandedCategory: null,
    },
  ]);

  const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      rows.forEach((_, index) => {
        if (
          categoryRefs.current[index] &&
          !categoryRefs.current[index]?.contains(target)
        ) {
          setRows((prev) =>
            prev.map((row, i) =>
              i === index ? { ...row, categoryOpen: false } : row
            )
          );
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [rows]);

  const toggleCategory = (rowIndex: number, name: string) => {
    setRows((prev) =>
      prev.map((row, i) =>
        i === rowIndex
          ? {
              ...row,
              expandedCategory: row.expandedCategory === name ? null : name,
            }
          : row
      )
    );
  };

  const updateCategory = (rowIndex: number, subcategory: string) => {
    setRows((prev) =>
      prev.map((row, i) =>
        i === rowIndex
          ? {
              ...row,
              category: subcategory,
              categoryOpen: false,
              expandedCategory: null,
            }
          : row
      )
    );
  };

  const updateValue = (rowIndex: number, value: string) => {
    setRows((prev) =>
      prev.map((row, i) => (i === rowIndex ? { ...row, value } : row))
    );
  };

  const addRow = () => {
    const allFilled = rows.every(
      (row) => row.category !== "Select Category" && Number(row.value) > 0
    );

    if (allFilled) {
      setRows((prev) => [
        ...prev,
        {
          category: "Select Category",
          value: "",
          categoryOpen: false,
          expandedCategory: null,
        },
      ]);
    }
  };

  const removeRow = (index: number) => {
    setRows((prev) => prev.filter((_, i) => i !== index));
  };

  const total = rows.reduce((sum, row) => {
    const num = parseFloat(row.value);
    return sum + (isNaN(num) ? 0 : num);
  }, 0);

  return (
    <>
      <div className=" mt-16 space-y-12 ">
        {rows.map((row, index) => (
          <div key={index} className="flex items-center gap-2 ">
            <div className={` md:flex hidden ${type === "income" ? "bg-[#5A6ACF]/5" : "bg-[#F99C30]/5"} p-3 text-[1.6rem] rounded-full w-fit`}>
              <FaMoneyBillWave />
            </div>
            <div className="flex items-center gap-3 w-full">
              <div
                className="flex-1 relative space-y-2 -mt-9 "
                ref={(el) => {
                  categoryRefs.current[index] = el;
                }}
              >
                <label htmlFor="" className=" text-gray-800 ">
                  Category*
                </label>
                <div
                  className={` w-full px-4 py-2 border border-gray-200 rounded-md bg-white cursor-pointer ${
                    row.category === "Select Category"
                      ? "text-gray-600"
                      : "text-[#131313] "
                  } `}
                  onClick={() => {
                    setRows((prev) =>
                      prev.map((r, i) =>
                        i === index
                          ? { ...r, categoryOpen: !r.categoryOpen }
                          : r
                      )
                    );
                  }}
                >
                  {row.category}
                </div>
                {row.categoryOpen && (
                  <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-10">
                    {incomeCategory.map((category) => (
                      <div key={category.name}>
                        <li
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                          onClick={() => toggleCategory(index, category.name)}
                        >
                          <div>{category.name}</div>
                          <MdArrowForwardIos
                            className={`${
                              row.expandedCategory === category.name
                                ? "rotate-90"
                                : "rotate-0"
                            } text-[.9rem] transition-all duration-300 ease-in-out`}
                          />
                        </li>
                        {row.expandedCategory === category.name && (
                          <div className="bg-gray-50 p-3 pl-6">
                            <ul className="space-y-2">
                              {category.subcategories.map((subcategory) => (
                                <li
                                  key={subcategory}
                                  onClick={() =>
                                    updateCategory(index, subcategory)
                                  }
                                  className="text-gray-700 flex items-center hover:bg-gray-100 p-2 rounded cursor-pointer"
                                >
                                  <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                                  {subcategory}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </ul>
                )}
              </div>

              <div className="flex-1 flex items-center gap-2 -mt-9">
                <div className=" space-y-2 ">
                  <label htmlFor="" className=" text-gray-800  ">
                    Value*
                  </label>
                  <input
                    type="number"
                    value={row.value}
                    onChange={(e) => updateValue(index, e.target.value)}
                    placeholder="Value"
                    className="px-3 py-2 border rounded-md outline-none w-full"
                  />
                </div>
                <span className="text-[1.4rem] text-gray-600">$</span>
              </div>

              <div className="p-2 rounded-full bg-gray-50 shadow-inner flex items-center justify-center text-[1.3rem] cursor-pointer w-fit h-fit">
                {index === rows.length - 1 ? (
                  <RiAddFill onClick={addRow} />
                ) : (
                  <RiSubtractFill onClick={() => removeRow(index)} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-end text-[1.2rem] font-medium text-gray-700 pt-[1rem]">
        <h4>Total: {total} $</h4>
      </div>
    </>
  );
};

const Accounts = ({type}:{type: string | null}) => {
  const [accountOpen, setAccountOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState("Select Account");
  const accoutns = ["Rupali Bank", "Islami Bank", "City Bank"];
  const accountRef = useRef<HTMLDivElement | null>(null);

  const handleChange = (value: string) => {
    setSelectedAccount(value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        accountRef.current &&
        !accountRef.current.contains(event.target as Node)
      ) {
        setAccountOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="flex items-end space-x-2 max-w-[25rem] ">
        <div className={` md:flex hidden ${type === "income" ? "bg-[#5A6ACF]/5" : "bg-[#F99C30]/5"} p-3 text-[1.6rem] rounded-full w-fit`}>
          <FaMoneyBillWave />
        </div>
        <div className=" relative w-full " ref={accountRef}>
          <label className="block text-gray-800 font-medium mb-1">
            Accounts*
          </label>
          <div
            className={` ${
              selectedAccount === "Select Account"
                ? "text-gray-600"
                : "text-[#131313]"
            } w-full px-4 py-2 border border-gray-300 rounded-lg bg-white cursor-pointer `}
            onClick={() => setAccountOpen(!accountOpen)}
          >
            {selectedAccount}
          </div>
          {accountOpen && (
            <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-10">
              {accoutns.map((account, idx) => (
                <li
                  key={idx}
                  className={` px-4 py-2 hover:bg-gray-100 cursor-pointer `}
                  onClick={() => {
                    handleChange(account);
                    setAccountOpen(false);
                  }}
                >
                  {account}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

type CustomInputProps = {
  value?: string;
  onClick?: () => void;
};

const CustomInput = forwardRef<HTMLButtonElement, CustomInputProps>(
  ({ value, onClick }, ref) => (
    <button
      onClick={onClick}
      ref={ref}
      className="w-full px-8 py-2 bg-white text-gray-800 border rounded-md outline-none transition-all text-left"
    >
      {value || "Select date and time"}
    </button>
  )
);
CustomInput.displayName = "CustomInput";

const DateTimePicker = ({type}:{type: string | null}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <div className="flex items-end space-x-2 ">
      <div className={` md:flex hidden ${type === "income" ? "bg-[#5A6ACF]/5" : "bg-[#F99C30]/5"} p-3 text-[1.6rem] rounded-full w-fit`}>
        <FaMoneyBillWave />
      </div>
      <div className="max-w-[30rem] w-full mt-6 space-y-2 ">
        <label className="block text-gray-700">Date & Time*</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date: Date | null) => setSelectedDate(date)}
          showTimeSelect
          timeIntervals={5}
          dateFormat="Pp"
          customInput={<CustomInput />}
          popperPlacement="bottom-start"
          className="w-full"
        />
      </div>
    </div>
  );
}


const OtherDetails = ({type}:{type: string | null}) => {
  return(
    <div className=" mt-[1.5rem] max-w-[25rem] space-y-6 ">
      <div className=" w-full flex items-end space-x-2 ">
      <div className={` md:flex hidden ${type === "income" ? "bg-[#5A6ACF]/5" : "bg-[#F99C30]/5"} p-3 text-[1.6rem] rounded-full w-fit`}>
        <FaMoneyBillWave />
      </div>
      <div className=" space-y-2 w-full ">
        <label htmlFor="">From</label>
        <input type="text" className=" outline-none border rounded-md py-2 px-3 w-full " placeholder="Enter Name" name="" id="" />
      </div>
    </div>
      <div className=" w-full flex items-end space-x-2 ">
      <div className=" md:flex hidden p-3 text-[1.6rem] rounded-full bg-gray-100 w-fit h-fit ">
        <FaMoneyBillWave />
      </div>
      <div className=" space-y-2 w-full ">
        <label htmlFor="">Note</label>
        <input type="text" className=" outline-none border rounded-md py-2 px-3 w-full " placeholder="Note" name="" id="" />
      </div>
    </div>
    </div>
  )
}


export const DashboardFooter = () => {
  return (
    <div className=" text-center pt-10 pb-7 space-y-3 mt-10 bg-[#3d488f] text-[#fff] ">
      <div>
        Secure your financial journey with Fintrack. By continuing, you agree to
        our{" "}
        <Link href={`/terms-of-service`} className=" text-[#e8ebff] underline ">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href={`/terms-of-service`} className=" text-[#e8ebff] underline ">
          Privacy Policy
        </Link>{" "}
        .
      </div>
      <p>
        © 2025 <span className=" text-[#e8ebff] ">Fintrack</span>. All rights
        reserved.
      </p>
    </div>
  );
};
