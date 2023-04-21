import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function EngineerAuth() {
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  //user login

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // const res = await fetch(
      //   "https://8vsqx6-5000.csb.app/auth/engineer/login",
      //   {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     credentials: "include",
      //     body: JSON.stringify({
      //       username,
      //       password,
      //     }),
      //   }
      // );

      const res = await axios.post(
        `${process.env.BACKEND_URL}/auth/engineer/login`,
        {
          engineerId: username,
          password,
        },
        {
          withCredentials: true,
        }
      );

      const data = await res.data;
      if (data == "Failed") {
        alert("invalid details");
        setError("unsuccessful");
      } else {
        const info = data;

        alert("succesful");
        setError("");
        router.push("/engineerDash");
      }
    } catch (err) {
      setError("unsuccessful");
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center mt-2">
        <h1 className="m-auto font-semibold text-lg ">Engineer Login</h1>
      </div>
      {error && <p>{error}</p>}

      <div className="mt-5">
        <form
          onSubmit={handleLogin}
          className=" flex items-center flex-col space-y-3"
        >
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            placeholder="Username"
            className="w-3/4 p-2 m-auto rounded-lg shadow-md outline-none text-sm"
          />

          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-3/4 p-2 m-auto rounded-lg shadow-md outline-none text-sm"
          />

          <button
            type="submit"
            className="bg-blue-500 p-2 rounded-lg text-white shadow-sm font-semibold hover:scale-105 hover:font-bold transition transfrom duration-300 ease-out "
          >
            Login
          </button>
        </form>
        <div className="">
          <h1
            onClick={() => {
              router.push("/login");
            }}
            className="p-2 text-md text-neutral-500 
            hover:font-semibold hover:text-blue-500
             text-center transition duration-200 ease-in cursor-pointer "
          >
            Driver Login{" "}
          </h1>{" "}
        </div>{" "}
      </div>
    </div>
  );
}
