import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const statusColor = {
  operational: "bg-green-100 text-green-800",
  degraded: "bg-yellow-100 text-yellow-800",
  down: "bg-red-100 text-red-800",
};

const ServiceStatusList = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/services/`)
      .then((res) => setServices(res.data))
      .catch((error) => {
        console.error("Failed to fetch services:", error);
      });
  }, []);

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Service Status</h2>
      <ul className="space-y-4">
        {services.map((service) => (
          <li
            key={service.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow transition"
          >
            <span className="text-lg font-medium text-gray-700">{service.name}</span>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor[service.status]}`}>
              {service.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceStatusList;
