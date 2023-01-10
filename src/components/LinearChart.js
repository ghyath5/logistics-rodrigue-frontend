import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import { Bar } from "react-chartjs-2";
// import faker from "faker";
import "chartjs-adapter-moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  zoomPlugin
);

const LinearChart = ({ data }) => {
  const [theme, setTheme] = useState({ opa: 0.2, color: "#343536" });

  useEffect(() => {
    let t = localStorage.getItem("monjay-theme");
    t === "light"
      ? setTheme({ opa: 0.5, color: "#343536" })
      : setTheme({ opa: 0.8, color: "#fff" });
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    color: theme.color,
    scales: {
      y: {
        ticks: { color: theme.color },
      },
      x: {
        type: "category",
        ticks: {
          color: theme.color,
        },
      },
    },
    transitions: {
      zoom: {
        animation: {
          duration: 1000,
          easing: "easeOutCubic",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 16,
          },
        },
        position: "bottom",
      },
      title: {
        display: true,
        text: "Monthly Sales Statistics",
        position: "top",
        color: theme.color,
        font: {
          size: 20,
        },
      },
      zoom: {
        zoom: {
          drag: {
            enabled: false,
          },
          wheel: {
            enabled: true,
            speed: 0.05,
          },
          pinch: {
            enabled: false,
          },
          mode: "x",
        },
      },
    },
  };

  const datta = {
    labels: data.labels[0],
    datasets: [
      {
        label: "sales of January",
        // data: labels.map(() => faker.datatype.number({ min: 200, max: 1000 })),
        data: data.dataSet1[0],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "sales of February",
        // data: labels.map(() => faker.datatype.number({ min: 200, max: 1000 })),
        data: data.dataSet2[0],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: `rgba(53, 162, 235, ${theme.opa})`,
      },
    ],
  };
  return <Bar options={options} data={datta} />;
};

export default LinearChart;
