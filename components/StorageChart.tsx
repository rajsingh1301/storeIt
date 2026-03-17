"use client";

import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  ChartOptions,
  Plugin,
} from "chart.js";
import { calculatePercentage, convertFileSize } from "@/lib/utils";

ChartJS.register(ArcElement, Tooltip, Legend);

interface StorageChartProps {
  used: number;
  all: number;
  image: { size: number; latestDate: string };
  document: { size: number; latestDate: string };
  video: { size: number; latestDate: string };
  audio: { size: number; latestDate: string };
  other: { size: number; latestDate: string };
}

const StorageChart: React.FC<StorageChartProps> = (totalSpace) => {
  const { used = 0, all = 2 * 1024 * 1024 * 1024, image, document, video, audio, other } = totalSpace;
  
  const availableStorage = all - used;
  const percentageUsed = calculatePercentage(used);
  
  // Custom Neumorphism / Glassmorphism Palette
  const colors = {
    available: "#e2e8f0", 
    images: "#d4b572", // Muted Gold
    documents: "#2dd4bf", // Soft Teal
    media: "#a78bfa", // Lavender
    others: "#94a3b8" // Slate
  };

  const storageBreakdown = [
    { label: "Available", value: availableStorage, color: colors.available },
    { label: "Images", value: image?.size || 0, color: colors.images },
    { label: "Documents", value: document?.size || 0, color: colors.documents },
    { label: "Media", value: (video?.size || 0) + (audio?.size || 0), color: colors.media },
    { label: "Other", value: other?.size || 0, color: colors.others },
  ];

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
      const formattedAvailable = convertFileSize(availableStorage);
      ctx.font = "bold 26px 'JetBrains Mono', monospace";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(formattedAvailable, centerX, centerY - 10);

      // "Available" text
      ctx.font = "500 13px Inter, sans-serif";
      ctx.fillStyle = "#94a3b8"; // slate-400
      ctx.fillText("Available", centerX, centerY + 18);

      ctx.restore();
    },
  };

  // Build Concentric Rings
  const generateConcentricDatasets = () => {
    // Outer to inner based on array order
    return storageBreakdown.map((item) => {
      return {
        data: [item.value, all - Math.min(item.value, all)], 
        backgroundColor: [item.color, "transparent"],
        borderWidth: 0,
        borderRadius: 8,
        hoverOffset: 2,
        weight: 1, 
      };
    });
  };

  const data = {
    labels: storageBreakdown.map((item) => item.label),
    datasets: generateConcentricDatasets()
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: true,
    cutout: "70%",
    layout: {
      padding: 10
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.9)", // slate-900 transparent
        titleColor: "#ffffff",
        bodyColor: "#cbd5e1",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context) => {
            const index = context.datasetIndex;
            const item = storageBreakdown[index];
            if (context.dataIndex === 1) return ""; 
            return ` ${item.label}: ${convertFileSize(item.value)}`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-full glassmorphism rounded-[32px] p-6 sm:p-8 flex flex-col transition-all">
      <div className="flex items-start justify-between mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-[26px] font-bold text-white tracking-tight drop-shadow-sm">Storage Details</h2>
      </div>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 flex-1">
        {/* Chart */}
        <div className="w-[200px] h-[200px] xl:w-[240px] xl:h-[240px] flex-shrink-0 mx-auto relative filter drop-shadow-[0_0_24px_rgba(45,212,191,0.2)]">
          <Doughnut
            data={data}
            options={options}
            plugins={[centerTextPlugin as Plugin<"doughnut">]}
          />
        </div>

        {/* Legend */}
        <div className="flex-1 w-full flex flex-col justify-center min-w-0">
          <div className="grid grid-cols-1 gap-3 mb-6">
            {storageBreakdown.map((item, index) => {
              if (item.label === "Available") return null; 
              return (
              <div key={index} className="flex items-center justify-between p-3 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 group">
                <div className="flex items-center gap-3 truncate pr-2">
                  <div
                    className="w-4 h-4 rounded-full shadow-[0_0_12px_rgba(255,255,255,0.4)] flex-shrink-0 border border-white/20"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-slate-300 font-semibold text-[15px] truncate group-hover:text-white transition-colors">
                    {item.label}
                  </span>
                </div>
                <span className="text-white font-bold text-[15px] flex-shrink-0 mono-number drop-shadow-sm">
                  {convertFileSize(item.value || 0)}
                </span>
              </div>
            )})}
          </div>

          {/* Storage Info */}
          <div className="pt-5 border-t border-white/10">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[14px] font-semibold text-slate-400">
                Total Capacity
              </h3>
              <span className="text-[20px] font-bold text-white mono-number drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                {percentageUsed}%
              </span>
            </div>

            {/* Progress Bar Neumorphic Inset */}
            <div className="w-full h-2.5 bg-black/40 rounded-full overflow-hidden mb-3 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] border border-white/5">
              <div
                className="h-full bg-gradient-to-r from-[#FA7275] to-[#ffb4b6] rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(250,114,117,0.5)]"
                style={{ width: `${percentageUsed}%` }}
              />
            </div>

            <p className="text-[13px] text-slate-400 font-medium text-center mt-4 tracking-wide">
              {convertFileSize(used)} used of <span className="mono-number text-slate-300">{convertFileSize(all)}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorageChart;
