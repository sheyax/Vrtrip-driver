import Link from "next/link";
import React from "react";

export default function FooterMenu() {
  return (
    <footer className="sticky mt-auto">
      <div
        className="bg-white z-50 shadow-[0_-10px_10px_-15px_rgba(0,0,0,0.3)]
     flex justify-evenly p-5 items-center rounded-t-2xl"
      >
        <Link
          href="/"
          className="hover:scale-105 hover:font-semibold transition transfrom duration-300 ease-out"
        >
          <h1>Trips</h1>
        </Link>
        <Link
          href="/triplog"
          className="bg-blue-300 p-3 rounded-xl 
        font-semibold text-sm hover:scale-105 transition transfrom duration-300 ease-out"
        >
          <h1>New Log</h1>
        </Link>
        {/* <Link
          href="/"
          className="hover:scale-105 hover:font-semibold transition transfrom duration-300 ease-out"
        >
          <h1>Fuel</h1>
        </Link> */}
      </div>
    </footer>
  );
}
