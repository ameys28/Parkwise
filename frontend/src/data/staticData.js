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
  {
    id: 3,
    username: 'rohit',
    password: 'abcd',
    role: 'resident',
  },
  {
    id: 4,
    username: 'sara',
    password: 'abcd',
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
  },
  {
    id: 3,
    ownerId: 3,
    numberPlate: 'LMN456',
    guest: false,
  },
  {
    id: 4,
    ownerId: 4,
    numberPlate: 'PQR321',
    guest: true,
  },
  // Add more vehicles as needed
];

export const entryLogs = [
  {
    id: 1,
    vehicleId: "ABC123",
    numberPlate: 'PQR321',
    action: 'Entry',
    timestamp: '10/28/2024, 10:29:03 PM',
  },
  {
    id: 2,
    vehicleId: "XYZ789",
    numberPlate: 'PQR321',
    action: 'Entry',
    timestamp: '10/28/2024, 07:48:40 PM',
  },
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
  {
    id: 3,
    message: 'Resident vehicle LMN456 has entered the parking.',
    time: '2024-04-02T10:05:00',
  },
  {
    id: 4,
    message: 'Guest vehicle PQR321 has exited the parking.',
    time: '2024-04-03T17:30:00',
  },
  // Add more notifications as needed
];
