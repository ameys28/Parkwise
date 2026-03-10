// backend/lambdas/addVehicle.js
// Handler for POST /vehicles
// Accepts { numberPlate, ownerId, guest } in the request body.
// Puts a new item into the DynamoDB parkwise-vehicles table.

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { randomUUID } from 'crypto';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  'Access-Control-Allow-Methods': 'POST,OPTIONS',
  'Content-Type': 'application/json',
};

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}');
    const { numberPlate, ownerId, guest } = body;

    if (!numberPlate) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: 'numberPlate is required' }),
      };
    }

    const vehicleId = randomUUID();
    const item = {
      vehicleId,
      numberPlate,
      ownerId: ownerId || null,
      guest: guest === true,
      createdAt: new Date().toISOString(),
    };

    await docClient.send(new PutCommand({
      TableName: 'parkwise-vehicles',
      Item: item,
    }));

    return {
      statusCode: 201,
      headers: CORS_HEADERS,
      body: JSON.stringify(item),
    };
  } catch (err) {
    console.error('addVehicle error:', err);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Failed to add vehicle', details: err.message }),
    };
  }
};
