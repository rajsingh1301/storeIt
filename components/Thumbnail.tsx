import React from 'react'
interface Props{
  type:string;
  extension:string;
  url?:string;
}
const Thumbnail = ({ type , extension , url = '' } : Props) => {
    const isImage = type === 'image' && extension !== 'svg';
  return (
    <figure>
        <Image src = { url }
    </figure>
  )
}

export default Thumbnail