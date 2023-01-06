import React, { useEffect } from "react";
import { Chart as ChartJSS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useState } from "react";

ChartJSS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data, names, title, labelsPosition }) => {
  const [theme, setTheme] = useState({ opa: 0.2, color: "#343536" });

  useEffect(() => {
    let t = localStorage.getItem("monjay-theme");
    t === "light"
      ? setTheme({ opa: 0.2, color: "#343536" })
      : setTheme({ opa: 1, color: "#fff" });
  }, []);

  const options = {
    responsive: true,
    color: theme.color,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 16,
          },
        },
        position: labelsPosition,
      },
      title: {
        display: true,
        text: title,
        color: theme.color,
        font: {
          size: 20,
        },
      },
    },
  };

  const dataa = {
    labels: names,
    datasets: [
      {
        label: "%",
        data: data,
        datalabels: {
          color: "#000",
          formatter: (ctx, args) => {
            const index = args.dataIndex;
            return args.dataset.data[index] > 7
              ? `${args.dataset.data[index]} %`
              : "";
          },
        },
        backgroundColor: [
          `rgba(255, 99, 132, ${theme.opa})`,
          `rgba(54, 162, 235, ${theme.opa})`,
          `rgba(255, 206, 86, ${theme.opa})`,
          `rgba(75, 192, 192, ${theme.opa})`,
          `rgba(255, 159, 64, ${theme.opa})`,
          `rgba(153, 102, 255, ${theme.opa})`,
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={dataa} options={options} plugins={[ChartDataLabels]} />;
};

export default PieChart;
