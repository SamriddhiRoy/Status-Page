import React from 'react';
import { Doughnut } from 'react-chartjs-2'; 
import {
  Chart as ChartJS,
  ArcElement, 
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(
  ArcElement, 
  Tooltip,
  Legend,
  Title
);

const UptimeGraph = ({ serviceData }) => {
  
  const totalServices = serviceData ? serviceData.length : 0;
  
  const operationalServices = serviceData ? serviceData.filter(s => s.status === 'Operational').length : 0;
  
  const currentUptimePercentage = totalServices > 0 ? (operationalServices / totalServices) * 100 : 0;
  const downtimePercentage = 100 - currentUptimePercentage;

  
  const data = {
    labels: ['Operational', 'Non-Operational'], 
    datasets: [
      {
        data: [currentUptimePercentage, downtimePercentage], 
        backgroundColor: [
          'rgba(75, 192, 192, 0.8)', 
          'rgba(255, 99, 132, 0.8)',  
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  
  const options = {
    responsive: true,
    maintainAspectRatio: false, 
    cutout: '70%', 
    plugins: {
      legend: {
        position: 'bottom', 
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
    weight: '900' 
  },
  color: '#3B82F6', 
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
              label += context.parsed.toFixed(2) + '%'; 
            }
            return label;
          }
        }
      }
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8 flex flex-col items-center"> 
      <h3 className="text-xl font-semibold mb-4 text-gray-800"></h3>
      {serviceData && serviceData.length > 0 ? (
          <div className="relative h-64 w-64 md:h-80 md:w-80 flex items-center justify-center"> 
              <Doughnut data={data} options={options} />
           
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
