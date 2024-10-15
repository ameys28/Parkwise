import React, { useState, useEffect } from 'react';

const ResidentDashboard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [parkingLogs, setParkingLogs] = useState([]);
  const [occupancy, setOccupancy] = useState(0);

  useEffect(() => {
    fetch('/api/resident/vehicles')
      .then(res => res.json())
      .then(data => setVehicles(data));

    fetch('/api/resident/parking-logs')
      .then(res => res.json())
      .then(data => setParkingLogs(data));

    fetch('/api/resident/occupancy')
      .then(res => res.json())
      .then(data => setOccupancy(data));
  }, []);

  const handleRegisterVehicle = (vehicleNumber) => {
    fetch('/api/resident/register-vehicle', {
      method: 'POST',
      body: JSON.stringify({ vehicleNumber }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert('Vehicle registered');
          setVehicles([...vehicles, { vehicleNumber }]);
        } else {
          alert('Failed to register vehicle');
        }
      });
  };

  return (
    <div className="resident-dashboard p-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center">Resident Dashboard</h2>

      {/* Registered Vehicles */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Registered Vehicles</h3>
        <ul className="bg-white rounded shadow p-4">
          {vehicles.map(vehicle => (
            <li key={vehicle.vehicleNumber} className="py-2 border-b">
              Vehicle: {vehicle.vehicleNumber}
            </li>
          ))}
        </ul>
      </section>

      {/* Current Parking Slot Occupancy */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Current Parking Slot Occupancy</h3>
        <p className="bg-white rounded shadow p-4">Occupancy: {occupancy} spots filled</p>
      </section>

      {/* Register Vehicle */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Register Vehicle</h3>
        <input 
          type="text" 
          placeholder="Enter vehicle number" 
          className="p-2 border rounded w-full mb-2" 
        />
        <button 
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={(e) => handleRegisterVehicle(e.target.value)}
        >
          Register Vehicle
        </button>
      </section>

      {/* Guest Parking Reservation */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Guest Parking Reservation</h3>
        <input 
          type="text" 
          placeholder="Enter guest vehicle number" 
          className="p-2 border rounded w-full mb-2"
        />
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Reserve Spot
        </button>
      </section>

      {/* Parking Logs */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Parking Logs</h3>
        <ul className="bg-white rounded shadow p-4">
          {parkingLogs.map(log => (
            <li key={log.id} className="py-2 border-b">
              Vehicle {log.vehicleNumber} - Parked at {log.time}
            </li>
          ))}
        </ul>
      </section>

      {/* Profile Settings */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Profile Settings</h3>
        {/* Profile settings form */}
      </section>
    </div>
  );
};

export default ResidentDashboard;
