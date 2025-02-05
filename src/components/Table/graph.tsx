'use client'
import React, {useState, useEffect} from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,  // Import Filler for area chart filling
} from 'chart.js';

// Import the Data Labels Plugin
import ChartDataLabels from 'chartjs-plugin-datalabels';
import annotationPlugin from 'chartjs-plugin-annotation';
import { Box, Paper, Typography } from '@mui/material';

// Register necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,  // Register the Filler component to enable the area filling
  ChartDataLabels,
  annotationPlugin
);


const MonthlyAreaChart = () => {
  // Define data for 12 months
  const months = [
    'JAN', 'FEB', 'MAR',
    'APR', 'MAY', 'JUN',
    'JUL', 'AUG', 'SEP',
    'OCT', 'NOV', 'DEC'
  ];

// Values for each month (you can customize these values)
const values = [0.13, 0.22, 0.26, 0.33, 0.36, 0.39, 0.42, 0.44, 0.54, 0.6, 0.65, 0.81];
const percentageValues = values.map(value => value * 100);

////////////////////////////////////////THEME//////////////////
const [isDarkMode, setIsDarkMode] = useState(false);

useEffect(() => {
  // Detect system theme preference
  const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  setIsDarkMode(darkModeMediaQuery.matches);

  // Listen for theme changes
  const handleThemeChange = (event: MediaQueryListEvent) => {
    setIsDarkMode(event.matches);
  };

  darkModeMediaQuery.addEventListener('change', handleThemeChange);

  // Clean up listener
  return () => {
    darkModeMediaQuery.removeEventListener('change', handleThemeChange);
  };
}, []);
// Chart data configuration
const data = {
    labels: months,
    datasets: [
      {
        label: 'Monthly Data',
        data: percentageValues,
        fill: true, // Fill the area under the line to create the "area chart" effect
        //backgroundColor: backgroundColors,
        // backgroundColor: 'rgba(255, 106, 106, 0.6)',
        // borderColor: 'rgba(0, 0, 0, 0.1)', // A light border for the area chart
        borderColor: isDarkMode ? 'rgb(75, 192, 192)' : 'rgb(0, 123, 255)',
        backgroundColor: isDarkMode ? 'rgba(75, 192, 192, 0.2)' : 'rgba(0, 123, 255, 0.2)',
        borderWidth: 1,
        tension: 0.4, // Controls the curvature of the line (for smoothness)
        pointStyle: 'circle', // Marker style
        pointRadius: 4, // Marker size
        // pointHoverRadius: 10, // Marker size on hover
        // pointBackgroundColor: 'rgba(75, 192, 192, 1)', // Marker fill color
        // pointBorderColor: '#fff', // Marker border color
        pointBorderWidth: 2, // Marker border width
        
      }
    ]
};

  // Chart options
const options: ChartOptions <'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
      // title: {
      //   display: true,
      //   text: 'Monthly Percentage Area Chart',
      //   color:  isDarkMode ? 'rgb(190, 198, 198)': 'rgb(77, 82, 82)',
      // },
      legend: {
        labels: {//change color for label in datasets
          color:  isDarkMode ? 'rgb(190, 198, 198)': 'rgb(77, 82, 82)',
        }
      },
      datalabels: {
          display: true, // Show data labels
          align: "top", // Position the labels above the data points
          formatter: (value: any) => {
            return `${value}%`; // Format values as percentages
          },
          color: isDarkMode ? 'rgb(190, 198, 198)': 'rgb(77, 82, 82)', // Change the color of the labels
      },
      annotation: {//draw the vertical lines from the labels to X-axis
        annotations: [
          {
            type: 'line',
            xMin: 3, 
            xMax: 3, 
            yMin: 0,   
            yMax: data.datasets[0].data[3],  
            borderColor: 'gray',
            borderWidth: 1,
            borderDash: [5, 5], // Dotted line style
          },
          {
            type: 'line',
            xMin: 6, 
            xMax: 6, 
            yMin: 0,       
            yMax: data.datasets[0].data[5],  
            borderColor: 'gray',
            borderWidth: 1,
            borderDash: [5, 5], // Dotted line style
          },
          {
            type: 'line',
            xMin: 9, 
            xMax: 9, 
            yMin: 0,       
            yMax: data.datasets[0].data[9],  
            borderColor: 'gray',
            borderWidth: 1,
            borderDash: [5, 5], // Dotted line style
          },
        ],
      },
  },
  scales: {
    x: {
      beginAtZero: true,
      grid: {
          color: 'transparent',
      },
      ticks: {
        color:  isDarkMode ? 'rgb(190, 198, 198)': 'rgb(77, 82, 82)',
      }
    },
    
    y: {
      beginAtZero: true,
      max: 100, // Define maximum value (since we're working with percentages)
      ticks: {
          stepSize: 50, // Create steps at 0, 50, and 100
          callback: (value: string | number) => `${value}%`, // Format ticks as percentage
          color:  isDarkMode ? 'rgb(190, 198, 198)': 'rgb(77, 82, 82)',
      },
      grid: {
          color: function(context) {
              if (context.tick.value !== 0) {
                  //return 'rgba(0, 0, 0, 0.1) ';
                 return (isDarkMode? 'rgb(77, 82, 82)' : 'rgb(190, 198, 198)');
              }
              return 'rgba(0, 0, 0, 0)'; // Hide the first grid line
          },
      },      
    }
  },

};


  return (
    <div className="w-full h-[400px] p-4"> {/* Adjust height as needed */}
      <Line options={options} data={data} />
    </div>
  );
};

export default MonthlyAreaChart;
