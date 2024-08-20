"use client";
import React from "react";
import SideMenu from "./SideMenu";

export const Container = ({ children }: any) => {
  return (
    <div className="ww-full h-full bg-gray-800 overflow-y-auto max-h-screen">
      <div className="flex flex-col md:flex-row w-full">
        <div className="md:w-[15%]">
          <SideMenu />
        </div>

        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};
