import React from 'react'

const page = async ({params }: SearchParamProps) => {
    const type = ((await params)?.type as string)   || " ";

  return (
    <div className=' mx-auto flex w-full max-w-7xl flex-col items-center gap-8 '>
        <section className='w-full'>
            <h1 className='h1 capitalize'>{type}</h1>
             </section>
    </div>
  )
}

export default page