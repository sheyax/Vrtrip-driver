import React from "react";
import FooterMenu from "../../Components/FooterMenu";
import Header from "../../Components/Header";

export default function LayoutProvider({ children }) {
  return (
    <div className="flex flex-col h-screen bg-gray-200">
      <Header />
      <div className="flex-grow h-20 overflow-y-scroll">{children}</div>
      <FooterMenu />
    </div>
  );
}
