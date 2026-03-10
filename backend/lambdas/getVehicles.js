// backend/lambdas/getVehicles.js
// Handler for GET /vehicles
// Queries DynamoDB parkwise-vehicles table.
// Optionally filters by ownerId query parameter.

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
    const ownerId = event.queryStringParameters?.ownerId;

    let result;

    if (ownerId) {
      // Filter by ownerId using Scan + FilterExpression (no GSI required)
      result = await docClient.send(new ScanCommand({
        TableName: 'parkwise-vehicles',
        FilterExpression: 'ownerId = :ownerId',
        ExpressionAttributeValues: { ':ownerId': ownerId },
      }));
    } else {
      result = await docClient.send(new ScanCommand({
        TableName: 'parkwise-vehicles',
      }));
    }

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify(result.Items || []),
    };
  } catch (err) {
    console.error('getVehicles error:', err);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Failed to fetch vehicles', details: err.message }),
    };
  }
};
