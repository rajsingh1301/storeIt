import { Models } from 'node-appwrite'
import React from 'react'
import Thumbnail from './Thumbnail'
import Image   from 'next/image'
import { convertFileSize } from '@/lib/utils';
import FormatedDateTime from './FormatedDateTime';

// Extend Models.Document with your custom properties
interface FileDocument extends Models.Document {
  url: string;
  type: string;
  extension: string;
  fileName: string;
  fileSize: number;
  owner: {
    fullName: string;
  }
 
}

function Card( { file }: { file: FileDocument } ) {
  
  // Debug: Check the entire file object
 console.log(file.owner.fullName);
  
  return (
   <a href={file.url} target='_blank' rel="noopener noreferrer" className='flex cursor-pointer flex-col gap-6 rounded-[18px] bg-white p-5 shadow-sm transition-all hover:shadow-drop-3'> 
   <div className='flex justify-between'>
    <Thumbnail type={file.type} extension={file.extension} url= {file.url} className='!size-20' imageClassName='!size-11'/>
    <div className='flex flex-col  items-end justify-between'>
<p className='body-1'> {convertFileSize(file.fileSize)}</p>
    </div>
   </div>
   <div className='flex flex-col gap-2 text-[#333F4E]'>
    <p className='text-[14px] leading-5 font-semibold line-clamp-2'>
   {file.fileName}
    </p>
    <FormatedDateTime date = {file.$createdAt} className = "body-2 text-[#333F4E]}" />
    <p className='body-2'> By:  {file.owner.fullName}</p>
   </div>
   </a>
  )
}

export default Card ;