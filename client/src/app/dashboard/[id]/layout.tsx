"use client";

import { PageLoading } from "@/components/Loading";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { AddIncomeOrExpense, DashboardFooter } from "@/utils/DashboardUtils";
import React, { useState, useEffect } from "react";

export default function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const [id, setId] = useState<string | null>(null);
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  useEffect(() => {
    params.then((res) => {
      setId(res.id);
    });
  }, [params]);

  if (!id) {
    return <PageLoading />;
  }

  return (
    <div className="min-h-[100vh] flex">
      <Sidebar id={id} isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar} />
      <div className=" w-full  ">
        <TopBar
          isOpenSidebar={isOpenSidebar}
          setIsOpenSidebar={setIsOpenSidebar}
        />
        <div
          className={` ${
            isOpenSidebar ? "ml-[0px]" : "xl:ml-[300px]"
          } mt-[70px] bg-[#ffffff] xl:px-10 px-3 md:px-5 pt-10 transition-all duration-300 ease-in-out `}
        >
          {children}
        </div>
        <div className={` ${isOpenSidebar ? "pl-[0px]" : "pl-[300px]"} `}>
          <DashboardFooter />
        </div>
      </div>
      <AddIncomeOrExpense />
    </div>
  );
}
