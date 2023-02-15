import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function TripLog() {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [endOdometer, setEndOdometer] = useState("");
  const [startOdometer, setStartOdometer] = useState("");

  const [userId, setUserId] = useState("");
  const [trips, setTrips] = useState([]);
  const router = useRouter();

  //get user
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          "https://vrtrip-db.vercel.app/auth/driver/user",
          {
            withCredentials: true,
          }
        );

        if (!res.data) {
          router.push("/login");
        }
        const info = await res.data;
        setUserId(info._id);
        setTrips(info.dailyTrips);
      } catch (err) {
        console.log("Error getting user", err);
        router.push("/");
      }
    };

    getUser();
  }, []);

  const onSave = async () => {
    try {
      const trip = {
        date,
        startTime,
        endTime,
        startLocation,
        endLocation,
        startOdometer,
        endOdometer,
      };

      const res = await axios.put(
        `https://vrtrip-db.vercel.app/auth/driver/trip/${userId}`,
        {
          date,
          startTime,
          endTime,
          startLocation,
          endLocation,
          startOdometer,
          endOdometer,
        }
      );

      if (!res.data) {
        alert("unsuccessful");
      } else {
        alert("succesful");
        router.push("/");
      }
    } catch (err) {}
  };
  return (
    <div className="">
      <h1 className="p-3 font-semibold m-auto text-center">Daily Trip Log</h1>

      {/* Time */}
      <div className="m-auto w-4/5">
        <div className="flex items-center">
          <p>Date</p>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            name="Date"
            id=""
            className=" p-5 bg-transparent outline-none text-sm 
     text-gray-600 placeholder-gray-400"
          />
        </div>

        <div className="flex justify-between">
          <div>
            <p className="text-gray-600">Start Time</p>
            <input
              type="time"
              value={startTime}
              onChange={(e) => {
                setStartTime(e.target.value);
              }}
              name="startTime"
              id=""
              className="p-2 outline-none bg-transparent text-sm font-semibold border-b border-gray-600"
            />
          </div>

          <div className="">
            <p className="text-gray-600">End Time</p>
            <input
              type="time"
              name="startTime"
              value={endTime}
              onChange={(e) => {
                setEndTime(e.target.value);
              }}
              id=""
              className="p-2 bg-transparent text-sm font-semibold outline-none border-b border-gray-600"
            />
          </div>
        </div>
        {/* Location */}

        <div className="mt-5">
          <div>
            <p className="text-gray-600">From</p>
            <input
              type="text"
              name="startLocation"
              value={startLocation}
              onChange={(e) => {
                setStartLocation(e.target.value);
              }}
              id=""
              className="w-full outline-none  bg-transparent border-b border-gray-600 text-sm"
            />
          </div>

          <div>
            <p className="text-gray-600">To</p>
            <input
              type="text"
              name="endLocation"
              value={endLocation}
              onChange={(e) => {
                setEndLocation(e.target.value);
              }}
              id=""
              className="w-full outline-none  bg-transparent border-b border-gray-600 text-sm"
            />
          </div>
        </div>

        {/* ODOMETER */}

        <div className="mt-5 flex justify-between items-center">
          <div>
            <p>Beginning Odometer</p>
            <input
              type="number"
              name="startOdometer"
              value={startOdometer}
              onChange={(e) => setStartOdometer(e.target.value)}
              id=""
              placeholder="0000000"
              className="outline-none  bg-transparent border-b border-gray-600 text-sm"
            />
          </div>

          <div>
            <p>Ending Odometer</p>
            <input
              type="number"
              name="endOdometer"
              value={endOdometer}
              onChange={(e) => setEndOdometer(e.target.value)}
              id=""
              placeholder="0000000"
              className="outline-none  bg-transparent border-b border-gray-600 text-sm"
            />
          </div>
        </div>

        <button
          onClick={onSave}
          className="bg-green-500 p-2 w-1/4 mt-5 text-white font-semibold mx-auto"
        >
          Save
        </button>
      </div>
    </div>
  );
}
