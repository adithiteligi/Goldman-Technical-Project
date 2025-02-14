import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const InvestmentChart = ({ yearlyData }) => {
    const chartData = {
        labels: yearlyData.map((item) => item.year),
        datasets: [
            {
                label: "Investment Growth",
                data: yearlyData.map((item) => item.balance),
                borderColor: "blue",
                backgroundColor: "rgba(0, 0, 255, 0.2)",
                fill: true,
                tension: 0.2,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Investment Growth Over Time" },
        },
    };

    return (
        <div style={{ height: "400px", width: "100%" }}>
            <Line data={chartData} options={chartOptions} />
        </div>
    );
};

export default InvestmentChart;
