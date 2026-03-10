// frontend/src/services/api.js
// Centralized API service for ParkWise backend (AWS API Gateway + Lambda + DynamoDB)

// TODO: Set VITE_API_BASE_URL in your .env file (see .env.example)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  console.warn(
    '[ParkWise] VITE_API_BASE_URL is not set. ' +
    'API calls will fail. Copy frontend/.env.example to frontend/.env and fill in your API Gateway URL.'
  );
}

/**
 * Helper that performs a fetch and throws on non-2xx responses.
 */
async function apiFetch(path, options = {}) {
  if (!API_BASE_URL) {
    throw new Error('VITE_API_BASE_URL is not configured. See frontend/.env.example.');
  }
  const url = `${API_BASE_URL}${path}`;
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`API error ${response.status}: ${text}`);
  }
  return response.json();
}

/**
 * GET /vehicles
 * Returns all vehicles. Optionally filtered by ownerId query param.
 */
export const getVehicles = async (ownerId) => {
  try {
    const query = ownerId ? `?ownerId=${encodeURIComponent(ownerId)}` : '';
    return await apiFetch(`/vehicles${query}`);
  } catch (err) {
    console.warn('getVehicles failed, returning empty array:', err.message);
    return [];
  }
};

/**
 * POST /vehicles
 * Adds a new vehicle. Accepts { numberPlate, ownerId, guest }.
 */
export const addVehicle = async (vehicle) => {
  return apiFetch('/vehicles', {
    method: 'POST',
    body: JSON.stringify(vehicle),
  });
};

/**
 * GET /logs
 * Returns all parking logs sorted by timestamp descending.
 */
export const getLogs = async () => {
  try {
    return await apiFetch('/logs');
  } catch (err) {
    console.warn('getLogs failed, returning empty array:', err.message);
    return [];
  }
};

/**
 * POST /logs
 * Adds a new parking log. Accepts { numberPlate, action } where action is "Entry" or "Exit".
 */
export const addLog = async (log) => {
  return apiFetch('/logs', {
    method: 'POST',
    body: JSON.stringify(log),
  });
};

/**
 * GET /occupancy
 * Returns current parking occupancy: { occupancy: N, totalSpots: 20 }.
 */
export const getOccupancy = async () => {
  try {
    return await apiFetch('/occupancy');
  } catch (err) {
    console.warn('getOccupancy failed, returning default:', err.message);
    return { occupancy: 0, totalSpots: 20 };
  }
};
