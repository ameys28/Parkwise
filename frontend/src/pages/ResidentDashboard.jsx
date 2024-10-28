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
    <div
      className="resident-dashboard min-h-screen"
      style={{ backgroundColor: "#F5F9D0" }}
    >
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
      <header className="flex justify-between items-center py-2 px-8 bg-[#ff9fa0] shadow-md mb-8">
        <div className="logo flex items-center">
          <img src={logo} alt="ParkWise Logo" className="h-20 w-30" />
        </div>
        <h2
          className="text-4xl font-bold text-center"
          style={{ color: "#4A6D0A" }}
        >
          Resident Dashboard
        </h2>
        <div className="space-x-4">
          <button
            className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition duration-300 shadow-md"
            onClick={handleClick}
          >
            Logout
          </button>
        </div>
      </header>
      {/* Section: Registered Vehicles */}
      <section className="mb-10 px-8">
        <h3
          className="text-2xl font-semibold mb-6"
          style={{ color: "#4A6D0A" }}
        >
          Registered Vehicles
        </h3>
        <ul
          className="p-6 rounded-lg shadow space-y-4"
          style={{ backgroundColor: "#FFDFB0" }}
        >
          {vehiclesList.map((vehicle) => (
            <li
              key={vehicle.id}
              className="py-3 px-4 rounded-lg border border-[#D16C6C] transition hover:bg-[#FF9FA0]"
              style={{ color: "#4A6D0A" }}
            >
              {vehicle.numberPlate} {vehicle.guest ? "(Guest)" : ""}
            </li>
          ))}
        </ul>
      </section>
      <section className="mb-10 px-8">
        <h3
          className="text-2xl font-semibold mb-6"
          style={{ color: "#4A6D0A" }}
        >
          Parking Logs
        </h3>
        <ul
          className="p-6 rounded-lg shadow space-y-4"
          style={{ backgroundColor: "#FFDFB0" }}
        >
          {entryLogs.map((log) => {
            // Using static data directly from entryLogs
            const vehicleNumber = log.numberPlate || "Unknown"; // Assuming log has a vehicleNumber field
            const entryTime = new Date(log.timestamp);
            const formattedEntryTime =
              entryTime.toString() !== "Invalid Date"
                ? entryTime.toLocaleString()
                : "Invalid Date";

            return (
              <li
                key={log.id}
                className="py-3 px-4 rounded-lg border border-[#D16C6C] transition hover:bg-[#FF9FA0]"
                style={{ color: "#4A6D0A" }}
              >
                Vehicle {vehicleNumber} - {log.exitTime ? "Exited" : "Entered"}{" "}
                at {formattedEntryTime}
              </li>
            );
          })}
        </ul>
      </section>
      <section className="mb-10 px-8">
        <h3
          className="text-2xl font-semibold mb-6"
          style={{ color: "#4A6D0A" }}
        >
          Current Occupancy
        </h3>
        <div
          className="p-6 rounded-lg shadow text-center"
          style={{ backgroundColor: "#FFDFB0", color: "#4A6D0A" }}
        >
          <p className="text-xl">
            Current Occupancy: {occupancy} spot(s) filled
          </p>
        </div>
      </section>
      {/* Section: Register New Vehicle */}
      <section className="mb-10 px-8">
        <h3
          className="text-2xl font-semibold mb-6"
          style={{ color: "#4A6D0A" }}
        >
          Register New Vehicle
        </h3>
        <input
          type="text"
          placeholder="Enter vehicle number"
          value={newVehicleNumber}
          onChange={(e) => setNewVehicleNumber(e.target.value)}
          className="p-3 border rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-[#4A6D0A]"
          style={{ borderColor: "#D16C6C", color: "#4A6D0A" }}
        />
        <button
          className="py-3 px-6 rounded-lg bg-[#4A6D0A] hover:text-lg transition text-white"
          onClick={handleRegisterVehicle}
        >
          Register Vehicle
        </button>
      </section>
      {/* Section: Reserve Guest Parking */}
      <section className="mb-10 px-8">
        <h3
          className="text-2xl font-semibold mb-6"
          style={{ color: "#4A6D0A" }}
        >
          Reserve Guest Parking
        </h3>
        <input
          type="text"
          placeholder="Enter guest vehicle number"
          value={guestVehicleNumber}
          onChange={(e) => setGuestVehicleNumber(e.target.value)}
          className="p-3 border rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-[#FF9FA0]"
          style={{ borderColor: "#D16C6C", color: "#4A6D0A" }}
        />
        <button
          className="py-3 px-6 rounded-lg bg-[#FF9FA0] hover:bg-[#FFDFB0] transition text-white"
          onClick={handleReserveGuestParking}
        >
          Reserve Guest Parking
        </button>
      </section>
    </div>
  );
};

export default ResidentDashboard;
