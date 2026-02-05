"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Models } from "node-appwrite";
import { convertFileSize, formatDateTime, getFileIcon } from "@/lib/utils";
import ActionDropDown from "@/components/ActionDropDown";

interface RecentUploadsProps {
    files: Models.DocumentList<Models.Document>;
}


const RecentUploads = ({ files }: RecentUploadsProps) => {
    return (
        <div className="w-full bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 mt-8 transition-all hover:shadow-md">
            <div className="flex items-center justify-between mb-6 md:mb-8">
                <div className="space-y-0.5">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">Recent Uploads</h2>
                    <p className="text-xs md:text-sm text-gray-500 font-medium">Recently added files to your storage</p>
                </div>
                <Link
                    href="/documents"
                    className="px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
                >
                    View All
                </Link>
            </div>

            <div className="overflow-x-auto">
                {files.total > 0 ? (
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-50">
                                <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Name</th>
                                <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-widest hidden md:table-cell">Date</th>
                                <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Size</th>
                                <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {files.documents.map((file) => (
                                <tr key={file.$id} className="group hover:bg-gray-50/50 transition-colors">
                                    <td className="py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0 transition-transform group-hover:scale-105">
                                                <Image
                                                    src={getFileIcon((file as any).extension, (file as any).type)}
                                                    alt={(file as any).type}
                                                    width={24}
                                                    height={24}
                                                    className="opacity-80"
                                                />
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-xs md:text-sm font-bold text-gray-900 truncate max-w-[120px] sm:max-w-[200px] md:max-w-xs block">
                                                    {(file as any).fileName}
                                                </span>
                                                <span className="text-[10px] text-gray-400 font-medium capitalize md:hidden">
                                                    {formatDateTime(file.$createdAt)}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 hidden md:table-cell">
                                        <span className="text-xs md:text-sm font-medium text-gray-500">
                                            {formatDateTime(file.$createdAt)}
                                        </span>
                                    </td>
                                    <td className="py-4 text-right">
                                        <span className="text-xs md:text-sm font-bold text-gray-900">
                                            {convertFileSize((file as any).fileSize)}
                                        </span>
                                    </td>
                                    <td className="py-4 text-right">
                                        <ActionDropDown file={file as any} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <Image
                                src="/assets/icons/file-document.svg"
                                alt="No files"
                                width={32}
                                height={32}
                                className="opacity-20"
                            />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">No recent uploads</h3>
                        <p className="text-sm text-gray-500 max-w-[200px] mx-auto">
                            You haven't uploaded any files yet. Start by uploading a file.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecentUploads;
