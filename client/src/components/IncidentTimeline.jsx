import React, { useEffect, useState } from "react";
import axios from "axios";

const statusStyles = {
  resolved: "bg-green-100 text-green-700",
  investigating: "bg-yellow-100 text-yellow-700",
  identified: "bg-orange-100 text-orange-700",
  monitoring: "bg-blue-100 text-blue-700",
  ongoing: "bg-red-100 text-red-700",
};

const IncidentTimeline = () => {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8001/incidents/").then((res) => {
      setIncidents(res.data);
    });
  }, []);

  return (
    <div className="mt-10 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        🚨 Recent Incidents
      </h2>

      {incidents.length === 0 ? (
        <p className="text-center text-gray-500">No incidents reported.</p>
      ) : (
        <div className="space-y-6">
          {incidents
            .slice()
            .reverse()
            .map((incident) => (
              <div
                key={incident.id}
                className="relative border-l-4 border-blue-500 bg-white rounded-lg p-6 shadow transition hover:shadow-md"
              >
                <div className="absolute -left-2 top-6 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow"></div>

                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {incident.title}
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(incident.created_at).toLocaleString()}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm mb-3">
                  <span
                    className={`px-3 py-1 rounded-full font-medium ${statusStyles[incident.status] || "bg-gray-100 text-gray-700"}`}
                  >
                    {incident.status}
                  </span>
                  <span className="text-gray-600">
                    <strong>Type:</strong> {incident.type}
                  </span>
                </div>

                <p className="text-gray-700 whitespace-pre-line">
                  {incident.description}
                </p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default IncidentTimeline;
