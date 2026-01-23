import { Models } from "node-appwrite";
import Thumbnail from "../Thumbnail";
import FormatedDateTime from "../FormatedDateTime";
import { convertFileSize, formatDateTime, getFileType } from "@/lib/utils";
import { Input } from "./input";

interface FileDocument extends Models.Document {
  url: string;
  type: string;
  extension: string;
  fileName?: string;
  fileSize?: number;
  owner: {
    fullName: string;
  };
  length?: number;
  users?: string[];
}

const ImageThumbnail = ({ file }: { file: FileDocument }) => {
  return (
    <div className="mb-6 flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-md">
      <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gray-50 border border-gray-100 p-2 overflow-hidden">
        <Thumbnail type={file.type} url={file.url} extension={file.extension} />
      </div>
      <div className="flex flex-col gap-0.5 min-w-0 flex-1">
        <p className="text-base font-bold text-gray-900 truncate tracking-tight">
          {file.fileName}
        </p>
        <FormatedDateTime
          date={file.$createdAt}
          className="text-xs text-gray-400 font-medium"
        />
      </div>
    </div>
  );
};
interface Props {
  file: FileDocument;
  onInputChange: React.Dispatch<React.SetStateAction<string[]>>;
  onRemove: (email: string) => void;
}
export const ShareInput = ({ file, onInputChange, onRemove }: Props) => {
  return (
    <>
      <ImageThumbnail file={file} />
      <div className="space-y-4">
        <p className="subtitle-2 text-light-100 pl-1 text-[#333F4E]">
          Share file with other users
        </p>
        <Input
          type="email"
          placeholder="Enter email address"
          onChange={(e) =>
            onInputChange(
              e.target.value
                .trim()
                .split(",")
                .map((email) => email.trim())
                .filter((email) => email)
            )
          }
          className="body-2 h-[52px] w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 shadow-sm transition-all focus:bg-white focus:border-[#FA7275] focus:ring-4 focus:ring-[#FA7275]/10 placeholder:text-gray-400"
        />
        <div className="pt-2">
          <div className="flex justify-between items-center mb-3">
            <p className="subtitle-2 text-light-100 text-[#333F4E]">Shared with</p>
            <p className="subtitle-2 text-light-200 text-gray-400">{file.users?.length || 0} users</p>
          </div>

          <div className="rounded-2xl bg-white border border-gray-100 p-5 max-h-[180px] overflow-y-auto">
            {file.users && file.users.length > 0 ? (
              <ul className="space-y-3">
                {file.users.map((email) => (
                  <li
                    key={email}
                    className="flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-indigo-50 flex items-center justify-center border border-indigo-100 text-indigo-600 font-bold text-xs shadow-sm">
                        {email.substring(0, 2).toUpperCase()}
                      </div>
                      <p className="subtitle-2 text-gray-700 truncate max-w-[220px]" title={email}>
                        {email}
                      </p>
                    </div>
                    <button
                      onClick={() => onRemove(email)}
                      className="p-1.5 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100"
                    >
                      <img
                        src="/assets/icons/remove.svg"
                        alt="Remove"
                        width={18}
                        height={18}
                        className="opacity-60 hover:opacity-100 transition-opacity"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <p className="text-gray-400 text-sm">No users yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number | undefined;
}) => {
  return (
    <div className="group flex items-center justify-between py-2.5">
      <p className="text-sm text-gray-500 font-medium group-hover:text-gray-700 transition-colors w-1/4 truncate ">
        {label}
      </p>
      <p className="text-sm font-semibold text-gray-800 flex-1 text-left truncate">
        {value}
      </p>
    </div>
  );
};

export const FileDetails = ({ file }: { file: FileDocument }) => {
  return (
    <div className="w-full">
      <ImageThumbnail file={file} />

      <div className="space-y-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-md space-y-1">
          <DetailRow
            label="Format :"
            value={file.extension || getFileType(file.fileName || "").extension}
          />
          <DetailRow
            label="Size :"
            value={convertFileSize(file.fileSize || 0)}
          />
          <DetailRow
            label="Uploaded By :"
            value={file.owner?.fullName || "Unknown"}
          />
          <DetailRow
            label="Uploaded On :"
            value={formatDateTime(file.$createdAt)}
          />
          <DetailRow
            label="Last Edited :"
            value={formatDateTime(file.$updatedAt)}
          />
        </div>
      </div>
    </div>
  );
};
