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
  
  // Unified FileDock Palette
  const colors = {
    available: "rgba(255, 255, 255, 0.05)", 
    images: "#E8B059", // Warm Gold
    documents: "#45B8B0", // Soft Teal
    media: "#8D7FE0", // Lavender
    others: "#B3B8C8" // Slate
  };

  const storageBreakdown = [
    { label: "Available", value: availableStorage, color: colors.available, icon: null },
    { label: "Images", value: image?.size || 0, color: colors.images },
    { label: "Documents", value: document?.size || 0, color: colors.documents },
    { label: "Media", value: (video?.size || 0) + (audio?.size || 0), color: colors.media },
    { label: "Other", value: other?.size || 0, color: colors.others },
  ];

  const sortedBreakdown = [...storageBreakdown]
    .filter((item) => item.label !== "Available" && item.value > 0)
    .sort((a, b) => (b.value || 0) - (a.value || 0));
  const topFileType = sortedBreakdown.length > 0 ? sortedBreakdown[0].label : "None";

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
      ctx.font = "bold 32px Inter, sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(formattedAvailable, centerX, centerY - 8);

      // "Available" text
      ctx.font = "500 14px Inter, sans-serif";
      ctx.fillStyle = "#94a3b8"; // slate-400
      ctx.fillText("Available", centerX, centerY + 22);

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
    cutout: "75%",
    layout: {
      padding: 0
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.95)", // slate-900 transparent
        titleColor: "#ffffff",
        bodyColor: "#cbd5e1",
        borderColor: "rgba(255, 255, 255, 0.15)",
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context) => {
            const index = context.datasetIndex;
            const item = storageBreakdown[index];
            if (context.dataIndex === 1) return ""; 
            if (item.label === "Available") return "";
            return ` ${item.label}: ${convertFileSize(item.value)}`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-full rounded-[16px] bg-gradient-to-br from-[#0c1222]/80 to-[#1c2331]/80 backdrop-blur-[20px] shadow-[0_0_25px_rgba(0,0,0,0.03)] border border-white/5 p-6 sm:p-8 flex flex-col transition-all">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h2 className="text-[24px] sm:text-[26px] font-bold text-white tracking-tight drop-shadow-sm antialiased">
            Storage Overview
          </h2>
          <p className="text-slate-400 text-[13px] mt-1 font-medium tracking-wide">
            Top File Type: <span className="text-white font-semibold">{topFileType}</span>
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 flex-1 w-full relative">
        {/* Chart */}
        <div className="w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] xl:w-[240px] xl:h-[240px] flex-shrink-0 mx-auto relative filter drop-shadow-[0_0_20px_rgba(250,114,117,0.15)] transition-all">
          <Doughnut
            data={data}
            options={options}
            plugins={[centerTextPlugin as Plugin<"doughnut">]}
          />
        </div>

        {/* Legend Grid Setup */}
        <div className="flex-1 w-full flex flex-col justify-center min-w-0 mt-4 md:mt-0 xl:pl-4">
          <div className="flex flex-col gap-4">
            {storageBreakdown.map((item, index) => {
              if (item.label === "Available") return null; 
              return (
              <div key={index} className="flex items-center justify-between group">
                <div className="flex items-center gap-3 truncate pr-2">
                  <div
                    className="w-3.5 h-3.5 rounded-full flex-shrink-0 border border-white/20 transition-transform group-hover:scale-110"
                    style={{ 
                       backgroundColor: item.color,
                       boxShadow: `0 0 10px ${item.color}80, inset 0 0 4px rgba(255,255,255,0.5)`
                     }}
                  />
                  <span className="text-slate-300 font-semibold text-[15px] group-hover:text-white transition-colors">
                    {item.label}
                  </span>
                </div>
                <span className="text-white font-bold text-[15px] flex-shrink-0 mono-number drop-shadow-sm text-right w-[80px]">
                  {convertFileSize(item.value || 0)}
                </span>
              </div>
            )})}
          </div>
        </div>
      </div>

      {/* Progress Track */}
      <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-slate-700/50 w-full flex flex-col lg:flex-row items-center gap-4 lg:gap-6 xl:gap-8 justify-between relative">
        <h3 className="text-[14px] font-semibold text-slate-400 whitespace-nowrap flex-shrink-0">
          Total Capacity
        </h3>

        {/* Deep Recessed Inset Bar */}
        <div className="flex-1 w-full h-[10px] bg-[#111624] rounded-full overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] border border-white/5">
          <div
            className="h-full bg-gradient-to-r from-[#FA7275] to-[#ffb4b6] rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(250,114,117,0.5)] min-w-[2%]"
            style={{ width: `${percentageUsed}%` }}
          />
        </div>

        <p className="text-[13px] text-slate-400 font-mono whitespace-nowrap flex items-center flex-shrink-0 tracking-wide">
          <span className="text-[16px] font-bold text-white mono-number drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] mr-2">
            {percentageUsed}%
          </span>
          {convertFileSize(used)} used of {convertFileSize(all)}
        </p>
      </div>
    </div>
  );
};

export default StorageChart;
