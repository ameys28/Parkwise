import React, { useState, useEffect } from 'react';

const SecurityDashboard = () => {
  const [entryLogs, setEntryLogs] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch entry/exit logs and notifications from your backend API
    fetch('/api/security/entry-logs')
      .then(res => res.json())
      .then(data => setEntryLogs(data));

    fetch('/api/security/notifications')
      .then(res => res.json())
      .then(data => setNotifications(data));
  }, []);

  const handleManualOverride = (vehicleId) => {
    // Handle manual override
    fetch(`/api/security/manual-override/${vehicleId}`, { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert('Override successful');
        } else {
          alert('Failed to override');
        }
      });
  };

  return (
    <div className="security-dashboard p-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center">Security Dashboard</h2>

      {/* Vehicle Entry/Exit Query */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Vehicle Entry/Exit Query</h3>
        <input 
          type="text" 
          placeholder="Enter vehicle number" 
          className="p-2 border rounded w-full mb-2" 
        />
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Search
        </button>
      </section>

      {/* Entry/Exit Logs */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Entry/Exit Logs</h3>
        <ul className="bg-white rounded shadow p-4">
          {entryLogs.map(log => (
            <li key={log.id} className="py-2 border-b">
              Vehicle {log.vehicleNumber} - {log.entry ? 'Entered' : 'Exited'} at {log.time}
            </li>
          ))}
        </ul>
      </section>

      {/* Notifications */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Notifications</h3>
        <ul className="bg-yellow-100 rounded shadow p-4">
          {notifications.map(note => (
            <li key={note.id} className="py-2 border-b">
              {note.message}
            </li>
          ))}
        </ul>
      </section>

      {/* Manual Override */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Manual Override</h3>
        <input 
          type="text" 
          placeholder="Enter vehicle number for override" 
          className="p-2 border rounded w-full mb-2" 
        />
        <button 
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          onClick={() => handleManualOverride("vehicleId")} // Placeholder vehicle ID
        >
          Override
        </button>
      </section>

      {/* Profile Settings */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Profile Settings</h3>
        {/* Profile settings form */}
      </section>

      {/* Add New Resident */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Add New Resident</h3>
        <form className="bg-white p-4 rounded shadow">
          <input 
            type="text" 
            placeholder="Resident Name" 
            className="p-2 border rounded w-full mb-2"
          />
          <input 
            type="text" 
            placeholder="Vehicle Number" 
            className="p-2 border rounded w-full mb-2"
          />
          <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
            Add Resident
          </button>
        </form>
      </section>
    </div>
  );
};

export default SecurityDashboard;
