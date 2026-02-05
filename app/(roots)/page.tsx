import StorageChart from "@/components/StorageChart";
import RecentUploads from "@/components/RecentUploads";
import { getFiles, getTotalSpaceUsed } from "@/lib/actions/files.action";

export default async function Home() {
  const [totalSpace, recentFiles] = await Promise.all([
    getTotalSpaceUsed(),
    getFiles({ limit: 5, sort: "$createdAt-desc" })
  ]);

  // Calculate total used space
  const totalUsed =
    (totalSpace?.image?.size || 0) +
    (totalSpace?.document?.size || 0) +
    (totalSpace?.video?.size || 0) +
    (totalSpace?.audio?.size || 0) +
    (totalSpace?.other?.size || 0);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50/50 via-white to-purple-50/50 py-6 px-4 md:py-10 md:px-8">
      <div className="max-w-7xl mx-auto space-y-8 md:space-y-10">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight md:text-4xl">Dashboard</h1>
          <p className="text-gray-500 font-medium">Welcome back! Here's an overview of your storage.</p>
        </header>

        <div className="grid grid-cols-1 gap-8">
          <StorageChart
            used={totalUsed}
            image={totalSpace?.image?.size}
            document={totalSpace?.document?.size}
            video={totalSpace?.video?.size}
            audio={totalSpace?.audio?.size}
            other={totalSpace?.other?.size}
          />

          <RecentUploads files={recentFiles} />
        </div>
      </div>
    </div>
  );
}
