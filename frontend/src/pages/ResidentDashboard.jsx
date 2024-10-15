// src/pages/ResidentDashboard.js

import React, { useState } from 'react';
import { vehicles, entryLogs } from '../data/staticData';

const ResidentDashboard = () => {
  const [vehiclesList, setVehiclesList] = useState(vehicles);
  const [parkingLogsList, setParkingLogsList] = useState(entryLogs);
  const [occupancy, setOccupancy] = useState(
    entryLogs.filter((log) => !log.exitTime).length
  );
  const [newVehicleNumber, setNewVehicleNumber] = useState('');
  const [guestVehicleNumber, setGuestVehicleNumber] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegisterVehicle = () => {
    if (!newVehicleNumber) {
      alert('Please enter a vehicle number.');
      return;
    }
    const newVehicle = {
      id: vehiclesList.length + 1,
      ownerId: 1,
      numberPlate: newVehicleNumber,
      guest: false,
    };
    setVehiclesList([...vehiclesList, newVehicle]);
    setNewVehicleNumber('');
    setSuccessMessage('Vehicle registered successfully!');
  };

  const handleReserveGuestParking = () => {
    if (!guestVehicleNumber) {
      alert('Please enter a guest vehicle number.');
      return;
    }
    const guestVehicle = {
      id: vehiclesList.length + 1,
      ownerId: null,
      numberPlate: guestVehicleNumber,
      guest: true,
    };
    setVehiclesList([...vehiclesList, guestVehicle]);
    setGuestVehicleNumber('');
    setSuccessMessage('Guest parking reserved successfully!');
  };

  return (
    <div className="resident-dashboard min-h-screen p-8" style={{ backgroundColor: '#F5F9D0' }}>
      <h2 className="text-4xl font-bold mb-10 text-center" style={{ color: '#4A6D0A' }}>
        Resident Dashboard
      </h2>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 p-4 text-center rounded-lg bg-[#FFDFB0] text-[#C03A3A]">
          {successMessage}
        </div>
      )}

      {/* Section: Registered Vehicles */}
      <section className="mb-10">
        <h3 className="text-2xl font-semibold mb-6" style={{ color: '#4A6D0A' }}>
          Registered Vehicles
        </h3>
        <ul className="p-6 rounded-lg shadow space-y-4" style={{ backgroundColor: '#FFDFB0' }}>
          {vehiclesList.map((vehicle) => (
            <li
              key={vehicle.id}
              className="py-3 px-4 rounded-lg border border-[#D16C6C] transition hover:bg-[#FF9FA0]"
              style={{ color: '#4A6D0A' }}
            >
              {vehicle.numberPlate} {vehicle.guest ? '(Guest)' : ''}
            </li>
          ))}
        </ul>
      </section>

      {/* Section: Parking Logs */}
      <section className="mb-10">
        <h3 className="text-2xl font-semibold mb-6" style={{ color: '#4A6D0A' }}>
          Parking Logs
        </h3>
        <ul className="p-6 rounded-lg shadow space-y-4" style={{ backgroundColor: '#FFDFB0' }}>
          {parkingLogsList.map((log) => {
            const vehicle = vehiclesList.find((v) => v.id === log.vehicleId);
            return (
              <li
                key={log.id}
                className="py-3 px-4 rounded-lg border border-[#D16C6C] transition hover:bg-[#FF9FA0]"
                style={{ color: '#4A6D0A' }}
              >
                Vehicle {vehicle ? vehicle.numberPlate : 'Unknown'} -{' '}
                {log.exitTime ? 'Exited' : 'Entered'} at {new Date(log.entryTime).toLocaleString()}
              </li>
            );
          })}
        </ul>
      </section>

      {/* Section: Current Occupancy */}
      <section className="mb-10">
        <h3 className="text-2xl font-semibold mb-6" style={{ color: '#4A6D0A' }}>
          Current Occupancy
        </h3>
        <div className="p-6 rounded-lg shadow text-center" style={{ backgroundColor: '#FFDFB0', color: '#4A6D0A' }}>
          <p className="text-xl">Current Occupancy: {occupancy} spot(s) filled</p>
        </div>
      </section>

      {/* Section: Register New Vehicle */}
      <section className="mb-10">
        <h3 className="text-2xl font-semibold mb-6" style={{ color: '#4A6D0A' }}>
          Register New Vehicle
        </h3>
        <input
          type="text"
          placeholder="Enter vehicle number"
          value={newVehicleNumber}
          onChange={(e) => setNewVehicleNumber(e.target.value)}
          className="p-3 border rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-[#4A6D0A]"
          style={{ borderColor: '#D16C6C', color: '#4A6D0A' }}
        />
        <button
          className="py-3 px-6 rounded-lg bg-[#4A6D0A] hover:bg-[#F5F9D0] transition text-white"
          onClick={handleRegisterVehicle}
        >
          Register Vehicle
        </button>
      </section>

      {/* Section: Reserve Guest Parking */}
      <section className="mb-10">
        <h3 className="text-2xl font-semibold mb-6" style={{ color: '#4A6D0A' }}>
          Reserve Guest Parking
        </h3>
        <input
          type="text"
          placeholder="Enter guest vehicle number"
          value={guestVehicleNumber}
          onChange={(e) => setGuestVehicleNumber(e.target.value)}
          className="p-3 border rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-[#FF9FA0]"
          style={{ borderColor: '#D16C6C', color: '#4A6D0A' }}
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
