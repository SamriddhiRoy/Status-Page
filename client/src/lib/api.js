// src/lib/api.js

const API_URL = "http://localhost:8001";

export const fetchIncidents = async () => {
  const res = await fetch(`${API_URL}/incidents`);
  return res.json();
};

export const createIncident = async (data) => {
  const res = await fetch(`${API_URL}/incidents`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};
