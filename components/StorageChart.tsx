"use client";

import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  Plugin,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface StorageData {
  label: string;
  value: number;
  color: string;
}

interface StorageChartProps {
  totalStorage?: number;
  usedStorage?: number;
  storageBreakdown?: StorageData[];
}

const StorageChart: React.FC<StorageChartProps> = ({
  totalStorage = 400,
  usedStorage = 326,
  storageBreakdown = [
    { label: "Photo", value: 117, color: "#FFB84D" },
    { label: "Video", value: 117, color: "#5DD3F3" },
    { label: "Documents", value: 117, color: "#9B9EF8" },
    { label: "Other", value: 117, color: "#C4C4F3" },
    { label: "Available", value: 74, color: "#FF9090" },
  ],
}) => {
  const availableStorage = totalStorage - usedStorage;
  const percentageUsed = Math.round((usedStorage / totalStorage) * 100);

  // Center text plugin
  const centerTextPlugin: Plugin<"doughnut"> = {
    id: "centerText",
    beforeDraw: (chart) => {
      const { ctx, chartArea } = chart;
      if (!chartArea) return;

      const centerX = (chartArea.left + chartArea.right) / 2;
      const centerY = (chartArea.top + chartArea.bottom) / 2;

      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Main storage text
      ctx.font = "bold 48px Inter, sans-serif";
      ctx.fillStyle = "#1f2937";
      ctx.fillText(`${availableStorage}GB`, centerX, centerY - 15);

      // "Available" text
      ctx.font = "14px Inter, sans-serif";
      ctx.fillStyle = "#6b7280";
      ctx.fillText("Available", centerX, centerY + 20);

      ctx.restore();
    },
  };

  const data = {
    labels: storageBreakdown.map((item) => item.label),
    datasets: [
      {
        data: storageBreakdown.map((item) => item.value),
        backgroundColor: storageBreakdown.map((item) => item.color),
        borderWidth: 0,
        borderRadius: 8,
        spacing: 4,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: true,
    cutout: "75%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "white",
        titleColor: "#1f2937",
        bodyColor: "#4b5563",
        borderColor: "#e5e7eb",
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.parsed;
            return ` ${label}: ${value}GB`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8">
      <div className="flex items-start justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Storage</h2>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View details
        </button>
      </div>

      <div className="flex items-center gap-12">
        {/* Chart */}
        <div className="w-[300px] h-[300px] flex-shrink-0">
          <Doughnut
            data={data}
            options={options}
            plugins={[centerTextPlugin]}
          />
        </div>

        {/* Legend */}
        <div className="flex-1">
          <div className="space-y-3 mb-8">
            {storageBreakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-700 font-medium">
                    {item.label}
                  </span>
                </div>
                <span className="text-gray-600 font-medium">
                  {item.value}GB
                </span>
              </div>
            ))}
          </div>

          {/* Storage Info */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-800">
                Available storage
              </h3>
              <span className="text-2xl font-bold text-gray-800">
                {100 - percentageUsed}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden flex mb-3">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"
                style={{ width: `${80}%` }}
              />
              <div
                className="h-full bg-gradient-to-r from-rose-400 to-red-400 rounded-full"
                style={{ width: `${20}%` }}
              />
            </div>

            <p className="text-sm text-gray-600">
              {usedStorage} GB used of {totalStorage} GB
            </p>

            <button className="w-full mt-4 bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg transition-colors">
              Upgrade plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorageChart;
