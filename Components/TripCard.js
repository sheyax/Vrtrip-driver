import { useRouter } from "next/router";
import React, { useState } from "react";

export default function TripCard({
  index,
  date,
  startOdo,
  endOdo,
  startLoc,
  endLoc,
  startTime,
  endTime,
  approved,
  completed
}) {
  const [showContent, setShowContent] = useState();
  const totalTrip = endOdo - startOdo;

  const router= useRouter()
  return (
    <div className={!approved ? "bg-red-200  border border-black my-2 rounded-md cursor-pointer" : "bg-white  border border-black my-2 rounded-md cursor-pointer"}>
      <div
        className="flex justify-between items-center text-gray-700 p-3 mx-5 my-2 text-sm cursor-pointer"
        onClick={() => {setShowContent(!showContent)}}
      >
        <p className={showContent? 'font-semibold duration-200 ease-in-out':''}>{date}</p>
        <p className={showContent? 'font-semibold duration-200 ease-in-out':''}>{totalTrip} Km </p>

        <div className={showContent? 'font-semibold duration-200 ease-in-out':''}>
          <p>
            {startTime} - {endTime}
          </p>
        </div>
      </div>

     
        <div className={showContent? ' duration-500 ease-out':'hidden'} >
          <div className="flex justify-between mx-5 p-2 text-gray-600 duration-200 ">
            <p>{startLoc}</p>
            <p className="text-sm px-2 border-solid border-2 border-gray-700 rounded-full">
              {startOdo}
            </p>
          </div>

          <div className="bg-gray-600 text-white rounded-l-full ml-5 p-2">
            <h1 className="ml-5 font-bold">{completed? totalTrip: 'in Progress . . .'} Km</h1>
          </div>
          <div className="flex justify-between mx-5 p-2 text-gray-600">
            <p>{endLoc}</p>
            <p
              className="text-sm px-2 border-solid 
                        border-2 border-gray-700 rounded-full"
            >
              {endOdo}
            </p>
          </div>

          <div className="mx-5 p-2">
            <button
            onClick={() => router.push(`trips/${index}`)}
              className={
                completed
                  ? "hidden"
                  : "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              }
            >
             Update trip
            </button>
          </div>
        </div>
     
    </div>
  );
}
