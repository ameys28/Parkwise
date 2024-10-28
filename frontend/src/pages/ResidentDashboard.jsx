// src/pages/ResidentDashboard.js

import React, { useState } from "react";
import { vehicles, entryLogs } from "../data/staticData";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/logo1.png";

const ResidentDashboard = () => {
  const [vehiclesList, setVehiclesList] = useState(vehicles);
  const [parkingLogsList, setParkingLogsList] = useState(entryLogs);
  const [occupancy, setOccupancy] = useState(
    entryLogs.filter((log) => !log.exitTime).length
  );
  const [newVehicleNumber, setNewVehicleNumber] = useState("");
  const [guestVehicleNumber, setGuestVehicleNumber] = useState("");
  const navigate = useNavigate();

  const handleRegisterVehicle = () => {
    if (!newVehicleNumber) {
      toast.error("Please enter a vehicle number.");
      return;
    }
    const newVehicle = {
      id: vehiclesList.length + 1,
      ownerId: 1,
      numberPlate: newVehicleNumber,
      guest: false,
    };
    setVehiclesList([...vehiclesList, newVehicle]);
    setNewVehicleNumber("");
    toast.success("Vehicle registered successfully!");
  };

  const handleClick = () => {
    navigate("/");
    toast.info("Logged out successfully!");
  };

  const handleReserveGuestParking = () => {
    if (!guestVehicleNumber) {
      toast.error("Please enter a guest vehicle number.");
      return;
    }
    const guestVehicle = {
      id: vehiclesList.length + 1,
      ownerId: null,
      numberPlate: guestVehicleNumber,
      guest: true,
    };
    setVehiclesList([...vehiclesList, guestVehicle]);
    setGuestVehicleNumber("");
    toast.success("Guest parking reserved successfully!");
  };

  return (
    <div className="resident-dashboard min-h-screen" style={{ backgroundColor: "#F5F9D0", fontFamily: "'Kalnia', sans-serif" }}>
  <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

  {/* Navbar */}
  <header className="flex justify-between items-center py-3 px-8" style={{ backgroundColor: "#FF9FA0" }}>
    <div className="logo flex items-center">
      <img src={logo} alt="ParkWise Logo" className="h-16 w-auto" />
    </div>
    <h2 className="text-4xl font-bold" style={{ color: "#3B3B3B" }}>
      Resident Dashboard
    </h2>
    <button
      className="bg-[#E44A4A] text-white px-5 py-2 rounded-full shadow transition duration-300"
      onClick={handleClick}
      style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: "bold" }}
    >
      Logout
    </button>
  </header>

  {/* Main Content */}
  <div className="grid grid-cols-2 gap-8 px-8 mt-10">
    {/* Resident Reservation Section */}
    <section
      className="p-8 rounded-lg shadow-md border border-black"
      style={{ backgroundColor: "#F9DFD8", color: "#3B3B3B", fontFamily: "'Orbitron', sans-serif" }}
    >
      <h3 className="text-2xl font-bold mb-4 text-center">
        Resident Reservation
      </h3>
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Enter Vehicle Number"
          value={newVehicleNumber}
          onChange={(e) => setNewVehicleNumber(e.target.value)}
          className="p-2 w-full rounded-l-full border border-black"
          style={{ backgroundColor: "#ECECEC", color: "#3B3B3B" }}
        />
        <button
          className="bg-[#E44A4A] text-white ml-6 px-4 py-1 rounded-r-full shadow transition text-sm font-semibold"
          onClick={handleRegisterVehicle}
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          SAVE
        </button>
      </div>
    </section>

    {/* Guest Reservation Section */}
    <section
      className="p-8 rounded-lg shadow-md border border-black"
      style={{ backgroundColor: "#F9DFD8", color: "#3B3B3B", fontFamily: "'Orbitron', sans-serif" }}
    >
      <h3 className="text-2xl font-bold mb-4 text-center">
        Guest Reservation
      </h3>
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Enter Guest Vehicle Number"
          value={guestVehicleNumber}
          onChange={(e) => setGuestVehicleNumber(e.target.value)}
          className="p-2 w-full rounded-l-full border border-black"
          style={{ backgroundColor: "#ECECEC", color: "#3B3B3B" }}
        />
        <button
          className="bg-[#E44A4A] text-white ml-6 px-4 py-1 rounded-r-full shadow transition text-sm font-semibold"
          onClick={handleReserveGuestParking}
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          SAVE
        </button>
      </div>
    </section>
  </div>

  {/* Occupancy Section */}
  <section className="px-8 mt-10">
    <div
      className="p-6 rounded-lg shadow-md text-center border border-black"
      style={{ backgroundColor: "#F9DFD8", color: "#3B3B3B" }}
    >
      <h3 className="text-2xl font-semibold" style={{ fontFamily: "'Orbitron', sans-serif" }}>
        OCCUPANCY
      </h3>
      <p className="text-md font-semibold mt-2">
        Total Spots = 20 <br />
        Current Occupancy: {occupancy} spot(s) filled
      </p>
    </div>
  </section>

  {/* Logs and Registered Vehicles */}
  <div className="grid grid-cols-2 gap-8 px-8 mt-10">
    {/* Parking Logs */}
    <section
      className="p-6 rounded-r-3xl shadow-lg border border-black max-h-fit"
      style={{
        backgroundColor: "#F9DFD8",
        color: "#3B3B3B",
        fontFamily: "'Orbitron', sans-serif",
        boxShadow: "8px 8px 0px #D1A3A4",
      }}
    >
      <h3 className="text-lg font-semibold mb-4 text-center">
        Parking Logs
      </h3>
      <ul className="overflow-y-auto" style={{ maxHeight: "200px" }}>
        {entryLogs.map((log) => {
          const vehicleNumber = log.numberPlate || "Unknown";
          const entryTime = new Date(log.timestamp);
          const formattedEntryTime = entryTime.toString() !== "Invalid Date" ? entryTime.toLocaleString() : "Invalid Date";

          return (
            <li
              key={log.id}
              className="py-3 px-4 rounded-lg border border-[#FF9FA0] transition hover:bg-[#FFDADA] mb-2"
              style={{ color: "#3B3B3B" }}
            >
              Vehicle {vehicleNumber} - {log.exitTime ? "Exited" : "Entered"} at {formattedEntryTime}
            </li>
          );
        })}
      </ul>
    </section>

    {/* Registered Vehicles */}
    <section
      className="p-6 rounded-l-3xl shadow-lg border border-black max-h-fit"
      style={{
        backgroundColor: "#F9DFD8",
        color: "#3B3B3B",
        fontFamily: "'Orbitron', sans-serif",
        boxShadow: "8px 8px 0px #D1A3A4",
      }}
    >
      <h3 className="text-lg font-semibold mb-4 text-center">
        Registered Vehicles
      </h3>
      <ul className="overflow-y-auto" style={{ maxHeight: "200px" }}>
        {vehiclesList.map((vehicle) => (
          <li
            key={vehicle.id}
            className="py-3 px-4 rounded-lg border border-[#FF9FA0] transition hover:bg-[#FFDADA] mb-2"
            style={{ color: "#3B3B3B" }}
          >
            {vehicle.numberPlate} {vehicle.guest ? "(Guest)" : ""}
          </li>
        ))}
      </ul>
    </section>
  </div>
</div>

  );
};

export default ResidentDashboard;
