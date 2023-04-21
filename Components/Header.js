import { useRouter } from "next/router";
import React, { useState } from "react";

export default function Header() {

  const router = useRouter()
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-blue-500 p-5 sticky z-50 flex justify-between items-center">
        <span className="font-bold text-white cursor-pointer" onClick={()=>{
          router.push('/')
        }} >Drivelog</span>
        <p className="font-bold text-white">{date}</p>
      </div>
    </header>
  );
}
