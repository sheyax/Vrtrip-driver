import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import DriverCard from "../Components/DriverCard";
import TripCard from "../Components/TripCard";
import Cookies from "js-cookie";


export default function Home({ Useroles }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [trips, setTrips] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [car, setCar]=useState()
  const [sup, setSup]=useState()

  
  
  //get user
  useEffect(() => {
    const getVehicle=async  (id) =>{
      try{
        const res = await axios.get(
          `${process.env.BACKEND_URL}/feed/vehicles/${id}`,
          {
            withCredentials: true,
          }
        );
        const info = await res.data
        setCar(info._doc)
        setVehicleNumber(car.carNumber)
  
      }catch(err){
        console.log('error geeting vehicle', err)
      }
    }

    const getSup=async  (id) =>{
      try{
        const res = await axios.get(
          `${process.env.BACKEND_URL}/feed/engineers/${id}`,
          {
            withCredentials: true,
          }
        );
        const info = await res.data
        setSup(info._doc)
      console.log(sup)
  
      }catch(err){
        console.log('error geeting vehicle', err)
      }
    }

    const getUser = async () => {
      try {
        const res = await axios.get(
          `${process.env.BACKEND_URL}/auth/driver/user`,
          {
            withCredentials: true,
          }
        );

        if (!res.data) {
        }
        const info = await res.data;
        // const {token}= info
        // Cookies.set('jwt',token)
        setUsername(info.username);
        getVehicle(info.assignedVehicle);
        getSup(info.supervisor)
        setTrips(info.dailyTrips);
        setUserRole(info.roles);
      } catch (err) {
        console.log("Error getting user", err);
        router.push("/login");
      }
    };

    getUser();
  }, []);

  Useroles = userRole;

  let totalTrip = 0;
  let totalWorkHours = 0;
  let totalOverTime = 0;
  // Total Trip Function
  trips.forEach((data) => {
    if (!data?.aprroved) return;
    totalTrip += data.endOdometer - data.startOdometer;

    // working hours
    let startingTime = new Date(`${data.date}T${data.startTime}`).getTime();
    let endingTime = new Date(`${data.date}T${data.endTime}`).getTime();
    let workingHours = (endingTime - startingTime) / 60000 / 60;
    totalWorkHours += workingHours;

    //OverTime
    if (data.endTime >= "18:00" && data.endTime < "7:00") {
      totalOverTime += workingHours;
    }

    //add outstation
  });

  console.log("total work hours :", totalWorkHours);
  console.log("total OverTime :", totalOverTime);

  //console.log(trips[0].endTime >= "18:00" && trips[0].endTime < "7:00");

  const logout = async () => {
    try {
      const res = await axios.post(`${process.env.BACKEND_URL}/auth/logout`);

      router.push("/login");
    } catch (err) {}
  };

  //DRIVER FRONTEND

  return (
    <div>
      <div>
        {/* logout */}
        <p className="text-sm text-center font-semibold
         text-white p-2 cursor-pointer
          bg-red-500 w-1/4 mx-2 my-2 
          rounded-lg hover:scale-95 transition duration-200 ease-out" onClick={logout}>
          Logout
        </p>
      </div>
      <DriverCard name={username} vehicle={vehicleNumber} se={sup?.name} />

      <div className="flex justify-between items-center mx-5">
        <h1 className="text-xl p-2  font-bold text-gray-700">Trips</h1>

        <p className="text-gray-600">Total Milage: {totalTrip} Km</p>
      </div>
      {trips?.map((trip, i) => (
        <div key={trip._id}>
          <TripCard
          index= {trip._id}
            key={trip.startTime}
            date={trip.date}
            startOdo={trip.startOdometer}
            endOdo={trip.endOdometer}
            startTime={trip.startTime}
            endTime={trip.endTime}
            startLoc={trip.startLocation}
            endLoc={trip.endLocation}
            approved={trip.aprroved}
            completed={trip.completed}
          />
        </div>
      )).reverse()}
    </div>
  );
}
