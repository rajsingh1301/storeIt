import { Models } from 'node-appwrite'
import Thumbnail from '../Thumbnail'
import FormatedDateTime from '../FormatedDateTime';
import { convertFileSize, formatDateTime, getFileType } from '@/lib/utils';

interface FileDocument extends Models.Document {
  url: string;
  type: string;
  extension: string;
  fileName?: string;
  fileSize?: number;
  owner: {
    fullName: string;
  };
}

const ImageThumbnail = ({file}: {file: FileDocument}) =>{
  return (
    <div className='mb-6 flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-md'>
      <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gray-50 border border-gray-100 p-2 overflow-hidden">
        <Thumbnail type={file.type} url={file.url} extension={file.extension} />
      </div>
      <div className='flex flex-col gap-0.5 min-w-0 flex-1'>
        <p className='text-base font-bold text-gray-900 truncate tracking-tight'>
          {file.fileName}
        </p>
       <FormatedDateTime date={file.$createdAt} className='text-xs text-gray-400 font-medium'/>
      </div>
    </div>
  )
}

const DetailRow = ({label , value} : {label : string ; value : string | number | undefined}) =>{
  return (
  <div className='group flex items-center justify-between py-2.5'>
    <p className = "text-sm text-gray-500 font-medium group-hover:text-gray-700 transition-colors w-1/3 truncate">
      {label}
    </p>
    <p className='text-sm font-semibold text-gray-800 flex-1 text-left truncate'> 
      {value}
    </p>
  </div>
  )
}

export const FileDetails  = ({file}: {file: FileDocument}) => {
  return (
    <div className="w-full">
      <ImageThumbnail file={file} />
      
      <div className="space-y-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-md space-y-1">
           <DetailRow label="Format :" value={file.extension || getFileType(file.fileName || "").extension} />
           <DetailRow label="Size :" value={convertFileSize(file.fileSize || 0)} />
           <DetailRow label="Uploaded By :" value={file.owner?.fullName || "Unknown"} />
           <DetailRow label="Uploaded On :" value={formatDateTime(file.$createdAt)} />
           <DetailRow label="Last Edited :" value={formatDateTime(file.$updatedAt)} />
        </div>
        
      </div>
    </div>
  )
}

