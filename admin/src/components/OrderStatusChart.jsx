import React, { useRef, useEffect } from "react";
import { Chart, ArcElement, Tooltip, Legend, PieController } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend, PieController);

const OrderStatusChart = ({ statusCounts }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (!statusCounts || !chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: "pie",
      data: {
        datasets: [
          {
            label: "Count",
            data: Object.values(statusCounts),
            backgroundColor: [
              "#E52020", // OrderPlaced
              "#DF6D14", // Packing
              "#854836", // Shipped
              "#0079FF", // OutForDelivery
              "#3A7D44", // Delivered
            ],
            hoverOffset: 10,
            borderWidth: 1,
            borderColor: "#FBFFE4",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1,
        plugins: {
          legend: {
            position: "top",
          },
          tooltip: {
            enabled: true,
          },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [statusCounts]);

  return (
    <canvas
      ref={chartRef}
      id="pieChart"
      width={150}
      height={150}
      className="drop-shadow-xl"
    />
  );
};

export default OrderStatusChart;