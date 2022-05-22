import { Doughnut } from "react-chartjs-2";
import React from "react";
import Chart from "chart.js/auto";

const PortfolioChart = ({ userHoldings }) => {
  //
  const labels = userHoldings.map((el) => el.assetName);
  const data = userHoldings.map((el) => `${el.currentValue}`);

  const datum = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: [
          "#e60049",
          "#0bb4ff",
          "#50e991",
          "#9b19f5",
          "#ffa300",
          "#dc0ab4",
          "#b3d4ff",
          "#00bfa0",
          "#e6d800",
        ],
        borderWidth: 0,
        borderRadius: 0,
        hoverOffset: 4,
        spacing: 1,
        cutout: "80%",
      },
    ],
  };

  const options = {
    layout: {
      padding: 2,
    },
    interaction: {
      mode: "point",
      intersection: true,
    },
    plugins: {
      legend: {
        // display: false,
        position: "bottom",

        labels: {
          pointStyle: "circle",
          usePointStyle: true,
        },
      },
    },
  };

  return (
    <>
      <Doughnut data={datum} options={options} />
    </>
  );
};

export { PortfolioChart };
