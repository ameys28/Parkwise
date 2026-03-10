// backend/lambdas/addLog.js
// Handler for POST /logs
// Accepts { numberPlate, action } in the request body (action is "Entry" or "Exit").
// Generates a UUID for logId, sets timestamp, and puts the item into parkwise-logs table.

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
    const { numberPlate, action } = body;

    if (!numberPlate || !action) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: 'numberPlate and action are required' }),
      };
    }

    if (action !== 'Entry' && action !== 'Exit') {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: 'action must be "Entry" or "Exit"' }),
      };
    }

    const logId = randomUUID();
    const item = {
      logId,
      numberPlate,
      action,
      timestamp: new Date().toISOString(),
    };

    await docClient.send(new PutCommand({
      TableName: 'parkwise-logs',
      Item: item,
    }));

    return {
      statusCode: 201,
      headers: CORS_HEADERS,
      body: JSON.stringify(item),
    };
  } catch (err) {
    console.error('addLog error:', err);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Failed to add log', details: err.message }),
    };
  }
};
