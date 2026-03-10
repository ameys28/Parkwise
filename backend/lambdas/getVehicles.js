// backend/lambdas/getVehicles.js
// Handler for GET /vehicles
// Queries DynamoDB parkwise-vehicles table.
// Optionally filters by ownerId query parameter.

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';

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
      // Query by ownerId using a GSI (Global Secondary Index) on ownerId
      // TODO: Create a GSI named "ownerId-index" on the parkwise-vehicles table with ownerId as the partition key
      result = await docClient.send(new QueryCommand({
        TableName: 'parkwise-vehicles',
        IndexName: 'ownerId-index',
        KeyConditionExpression: 'ownerId = :ownerId',
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
