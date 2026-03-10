# ParkWise Backend — AWS Setup Guide

This guide walks you through setting up the AWS backend for ParkWise: **DynamoDB**, **Lambda**, **API Gateway**, and **Cognito**.

All services used are within the **AWS Free Tier**.

---

## Prerequisites

- An AWS account (free tier)
- Access to the [AWS Management Console](https://console.aws.amazon.com/)

---

## Step 1 — Create DynamoDB Tables

### Table 1: `parkwise-vehicles`

1. Go to **DynamoDB → Tables → Create table**
2. Table name: `parkwise-vehicles`
3. Partition key: `vehicleId` (String)
4. Leave all other settings as default (On-demand capacity is free tier friendly)
5. Click **Create table**

**Optional: Add a GSI for filtering by owner**

If you want to filter vehicles by `ownerId` in `GET /vehicles?ownerId=...`:

1. Open the `parkwise-vehicles` table → **Indexes** tab → **Create index**
2. Partition key: `ownerId` (String)
3. Index name: `ownerId-index`
4. Click **Create index**

---

### Table 2: `parkwise-logs`

1. Go to **DynamoDB → Tables → Create table**
2. Table name: `parkwise-logs`
3. Partition key: `logId` (String)
4. Leave all other settings as default
5. Click **Create table**

---

## Step 2 — Create Lambda Functions

For each Lambda function below:

1. Go to **Lambda → Functions → Create function**
2. Choose **Author from scratch**
3. Runtime: **Node.js 20.x**
4. Architecture: x86_64
5. Click **Create function**
6. In the **Code** tab, replace the default code with the contents of the corresponding file from `backend/lambdas/`
7. Click **Deploy**

### IAM Permissions

Each Lambda function needs permission to access DynamoDB. After creating each function:

1. Go to the function → **Configuration → Permissions**
2. Click the **Execution role** link to open IAM
3. Click **Add permissions → Attach policies**
4. Search for and attach **AmazonDynamoDBFullAccess** (or create a custom policy for least privilege)

### Functions to Create

| Function name | File | Method | Path |
|---|---|---|---|
| `parkwise-getVehicles` | `backend/lambdas/getVehicles.js` | GET | /vehicles |
| `parkwise-addVehicle` | `backend/lambdas/addVehicle.js` | POST | /vehicles |
| `parkwise-getLogs` | `backend/lambdas/getLogs.js` | GET | /logs |
| `parkwise-addLog` | `backend/lambdas/addLog.js` | POST | /logs |
| `parkwise-getOccupancy` | `backend/lambdas/getOccupancy.js` | GET | /occupancy |

> **Note:** The Lambda functions use ES module syntax (`import`/`export`). Make sure your Lambda function's `package.json` (if present) has `"type": "module"`, or rename the files to `.mjs`.

---

## Step 3 — Set Up API Gateway

1. Go to **API Gateway → Create API**
2. Choose **REST API** (not private) → **Build**
3. API name: `parkwise-api`
4. Click **Create API**

### Create Resources and Methods

For each route below, create a resource and method:

#### `/vehicles` resource

1. Click **Actions → Create Resource**
2. Resource name: `vehicles`, Resource path: `/vehicles`
3. ✅ Enable API Gateway CORS
4. Click **Create Resource**

5. Select `/vehicles` → **Actions → Create Method → GET**
   - Integration type: Lambda Function
   - Lambda function: `parkwise-getVehicles`
   - Click **Save**

6. Select `/vehicles` → **Actions → Create Method → POST**
   - Integration type: Lambda Function
   - Lambda function: `parkwise-addVehicle`
   - Click **Save**

#### `/logs` resource

1. Click **Actions → Create Resource**
2. Resource name: `logs`, Resource path: `/logs`
3. ✅ Enable API Gateway CORS
4. Click **Create Resource**

5. Select `/logs` → **Actions → Create Method → GET**
   - Lambda function: `parkwise-getLogs`

6. Select `/logs` → **Actions → Create Method → POST**
   - Lambda function: `parkwise-addLog`

#### `/occupancy` resource

1. Click **Actions → Create Resource**
2. Resource name: `occupancy`, Resource path: `/occupancy`
3. ✅ Enable API Gateway CORS
4. Click **Create Resource**

5. Select `/occupancy` → **Actions → Create Method → GET**
   - Lambda function: `parkwise-getOccupancy`

### Enable CORS on All Resources

For each resource (`/vehicles`, `/logs`, `/occupancy`):

1. Select the resource → **Actions → Enable CORS**
2. Leave defaults (Access-Control-Allow-Origin: `*`)
3. Click **Enable CORS and replace existing CORS headers**

### Deploy the API

1. **Actions → Deploy API**
2. Deployment stage: **New Stage**, Stage name: `prod`
3. Click **Deploy**
4. Copy the **Invoke URL** — it looks like:
   `https://XXXXXXXXXX.execute-api.YOUR_REGION.amazonaws.com/prod`

---

## Step 4 — Set Up Cognito User Pool

### Create User Pool

1. Go to **Cognito → User Pools → Create user pool**
2. Sign-in option: **Username**
3. Password policy: choose a policy (default is fine)
4. No MFA required (optional for development)
5. User pool name: `parkwise-users`
6. Click through to **App clients** → **Add an app client**
   - App client name: `parkwise-frontend`
   - Uncheck **Generate client secret** (not needed for browser apps)
7. Click **Create user pool**

### Note Your IDs

After creation, from the User Pool overview page:
- **User Pool ID** (e.g., `us-east-1_AbCdEfGhI`)
- **App Client ID** (from the **App clients** tab)
- **Region** (e.g., `us-east-1`)

### Create User Groups

1. Open your user pool → **Groups** tab → **Create group**
2. Create group: `residents`
3. Create another group: `security`

### Create Test Users

1. Open your user pool → **Users** tab → **Create user**
2. Create a resident user, then assign them to the `residents` group
3. Create a security user, then assign them to the `security` group

---

## Step 5 — Fill in Frontend Configuration

### `frontend/src/aws-config.js`

Open `frontend/src/aws-config.js` and replace the placeholder values:

```js
const awsConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_AbCdEfGhI',      // ← Your User Pool ID
      userPoolClientId: 'XXXXXXXXXXXXXXXXXXXX',  // ← Your App Client ID
      region: 'us-east-1',                       // ← Your AWS Region
    },
  },
};
```

### `frontend/.env`

Create `frontend/.env` (copy from `frontend/.env.example`):

```bash
cp frontend/.env.example frontend/.env
```

Then edit `frontend/.env`:

```
VITE_API_BASE_URL=https://XXXXXXXXXX.execute-api.us-east-1.amazonaws.com/prod
```

Replace with your actual API Gateway Invoke URL from Step 3.

---

## Architecture Overview

```
React Frontend (Vite/Vercel)
        │
        ├── AWS Cognito (Authentication)
        │     └── User Pools with residents/security groups
        │
        └── API Gateway (REST API)
              │
              ├── GET  /vehicles  → Lambda (getVehicles)  → DynamoDB parkwise-vehicles
              ├── POST /vehicles  → Lambda (addVehicle)   → DynamoDB parkwise-vehicles
              ├── GET  /logs      → Lambda (getLogs)      → DynamoDB parkwise-logs
              ├── POST /logs      → Lambda (addLog)       → DynamoDB parkwise-logs
              └── GET  /occupancy → Lambda (getOccupancy) → DynamoDB parkwise-logs
```

---

## Cost Estimate (Free Tier)

| Service | Free Tier | Expected Usage |
|---|---|---|
| Cognito | 50,000 MAU/month | ~10 users |
| Lambda | 1M requests/month | ~1,000 requests/month |
| API Gateway | 1M calls/month (12 months) | ~1,000 calls/month |
| DynamoDB | 25 GB storage + 25 RCU/WCU | < 1 MB |

**Total cost: $0** within the free tier limits.
