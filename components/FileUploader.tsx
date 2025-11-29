"use client"
import {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

const FileUploader = () => {
    const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} className = "cursor pointer">
      <input {...getInputProps()} />
      <Button type "button" className={cn(' flex items-center justify-between  gap-3 rounded-xl p-3 shadow-drop-3')}
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}

export default FileUploader