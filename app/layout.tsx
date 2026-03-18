import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "FileDock",
  description: "FileDock - The only storage solution you need.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased bg-[#1A2234] text-white font-sans`}
      >
        <div className="mx-auto min-h-screen">{children}</div>
      </body>
    </html>
  );
}
// {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black`}
//       >
//                 <div className="p-5 max-w-[1400px] mx-auto">
//           {children}
//         </div>
//       </body>
//     </html>
//   );
// }
