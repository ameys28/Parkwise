// src/pages/SecurityDashboard.js

import React, { useState } from "react";
import { entryLogs, notifications, vehicles } from "../data/staticData";
import { FaSearch, FaPlusCircle } from "react-icons/fa";
import NumberPlateRecognition from "./NumberPlateRecognition";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo1.png";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast notifications

const SecurityDashboard = () => {
  const [parkingLogs, setParkingLogs] = useState(entryLogs); // Initialize logs from static data
  const [vehicleId, setVehicleId] = useState("");
  const [overrideId, setOverrideId] = useState("");
  const [currentNotifications, setCurrentNotifications] = useState(notifications);  
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  // Function to add a new entry to the logs
  const addParkingLog = (numberPlate, isEntry) => {
    const logEntry = {
      vehicleId: numberPlate,
      numberPlate,
      action: isEntry ? "Entry" : "Exit",
      timestamp: new Date().toLocaleString(),
    };
    setParkingLogs((prevLogs) => [...prevLogs, logEntry]);
  };

  const handleManualOverride = () => {
    const vehicle = vehicles.find(
      (v) => v.numberPlate.toLowerCase() === vehicleId.toLowerCase()
    );
    if (vehicle) {
      toast.success(`Manual override successful for vehicle: ${vehicle.numberPlate}`);
      addParkingLog(vehicle.numberPlate, true);
      setVehicleId("");
    } else {
      toast.error("Vehicle not found for override.");
    }
  };

  const handleSearchVehicle = () => {
    const vehicle = vehicles.find(
      (v) => v.numberPlate.toLowerCase() === vehicleId.toLowerCase()
    );
    if (vehicle) {
      const logs = parkingLogs.filter(
        (log) => log.numberPlate === vehicle.numberPlate
      );
      const message = `Vehicle ${vehicle.numberPlate} has ${
        logs.length > 0
          ? logs[logs.length - 1].action === "Entry"
            ? "entered"
            : "exited"
          : "no records"
      } recently.`;
      toast.success(message);
    } else {
      toast.error("Vehicle not found.");
    }
    setVehicleId(""); // Clear the input after search
  };

  return (
    <div className="security-dashboard min-h-screen bg-[#F5F9D0]">
      <header className="flex justify-between items-center py-2 px-8 bg-[#ff9fa0] shadow-md mb-8">
        <div className="logo flex items-center">
          <img src={logo} alt="ParkWise Logo" className="h-20 w-30" />
        </div>
        <h2 className="text-4xl font-bold text-center" style={{ color: "#4A6D0A" }}>
          Security Dashboard
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

      {/* Vehicle Entry/Exit Query */}
      <section className="mb-10 px-8">
  <h3 className="text-2xl font-semibold mb-4 text-[#799529] flex items-center">
    <FaPlusCircle className="mr-2" />
    Vehicle Entry/Exit Query & Manual Override
  </h3>
  <input
    type="text"
    placeholder="Enter vehicle number"
    value={vehicleId}
    onChange={(e) => setVehicleId(e.target.value)}
    className="p-3 border border-[#92AB42] rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md"
    style={{ color: "#000000" }}
    aria-label="Vehicle Number"
  />
  <div className="space-x-4">
    <button
      className="py-3 px-6 rounded-lg bg-[#799529] text-white hover:bg-green-700 transition duration-300 shadow-md"
      onClick={handleSearchVehicle}
    >
      Search
    </button>
    <button
      className="py-3 px-6 rounded-lg bg-[#92AB42] text-white hover:bg-red-700 transition duration-300 shadow-md"
      onClick={handleManualOverride}
    >
      Override
    </button>
  </div>
</section>


      {/* Entry/Exit Logs */}
      <section className="mb-10 px-8">
        <h3 className="text-2xl font-semibold mb-4 text-[#799529]">
          Entry/Exit Logs
        </h3>
        <ul className="p-6 rounded-lg shadow-lg space-y-4 bg-[#FFDFB0]">
          {parkingLogs.length > 0 ? (
            parkingLogs.map((log, index) => (
              <li
                key={index} // Use index if you don't have unique IDs
                className="py-3 px-4 rounded-lg border border-[#92AB42] bg-[#FEA0A0] text-black transition duration-300 hover:shadow-lg"
              >
                Vehicle {log.numberPlate} - {log.action} at {log.timestamp}
              </li>
            ))
          ) : (
            <li className="py-3 px-4 text-black">No logs available.</li>
          )}
        </ul>
      </section>

      {/* Notifications 
      <section className="mb-10 px-8">
        <h3 className="text-2xl font-semibold mb-4 text-[#799529]">
          Notifications
        </h3>
        <ul className="p-6 rounded-lg shadow-lg space-y-4 bg-[#FFDFB0]">
          {currentNotifications.map((note) => (
            <li
              key={note.id}
              className="py-3 px-4 rounded-lg border border-[#92AB42] bg-[#FEA0A0] text-black transition duration-300 hover:shadow-lg"
            >
              {note.message} at {new Date(note.time).toLocaleString()}
            </li>
          ))}
        </ul>
      </section>
*/}
      {/* Manual Override */}
      {/* <section className="mb-10 px-8">
        <h3 className="text-2xl font-semibold mb-4 text-[#799529] flex items-center">
          <FaPlusCircle className="mr-2" />
          Manual Override
        </h3>
        <input
          type="text"
          placeholder="Enter vehicle number for override"
          value={overrideId}
          onChange={(e) => setOverrideId(e.target.value)}
          className="p-3 border border-[#92AB42] rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-md"
          style={{ color: "#000000" }}
          aria-label="Vehicle Number for Override"
        />
        <button
          className="py-3 px-6 rounded-lg bg-[#92AB42] text-white hover:bg-red-700 transition duration-300 shadow-md"
          onClick={handleManualOverride}
        >
          Override
        </button>
      </section> */}

      {/* Add New Resident */}
      <section className="mb-10 px-8">
        <h3 className="text-2xl font-semibold mb-4 text-[#799529]">
          Add New Resident
        </h3>
        <AddResidentForm />
      </section>

      {/* Entry/Exit */}
      <section className="mb-10 px-8">
        <h3 className="text-2xl font-semibold mb-4 text-[#799529]">
          Entry/Exit
        </h3>
        <NumberPlateRecognition addParkingLog={addParkingLog} />
      </section>
      
      <ToastContainer /> {/* Add ToastContainer for notifications */}
    </div>
  );
};

const AddResidentForm = () => {
  const [residentName, setResidentName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleAddResident = () => {
    if (!residentName || !vehicleNumber) {
      toast.error("Please fill in all fields.");
      return;
    }
    toast.success(`Resident ${residentName} with vehicle ${vehicleNumber} added successfully.`);
    setResidentName("");
    setVehicleNumber("");
    setSuccessMessage("Resident added successfully!");
  };

  return (
    <form className="p-6 rounded-lg shadow-lg space-y-4 bg-[#FFDFB0]">
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      <input
        type="text"
        placeholder="Resident Name"
        value={residentName}
        onChange={(e) => setResidentName(e.target.value)}
        className="p-3 border border-[#92AB42] rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md"
        style={{ color: "#000000" }}
        aria-label="Resident Name"
      />
      <input
        type="text"
        placeholder="Vehicle Number"
        value={vehicleNumber}
        onChange={(e) => setVehicleNumber(e.target.value)}
        className="p-3 border border-[#92AB42] rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md"
        style={{ color: "#000000" }}
        aria-label="Vehicle Number"
      />
      <button
        type="button"
        className="py-3 px-6 rounded-lg bg-[#92AB42] text-white hover:bg-green-700 transition duration-300 shadow-md"
        onClick={handleAddResident}
      >
        Add Resident
      </button>
    </form>
  );
};

export default SecurityDashboard;
