import React from 'react';
import { Doughnut } from 'react-chartjs-2'; // Changed from Line to Doughnut
import {
  Chart as ChartJS,
  ArcElement, // Needed for Doughnut chart
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registering the necessary parts of Chart.js for a Doughnut chart
ChartJS.register(
  ArcElement, // Register ArcElement for Doughnut
  Tooltip,
  Legend,
  Title
);

const UptimeGraph = ({ serviceData }) => {
  // Calculate current overall operational percentage based on direct service objects
  const totalServices = serviceData ? serviceData.length : 0;
  // Filter for services explicitly 'Operational'
  const operationalServices = serviceData ? serviceData.filter(s => s.status === 'Operational').length : 0;
  
  const currentUptimePercentage = totalServices > 0 ? (operationalServices / totalServices) * 100 : 0;
  const downtimePercentage = 100 - currentUptimePercentage;

  // Data for the Doughnut chart
  const data = {
    labels: ['Operational', 'Non-Operational'], // Labels for the segments
    datasets: [
      {
        data: [currentUptimePercentage, downtimePercentage], // Uptime and Downtime percentages
        backgroundColor: [
          'rgba(75, 192, 192, 0.8)', // Color for Operational (teal/greenish)
          'rgba(255, 99, 132, 0.8)',  // Color for Non-Operational (red)
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Options for the Doughnut chart
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows the chart to fill its container
    cutout: '70%', // Adjusts the size of the hole in the doughnut
    plugins: {
      legend: {
        position: 'bottom', // Move legend to bottom for cleaner look
        labels: {
          font: {
            size: 14
          }
        }
      },
  title: {
  display: true,
  text: 'Overall System Status',
  font: {
    size: 22,
    weight: '900' // Thicker font
  },
  color: '#3B82F6', // Tailwind's text-blue-500 equivalent in hex
  padding: {
    top: 10,
    bottom: 20
  }
}

,
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += context.parsed.toFixed(2) + '%'; // Format as percentage
            }
            return label;
          }
        }
      }
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8 flex flex-col items-center"> {/* Center chart content */}
      <h3 className="text-xl font-semibold mb-4 text-gray-800"></h3>
      {serviceData && serviceData.length > 0 ? (
          <div className="relative h-64 w-64 md:h-80 md:w-80 flex items-center justify-center"> {/* Container for Doughnut */}
              <Doughnut data={data} options={options} />
              {/* Manually display the overall percentage in the center for a gauge-like look */}
              <div className="absolute text-3xl font-bold text-gray-800">
                {currentUptimePercentage.toFixed(1)}%
              </div>
          </div>
      ) : (
          <p className="text-center text-gray-500 py-10">
            No service data available to display uptime graph. Ensure services are created.
            For historical uptime trends, backend changes to store timestamps are needed.
          </p>
      )}
    </div>
  );
};

export default UptimeGraph;
