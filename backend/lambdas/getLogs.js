// backend/lambdas/getLogs.js
// Handler for GET /logs
// Scans the DynamoDB parkwise-logs table and returns all logs sorted by timestamp descending.

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

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

    // Sort logs by timestamp descending (most recent first)
    const sorted = (result.Items || []).sort((a, b) => {
      return new Date(b.timestamp) - new Date(a.timestamp);
    });

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify(sorted),
    };
  } catch (err) {
    console.error('getLogs error:', err);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Failed to fetch logs', details: err.message }),
    };
  }
};
