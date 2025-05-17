import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";
import { HiMiniMinus } from "react-icons/hi2";

export const AddIncomeOrExpense = () => {
  return (
    <div className=" fixed bottom-10 right-7 flex flex-col justify-center  items-center gap-2 text-[1.3rem] ">
      <div className=" bg-[#5A6ACF] p-3 rounded-full text-[#ffffff] cursor-pointer shadow-md ">
        <AiOutlinePlus />
      </div>
      <div className=" bg-[#F99C30] p-3 rounded-full text-[#ffffff] cursor-pointer shadow-md ">
        <HiMiniMinus />
      </div>
    </div>
  );
};

export const DashboardFooter = () => {
  return (
    <div className=" text-center pt-10 pb-7 space-y-3 mt-10 bg-[#3d488f] text-[#fff] ">
      <div >
        Secure your financial journey with Fintrack. By continuing, you agree to
        our{" "}
        <Link href={`/terms-of-service`} className=" text-[#e8ebff] underline ">
          Terms of Service
        </Link>{" "}
        and <Link href={`/terms-of-service`} className=" text-[#e8ebff] underline ">
          Privacy Policy
        </Link>{" "}.
      </div>
      <p>© 2025 <span className=" text-[#e8ebff] ">Fintrack</span>. All rights reserved.</p>
    </div>
  );
};
