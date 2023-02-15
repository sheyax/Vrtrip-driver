import React from "react";

export default function DriverCard({ name, vehicle, se }) {
  return (
    <div className="p-5 flex justify-between mx-2 my-3 bg-white shadow-lg rounded-md ">
      <div>
        <h1 className="font-semibold text-lg text-gray-900">{name}</h1>
        <p className="text-gray-500">SE:{se}</p>
      </div>

      <div className="text-right">
        <p className="text-gray-500">Vehicle Number:</p>
        <p className="text-xl font-semibold text-gray-900">{vehicle}</p>
      </div>
    </div>
  );
}
