// src/pages/SecurityDashboard.js

import React, { useState } from "react";
import { entryLogs, notifications, vehicles } from "../data/staticData";
import { FaSearch, FaPlusCircle } from "react-icons/fa";
import NumberPlateRecognition from "./NumberPlateRecognition";

const SecurityDashboard = () => {
  const [vehicleId, setVehicleId] = useState("");
  const [overrideId, setOverrideId] = useState("");
  const [currentEntryLogs, setCurrentEntryLogs] = useState(entryLogs);
  const [currentNotifications, setCurrentNotifications] =
    useState(notifications);

  const [logs, setLogs] = useState([]);

  // Function to add a new entry to the logs
  const addParkingLog = (numberPlate) => {
    const newLog = {
      id: logs.length + 1,
      numberPlate,
      timestamp: new Date().toLocaleString(),
    };
    const updatedLogs = [...logs, newLog];
    setLogs(updatedLogs);
    console.log("Updated Logs:", updatedLogs); // Debugging log
  };

  const handleManualOverride = () => {
    const vehicle = vehicles.find(
      (v) => v.numberPlate.toLowerCase() === overrideId.toLowerCase()
    );
    if (vehicle) {
      alert(`Manual override successful for vehicle: ${vehicle.numberPlate}`);
      setOverrideId("");
    } else {
      alert("Vehicle not found for override.");
    }
  };

  const handleSearchVehicle = () => {
    const vehicle = vehicles.find(
      (v) => v.numberPlate.toLowerCase() === vehicleId.toLowerCase()
    );
    if (vehicle) {
      const logs = currentEntryLogs.filter(
        (log) => log.vehicleId === vehicle.id
      );
      alert(
        `Vehicle ${vehicle.numberPlate} has ${
          logs.length > 0
            ? logs[logs.length - 1].entry
              ? "entered"
              : "exited"
            : "no records"
        } recently.`
      );
    } else {
      alert("Vehicle not found.");
    }
    setVehicleId("");
  };

  return (
    <div className="security-dashboard p-8 min-h-screen bg-[#F5F9D0]">
      <h2 className="text-4xl font-bold mb-10 text-center text-[#799529]">
        Security Dashboard
      </h2>

      {/* Vehicle Entry/Exit Query */}
      <section className="mb-10">
        <h3 className="text-2xl font-semibold mb-4 text-[#799529] flex items-center">
          <FaSearch className="mr-2" />
          Vehicle Entry/Exit Query
        </h3>
        <input
          type="text"
          placeholder="Enter vehicle number"
          value={vehicleId}
          onChange={(e) => setVehicleId(e.target.value)}
          className="p-3 border border-[#799529] rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md"
          style={{ color: "#000000" }}
        />
        <button
          className="py-3 px-6 rounded-lg bg-[#799529] text-white hover:bg-blue-700 transition duration-300 shadow-md"
          onClick={handleSearchVehicle}
        >
          Search
        </button>
      </section>

      {/* Entry/Exit Logs */}
      <section className="mb-10">
        <h3 className="text-2xl font-semibold mb-4 text-[#799529]">
          Entry/Exit Logs
        </h3>
        // In Entry/Exit Logs section
        <ul className="p-6 rounded-lg shadow-lg space-y-4 bg-[#FFDFB0]">
          {logs.map((log) => (
            <li
              key={log.id}
              className="py-3 px-4 rounded-lg border border-[#92AB42] bg-[#FEA0A0] text-black transition duration-300 hover:shadow-lg"
            >
              Vehicle {log.numberPlate} - Entered at {log.timestamp}
            </li>
          ))}
        </ul>
      </section>

      {/* Notifications */}
      <section className="mb-10">
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

      {/* Manual Override */}
      <section className="mb-10">
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
        />
        <button
          className="py-3 px-6 rounded-lg bg-[#92AB42] text-white hover:bg-red-700 transition duration-300 shadow-md"
          onClick={handleManualOverride}
        >
          Override
        </button>
      </section>

      {/* Add New Resident */}
      <section className="mb-10">
        <h3 className="text-2xl font-semibold mb-4 text-[#799529]">
          Add New Resident
        </h3>
        <AddResidentForm />
      </section>
      <section className="mb-10">
        <h3 className="text-2xl font-semibold mb-4 text-[#799529]">
          Entry/Exit
        </h3>
        <NumberPlateRecognition addParkingLog={addParkingLog} />
      </section>
    </div>
  );
};

const AddResidentForm = () => {
  const [residentName, setResidentName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleAddResident = () => {
    if (!residentName || !vehicleNumber) {
      alert("Please fill in all fields.");
      return;
    }
    alert(
      `Resident ${residentName} with vehicle ${vehicleNumber} added successfully.`
    );
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
      />
      <input
        type="text"
        placeholder="Vehicle Number"
        value={vehicleNumber}
        onChange={(e) => setVehicleNumber(e.target.value)}
        className="p-3 border border-[#92AB42] rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md"
        style={{ color: "#000000" }}
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
