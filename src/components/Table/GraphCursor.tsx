import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ChartOptions,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);
const values = [0.13, 0.22, 0.26, 0.33, 0.36, 0.39, 0.42, 0.44, 0.54, 0.6, 0.65, 0.81];
const percentageValues = values.map(value => value * 100);
function AreaChart() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Monthly Data',
        data: percentageValues,
        fill: true, // Fill the area under the line to create the "area chart" effect
        //backgroundColor: backgroundColors,
        // backgroundColor: 'rgba(255, 106, 106, 0.6)',
        // borderColor: 'rgba(0, 0, 0, 0.1)', // A light border for the area chart
        borderColor:'rgb(0, 123, 255)',
        backgroundColor:  'rgba(0, 123, 255, 0.2)',
        borderWidth: 1,
        tension: 0.4, // Controls the curvature of the line (for smoothness)
        pointStyle: 'circle', // Marker style
        pointRadius: 4, // Marker size
        // pointHoverRadius: 10, // Marker size on hover
        // pointBackgroundColor: 'rgba(75, 192, 192, 1)', // Marker fill color
        // pointBorderColor: '#fff', // Marker border color
        pointBorderWidth: 2, // Marker border width
        
      },
    ],
  };

  const options : ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Data',
      },
      datalabels: {
        display: true, // Show data labels
        align: "top", // Position the labels above the data points
        formatter: (value: any) => {
          return `${value}%`; // Format values as percentages
        },
        color: 'rgb(77, 82, 82)', // Change the color of the labels
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
            yMax: data.datasets[0].data[6],  
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
              color: 'rgb(77, 82, 82)',
            }
          },
      y: {
        beginAtZero: true,
        max: 100, // Define maximum value (since we're working with percentages)
      ticks: {
          stepSize: 50, // Create steps at 0, 50, and 100
          callback: (value: string | number) => `${value}%`, // Format ticks as percentage
          color:  'rgb(77, 82, 82)',
      },
      grid: {
          color: function(context) {
              if (context.tick.value !== 0) {
                  //return 'rgba(0, 0, 0, 0.1) ';
                 return ('rgb(190, 198, 198)');
              }
              return 'rgba(0, 0, 0, 0)'; // Hide the first grid line
          },
      },      
      },
    },
  };

  return (
    <div className="w-full h-[400px] p-4"> {/* Adjust height as needed */}
      <Line options={options} data={data} />
    </div>
  );
}

export default AreaChart;