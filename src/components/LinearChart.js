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
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import { Bar } from "react-chartjs-2";
import faker from "faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

const LinearChart = () => {
  const [theme, setTheme] = useState({ opa: 0.2, color: "#343536" });

  useEffect(() => {
    let t = localStorage.getItem("monjay-theme");
    t === "light"
      ? setTheme({ opa: 0.5, color: "#343536" })
      : setTheme({ opa: 0.8, color: "#fff" });
  }, []);

  const options = {
    responsive: true,
    color: theme.color,
    scales: {
      y: {
        ticks: { color: theme.color },
      },
      x: {
        ticks: { color: theme.color },
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
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "x",
        },
      },
    },
  };

  const labels = [...Array(31).keys()];

  const data = {
    labels,
    datasets: [
      {
        label: "sales of January",
        data: labels.map(() => faker.datatype.number({ min: 200, max: 1000 })),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "sales of February",
        data: labels.map(() => faker.datatype.number({ min: 200, max: 1000 })),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: `rgba(53, 162, 235, ${theme.opa})`,
      },
    ],
  };
  return <Bar options={options} data={data} />;
};

export default LinearChart;
