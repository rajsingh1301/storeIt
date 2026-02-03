"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "./ui/input";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { getFiles } from "@/lib/actions/files.action";
import { Models } from "node-appwrite";
import { fa } from "zod/v4/locales";
import Thumbnail from "./Thumbnail";
import FormatedDateTime from "./FormatedDateTime";
import { useDebounce } from 'use-debounce';

const Search = () => {
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") || "";
  const [results, setResults] = useState<Models.Document[]>([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const path = usePathname()
    const [debounceQuery] = useDebounce(query, 300);

  useEffect(() => {
    const fetchFiles = async () => {
      if(debounceQuery.length==0) {
        setResults([]);
        setOpen(false);
        return router.push(path.replace(searchParams.toString(), ""));
      }
      const files = await getFiles({types:[], searchText: debounceQuery });
      setResults(files.documents);
      setOpen(true);
    };
    fetchFiles();
  }, [debounceQuery]);

  useEffect(() => {
    if (!searchQuery) {
      setQuery("");
    } else {
      setQuery(searchQuery);
    }
  }, [searchQuery]);
  const handleClickItem = (files: Models.Document) => {
    setOpen(false);
    setResults([]);
    router.push(
      `${files.type === 'video' || files.type === 'audio' ? 'media' : files.type + 's'}?query=${query}`,
    );
  };

  return (
    <div className="relative w-full">
      <div className="flex h-[52px] flex-1 items-center gap-3 rounded-full px-4 border border-gray-200 shadow-sm">
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={20}
          height={20}
          className="mt-1"
        />
        <Input
          value={query}
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value)}
          className="body-2 outline-none ring-offset-transparent focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0  placeholder:body-1 w-full border-none p-0 shadow-none placeholder:text-[#A3B2C7] "
        />
        {open && (
          <ul className="absolute left-0 top-16 z-50 flex w-full flex-col gap-3 rounded-[20px] bg-white p-4 shadow-lg border border-gray-200">
            {results.length > 0 ? (
              results.map((file) => (
                <li
                  key={file.$id}
                  className="body-2 text-black hover:bg-gray-50 p-2 rounded-lg cursor-pointer flex items-center justify-between "
                  onClick={() => handleClickItem(file)}
                >
                  <div className="flex items-center cursor-pointer gap-2">
                    <Thumbnail
                      type={file.type}
                      extension={file.extension}
                      url={file.url}
                      className="size-9 min-w-9 object-cover"
                    />
                    <p className="text-[14px] leading-[20px] font-semibold line-clamp-1 text-[#333F4E] max-w-[200px]">
                      {file.fileName}
                    </p>
                  </div>
                  <FormatedDateTime
                    date={file.$createdAt}
                    className="text-gray-400 text-sm"
                  />
                </li>
              ))
            ) : (
              <li className="body-2 text-center text-light-200">
                No results found
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;
