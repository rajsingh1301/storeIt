import { Divide } from 'lucide-react'
import { Models } from 'node-appwrite'
const ImageThumbnail = ({file}: {file: Models.Document}) =>{
  <div className='mb-1 flex items-center gap-3 rounded-xl border border-light-200/40 bg-light-400/50 p-3'>
     
  </div>
}
 export const FileDetails  = ({file}: {file: Models.Document}) => {
  return (
    <>
    <ImageThumbnail file={file} />
    </>
  )
}

