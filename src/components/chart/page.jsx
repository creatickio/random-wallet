import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";

ChartJS.register(...registerables);

const LiveChart = ({ minValue, maxValue }) => {
  // Set default values if minValue and maxValue are not defined
  const [data, setData] = useState({
    labels: Array.from({ length: 10 }, (_, i) => i + 1),
    datasets: [
      {
        label: "Live Chart",
        data: Array.from(
          { length: 10 },
          () =>
            minValue !== undefined && maxValue !== undefined
              ? Math.random() * (maxValue - minValue) + minValue
              : Math.random() * 20 - 10 // Default range from -10 to 10
        ),
        backgroundColor: "#FFD100",
        borderColor: "#FFD100",
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        let newData = { ...prevData };
        let lastPoint =
          newData.datasets[0].data[newData.datasets[0].data.length - 1];
        let nextPoint = lastPoint + Math.random() * 40 - 20;
        if (minValue !== undefined && maxValue !== undefined) {
          if (nextPoint < minValue) nextPoint = minValue;
          if (nextPoint > maxValue) nextPoint = maxValue;
        }
        newData.datasets[0].data.shift();
        newData.datasets[0].data.push(nextPoint);
        return newData;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [minValue, maxValue]);

  return (
    <Bar
      data={data}
      options={{ responsive: true, legend: { display: false } }}
    />
  );
};

export default LiveChart;
