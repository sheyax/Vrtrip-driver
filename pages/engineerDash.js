import React, { useEffect, useState } from "react";
import axios from "axios";
import DriverCard from "../Components/DriverCard";
import TripApproveCard from "../Components/TripApproveCard";
import { useRouter } from "next/router";

export default function EngineerDash() {
  const [superId, setSuperId] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [drivers, setDrivers] = useState([]);
  const [driverName, setDriverName] = useState("");
  const router = useRouter();
  const [todo, setTodo] = useState([])

  //get Engineer
  useEffect(() => {
    const getDriver = async (id) => {
      try {
        const res = await axios.get(
          `${process.env.BACKEND_URL}/feed/drivers`,
          {
            withCredentials: true,
          }
        );

        const driverInfo = await res.data;
       // console.log(driverInfo);
    setDrivers(driverInfo)
    
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
        setSuperId(info._id);
        setTodo(info.toApprove)
        getDriver();
        //console.log(todo)
      } catch (err) {}
    };

    getEng();
  }, []);




  //Approve function 

  const onApprove= async (driverIdd, tripId, identifier, supId) => {
    var idTrip=""
    if (identifier){
      console.log(identifier)
      //find the driver by id 
      drivers.forEach(driver=>{
        if(driver._id=== driverIdd){
          console.log('driver found', driver)
          driver.dailyTrips.forEach(trip=>{
            //find trip with identifier 
            if(trip.identifier=== identifier){
              console.log('trip found',trip)
              idTrip= trip._id
              console.log('assigned id',idTrip)
            }
          })
        }
      })
    } else {
      idTrip = tripId
    }
    try {
      const res = await axios.put(
        `${process.env.BACKEND_URL}/feed/driver/${driverIdd}/dailytrips/${idTrip}`,
        {
          withCredentials: true,
        }
      );
      supApprove(supId)
      console.log("succesful");
      alert("approved");
      router.reload(window.location.engineerDash);
    } catch (err) {
      console.log("unsuccessful", err);
    }
  
  }

  const supApprove= async (toId)=>{
try{
  const res = await axios.put(
    `${process.env.BACKEND_URL}/feed/supervisor/${superId}/todos/${toId}`,
    {
      withCredentials: true,
    }
  );
  
}catch(err){
  console.log('could not update trip for supervisor', err)
}
  }

  //logout

  const logout = async () => {
    try {
      const res = await axios.post(
        `${process.env.BACKEND_URL}/auth/logout`
      );

      router.push("/login");
    } catch (err) {
      console.log("logout error", err);
    }
  };

  //Count to approve 
  var ApproveCount= 0
  todo.forEach(item=>{
    if(!item.isApproved){
      ApproveCount++
    }
  })

  // todo.forEach(item=>{
  //   if(item.identifier){
  //     drivers.forEach(driver=>{
  //       if(driver._id===item.driver){
  //         console.log('driver found', driver)
  //         driver.dailyTrips.forEach(trip=>{
  //           if(trip.identifier===item.identifier){
  //             console.log('trip found',trip)
  //           }
  //         })
  //       }
  //     })
  //   }
  // })

  return (
    <div>
      {/* logout */}
      <p className="text-sm text-center font-semibold
         text-white p-2 cursor-pointer
          bg-red-500 w-1/4 mx-2 my-2 
          rounded-lg hover:scale-95 transition duration-200 ease-out" onClick={logout}>
          Logout
        </p>
      {/* <DriverCard name={driverName} vehicle={vehicleNumber} />{" "} */}
      <div className="flex justify-between items-center mx-5">
        <h1 className="text-xl p-2  font-bold text-gray-700"> Pending Approval <span className="bg-red-500 text-white p-2 text-sm rounded-full ">{ApproveCount}</span>  </h1>
        {/* <p className="text-gray-600">Total Milage: {totalTrip} Km</p> */}{" "}
      </div>
      {todo?.map((trip) => (
        <div key={trip._id}>
          <TripApproveCard
            key={trip.startTime}
            date={trip.date}
            startOdo={trip.startMileage}
            endOdo={trip.endMileage}
            startTime={trip.startTime}
            endTime={trip.endTime}
            startLoc={trip.startLocation}
            endLoc={trip.endLocation}
            approved={trip.isApproved}
            driverId={trip.driver}
            tripId={trip.tripId}
            identifier={trip.identifier}
            onApprove={()=>onApprove(trip.driver, trip.tripId, trip.identifier, trip._id)}
          />{" "}
        </div>
      )).reverse()}{" "}

    
    </div>
  );
}
