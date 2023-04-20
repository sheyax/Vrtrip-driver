import React, { useEffect, useState } from "react";
import axios from "axios";
import DriverCard from "../Components/DriverCard";
import TripApproveCard from "../Components/TripApproveCard";
import { useRouter } from "next/router";

export default function EngineerDash() {
  const [driverId, setDriverId] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [trips, setTrips] = useState([]);
  const [driverName, setDriverName] = useState("");
  const router = useRouter();
  //get Engineer
  useEffect(() => {
    const getDriver = async (id) => {
      try {
        const res = await axios.get(
          `${process.env.BACKEND_URL}/feed/drivers/${id}`,
          {
            withCredentials: true,
          }
        );

        const driverInfo = await res.data._doc;
        // console.log(driverInfo);
        setDriverName(driverInfo.username);
        setVehicleNumber(driverInfo.assignedVehicle);
        setTrips(driverInfo.dailyTrips);
      } catch (err) {}
    };

    const getEng = async () => {
      try {
        const res = await axios.get(
          `${process.env.BACKEND_URL}/auth/engineer/user`,
          {
            withCredentials: true,
          }
        );

        const info = await res.data;
        setDriverId(info.driverId);
        getDriver(info.driverId);
      } catch (err) {}
    };

    getEng();
  }, []);

  const logout = async () => {
    try {
      const res = await axios.delete(
        `${process.env.BACKEND_URL}/auth/eng/logout`
      );

      router.push("/login");
    } catch (err) {
      console.log("logout error", err);
    }
  };

  return (
    <div>
      {/* logout */}
      <p className="text-sm text-red-500 p-2" onClick={logout}>
        Logout
      </p>
      <DriverCard name={driverName} vehicle={vehicleNumber} />{" "}
      <div className="flex justify-between items-center mx-5">
        <h1 className="text-xl p-2  font-bold text-gray-700"> Trips </h1>
        {/* <p className="text-gray-600">Total Milage: {totalTrip} Km</p> */}{" "}
      </div>
      {trips?.map((trip) => (
        <div key={trip._id}>
          <TripApproveCard
            key={trip.startTime}
            date={trip.date}
            startOdo={trip.startOdometer}
            endOdo={trip.endOdometer}
            startTime={trip.startTime}
            endTime={trip.endTime}
            startLoc={trip.startLocation}
            endLoc={trip.endLocation}
            approved={trip.aprroved}
            driverId={driverId}
            tripId={trip._id}
          />{" "}
        </div>
      ))}{" "}
    </div>
  );
}
