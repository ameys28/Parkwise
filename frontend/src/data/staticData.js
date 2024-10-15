// src/data/staticData.js

export const users = [
  {
    id: 1,
    username: 'amey',
    password: '1234',
    role: 'resident',
  },
  {
    id: 2,
    username: 'dishan',
    password: '1234',
    role: 'security',
  },
  // Add more users as needed
];

export const vehicles = [
  {
    id: 1,
    ownerId: 1, // Reference to user ID
    numberPlate: 'ABC123',
    guest: false,
  },
  {
    id: 2,
    ownerId: 1,
    numberPlate: 'XYZ789',
    guest: true,
  }
];

export const entryLogs = [
  {
    id: 1,
    vehicleId: 1,
    entryTime: '2024-04-01T08:30:00',
    exitTime: '2024-04-01T17:00:00',
  },
  {
    id: 2,
    vehicleId: 2,
    entryTime: '2024-04-02T09:00:00',
    exitTime: null, // Currently inside
  },
  // Add more logs as needed
];

export const notifications = [
  {
    id: 1,
    message: 'Guest vehicle XYZ789 has entered the parking.',
    time: '2024-04-02T09:05:00',
  },
  {
    id: 2,
    message: 'Resident vehicle ABC123 has exited the parking.',
    time: '2024-04-01T17:00:00',
  },
  // Add more notifications as needed
];
