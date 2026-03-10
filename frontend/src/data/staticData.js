// src/data/staticData.js

// NOTE: The `users` array has been removed.
// Authentication is now handled by AWS Cognito via aws-amplify.

// NOTE: vehicles and entryLogs are now fetched from DynamoDB via AWS API Gateway.
// These empty arrays serve as the initial state before data is loaded from the backend.
export const vehicles = [];

export const entryLogs = [];

export const notifications = [
  {
    id: 1,
    message: "Guest vehicle XYZ789 has entered the parking.",
    time: "2024-04-02T09:05:00",
  },
  {
    id: 2,
    message: "Resident vehicle ABC123 has exited the parking.",
    time: "2024-04-01T17:00:00",
  },
];
