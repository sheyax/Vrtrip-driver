import React, { useState } from "react";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [driverId, setDriverId] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios(
        "https://vrtrip-db.vercel.app/auth/driver/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          credentials: true,
          data: {
            username,
            password: password,
            driverId,
            vehicle: vehicleNumber,
            vehicleModel,
          },
        }
      );
      alert("succesful");
      console.log(response.json());
    } catch (err) {
      setError("unsuccessful");
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center mt-2">
        <h1 className="m-auto font-semibold text-lg ">Register New Driver</h1>
      </div>
      {error && <p>{error}</p>}
      <div className="mt-5 ">
        <form
          onSubmit={handleSubmit}
          className=" flex items-center flex-col space-y-3"
        >
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-3/4 p-2 m-auto rounded-lg shadow-md outline-none text-sm"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-3/4 p-2 m-auto rounded-lg shadow-md  outline-none text-sm"
          />

          <input
            type="text"
            placeholder="Driver ID"
            value={driverId}
            onChange={(e) => setDriverId(e.target.value)}
            className="w-3/4 p-2 m-auto rounded-lg shadow-md  outline-none text-sm"
          />

          <input
            type="text"
            placeholder="vehicle Number"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            className="w-3/4 p-2 m-auto rounded-lg shadow-md  outline-none text-sm"
          />

          <input
            type="text"
            placeholder="vehicle Model"
            value={vehicleModel}
            onChange={(e) => setVehicleModel(e.target.value)}
            className="w-3/4 p-2 m-auto rounded-lg shadow-md  outline-none text-sm"
          />

          <button
            type="submit"
            className="bg-blue-500 p-2 rounded-lg shadow-sm font-semibold hover:scale-105 hover:font-bold transition transfrom duration-300 ease-out "
          >
            Register Driver
          </button>
        </form>
      </div>
    </div>
  );
}
