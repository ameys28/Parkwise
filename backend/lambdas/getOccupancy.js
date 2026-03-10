// backend/lambdas/getOccupancy.js
// Handler for GET /occupancy
// Scans the parkwise-logs table and counts vehicles whose last action was "Entry".
// Returns { occupancy: N, totalSpots: 20 }.

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const TOTAL_SPOTS = parseInt(process.env.TOTAL_SPOTS || '20', 10);

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  'Access-Control-Allow-Methods': 'GET,OPTIONS',
  'Content-Type': 'application/json',
};

export const handler = async (event) => {
  try {
    const result = await docClient.send(new ScanCommand({
      TableName: 'parkwise-logs',
    }));

    const logs = result.Items || [];

    // Build a map of numberPlate -> most recent log
    const latestLogByVehicle = {};
    for (const log of logs) {
      const existing = latestLogByVehicle[log.numberPlate];
      if (!existing || new Date(log.timestamp) > new Date(existing.timestamp)) {
        latestLogByVehicle[log.numberPlate] = log;
      }
    }

    // Count vehicles whose last action is "Entry"
    const occupancy = Object.values(latestLogByVehicle).filter(
      (log) => log.action === 'Entry'
    ).length;

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ occupancy, totalSpots: TOTAL_SPOTS }),
    };
  } catch (err) {
    console.error('getOccupancy error:', err);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Failed to fetch occupancy', details: err.message }),
    };
  }
};
