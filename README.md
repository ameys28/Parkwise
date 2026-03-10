# 🚗 ParkWise – Smart Parking System

> A smart parking web application designed for efficient management of parking in residential buildings. This project includes separate login interfaces for residents and security, a clean dashboard UI, and real-time occupancy tracking powered by a serverless AWS backend.

🔗 **Live Demo**: [https://parkwise-three.vercel.app](https://parkwise-three.vercel.app)

---

## ⚙️ Tech Stack

### Frontend
- ⚛️ React.js (Vite)
- 🎨 Tailwind CSS
- 🔄 React Router DOM
- 🔐 AWS Amplify (Cognito authentication)

### Backend (AWS — Serverless)
- 🔐 **AWS Cognito** — secure authentication with role-based access (residents / security)
- ⚡ **AWS Lambda** — serverless functions for vehicles, logs, and occupancy
- 🌐 **AWS API Gateway** — REST API exposing Lambda functions
- 🗄️ **AWS DynamoDB** — persistent storage for vehicles and parking logs

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Set Up AWS Resources

Follow the step-by-step guide in **[backend/README.md](./backend/README.md)** to:
- Create DynamoDB tables (`parkwise-vehicles`, `parkwise-logs`)
- Create Lambda functions
- Set up API Gateway
- Create a Cognito User Pool with `residents` and `security` groups

### 3. Configure Environment Variables

```bash
cd frontend
cp .env.example .env
```

Edit `frontend/.env`:
```
VITE_API_BASE_URL=https://YOUR_API_GATEWAY_ID.execute-api.YOUR_REGION.amazonaws.com/prod
```

Edit `frontend/src/aws-config.js` and fill in your Cognito User Pool ID, App Client ID, and region.

### 4. Run the App

```bash
cd frontend
npm run dev
```

---

## 📁 Project Structure

```
/
├── README.md
├── backend/
│   ├── README.md                    ← AWS setup guide
│   └── lambdas/
│       ├── getVehicles.js
│       ├── addVehicle.js
│       ├── getLogs.js
│       ├── addLog.js
│       └── getOccupancy.js
└── frontend/
    ├── .env.example                 ← Environment variable template
    ├── src/
    │   ├── aws-config.js            ← Amplify/Cognito configuration
    │   ├── services/
    │   │   └── api.js               ← Centralized API service
    │   ├── context/
    │   │   └── AuthContext.jsx      ← Cognito-based authentication
    │   └── pages/
    │       ├── ResidentDashboard.jsx
    │       └── SecurityDashboard.jsx
    └── ...
```

---

## ☁️ AWS Free Tier

All AWS services used in ParkWise are within the **AWS Free Tier**:

| Service | Free Tier |
|---|---|
| Cognito | 50,000 MAU/month (always free) |
| Lambda | 1M requests/month (always free) |
| API Gateway | 1M calls/month (first 12 months) |
| DynamoDB | 25 GB storage (always free) |

