import { Link } from 'lucide-react'
import { Models } from 'node-appwrite'
import React from 'react'
import Thumbnail from './Thumbnail'

function Card( { file }: { file: Models.Document } ) {
  return (
   <Link href={file.url} target='_blank' className='flex cursor-pointer flex-col gap-6 rounded-[18px] bg-white p-5 shadow-sm transition-all hover:shadow-drop-3'> 
   <div className='flex justify-between'>
    <Thumbnail type={file.type} extension={file.extension}/>

   </div>
   {file.fileName}

   </Link>
  )
}

export default Card
