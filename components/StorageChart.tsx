"use client";

import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { convertFileSize } from "@/lib/utils";
import {
  FileText,
  Image as ImageIcon,
  Video,
  Music,
  MoreHorizontal,
  HardDrive
} from "lucide-react";

interface StorageChartProps {
  used?: number;
  image?: number;
  document?: number;
  video?: number;
  audio?: number;
  other?: number;
}

const COLORS = {
  document: "#7987FF", // Modern blue/indigo
  image: "#FF9F43",    // Modern orange
  video: "#28C76F",    // Modern green
  audio: "#EA5455",    // Modern red/pink
  other: "#9F7AEA",    // Modern purple
  available: "#F3F4F6" // Very light gray (Tailwind gray-100)
};

const StorageChart: React.FC<StorageChartProps> = ({
  used = 0,
  image = 0,
  document = 0,
  video = 0,
  audio = 0,
  other = 0,
}) => {
  const totalStorage = 2 * 1024 * 1024 * 1024; // 2GB in bytes
  const usedStorage = used;
  const availableStorage = Math.max(0, totalStorage - usedStorage);
  const percentageUsed = Math.min(100, Math.round((usedStorage / totalStorage) * 100));

  const chartData = useMemo(() => [
    { name: "Documents", value: document, color: COLORS.document, icon: FileText },
    { name: "Images", value: image, color: COLORS.image, icon: ImageIcon },
    { name: "Video", value: video, color: COLORS.video, icon: Video },
    { name: "Audio", value: audio, color: COLORS.audio, icon: Music },
    { name: "Other", value: other, color: COLORS.other, icon: MoreHorizontal },
    { name: "Available", value: availableStorage, color: COLORS.available, icon: HardDrive },
  ], [document, image, video, audio, other, availableStorage]);

  // Filter out zero values for the chart segments to keep it clean
  const cleanChartData = chartData.filter(item => item.value > 0);

  return (
    <div className="w-full bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 transition-all hover:shadow-md">
      <div className="flex items-start justify-between mb-6 md:mb-8">
        <div className="space-y-0.5">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">Storage</h2>
          <p className="text-xs md:text-sm text-gray-500 font-medium">Manage your storage and files</p>
        </div>
        <button className="px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors">
          View details
        </button>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-10">
        {/* Chart Section */}
        <div className="relative w-[240px] h-[240px] md:w-[280px] md:h-[280px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={cleanChartData}
                cx="50%"
                cy="50%"
                innerRadius={85}
                outerRadius={110}
                paddingAngle={4}
                dataKey="value"
                stroke="none"
                startAngle={90}
                endAngle={450}
              >
                {cleanChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    className="transition-all duration-300 hover:opacity-80 outline-none"
                  />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white px-4 py-2 shadow-lg border border-gray-100 rounded-xl text-sm font-medium">
                        <span style={{ color: data.color }}>{data.name}</span>: {convertFileSize(data.value)}
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-4xl font-bold text-gray-900 tracking-tight">
              {percentageUsed}%
            </span>
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Used
            </span>
          </div>
        </div>

        {/* Legend Section */}
        <div className="flex-1 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
            {chartData.filter(item => item.name !== "Available").map((item) => (
              <div
                key={item.name}
                className="group flex items-center justify-between p-2.5 md:p-3 rounded-xl md:rounded-2xl hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${item.color}15` }} // 15% opacity
                  >
                    <item.icon size={18} className="md:size-5" style={{ color: item.color }} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs md:text-sm font-bold text-gray-700">{item.name}</span>
                    <span className="text-[10px] md:text-xs text-gray-400 font-medium">
                      {Math.round((item.value / totalStorage) * 100)}%
                    </span>
                  </div>
                </div>
                <span className="text-xs md:text-sm font-bold text-gray-800">
                  {convertFileSize(item.value)}
                </span>
              </div>
            ))}
          </div>

          {/* Overall Status */}
          <div className="pt-4 md:pt-6 border-t border-gray-100">
            <div className="flex items-end justify-between mb-3 md:mb-4">
              <div className="space-y-0.5">
                <h3 className="text-base md:text-lg font-bold text-gray-900">Total Storage</h3>
                <p className="text-xs md:text-sm text-gray-500 font-medium">
                  {convertFileSize(usedStorage)} of 2 GB used
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">
                  Available
                </span>
                <span className="text-xl font-black text-gray-900">
                  {convertFileSize(availableStorage)}
                </span>
              </div>
            </div>

            {/* Modern Progress Bar */}
            <div className="relative w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-linear-to-r from-[#7987FF] via-[#9F7AEA] to-[#EA5455] rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${percentageUsed}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorageChart;
