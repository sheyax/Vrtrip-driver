import React, { useEffect, useState } from "react";
import axios from "axios";
import DriverCard from "../Components/DriverCard";
import TripApproveCard from "../Components/TripApproveCard";

export default function EngineerDash() {
    const [driverId, setDriverId] = useState("");
    const [vehicleNumber, setVehicleNumber] = useState("");
    const [trips, setTrips] = useState([]);
    const [driverName, setDriverName] = useState("");
    //get Engineer
    useEffect(() => {
        const getDriver = async(id) => {
            try {
                const res = await axios.get(
                    `https://vrtrip-db.vercel.app/feed/drivers/${id}`, {
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

        const getEng = async() => {
            try {
                const res = await axios.get(
                    "https://vrtrip-db.vercel.app/auth/engineer/user", {
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

    return ( <
        div >
        <
        DriverCard name = { driverName }
        vehicle = { vehicleNumber }
        /> <
        div className = "flex justify-between items-center mx-5" >
        <
        h1 className = "text-xl p-2  font-bold text-gray-700" > Trips < /h1>

        { /* <p className="text-gray-600">Total Milage: {totalTrip} Km</p> */ } <
        /div>

        {
            trips ? .map((trip) => ( <
                div key = { trip._id } >
                <
                TripApproveCard key = { trip.startTime }
                date = { trip.date }
                startOdo = { trip.startOdometer }
                endOdo = { trip.endOdometer }
                startTime = { trip.startTime }
                endTime = { trip.endTime }
                startLoc = { trip.startLocation }
                endLoc = { trip.endLocation }
                approved = { trip.aprroved }
                driverId = { driverId }
                tripId = { trip._id }
                /> <
                /div>
            ))
        } <
        /div>
    );
}