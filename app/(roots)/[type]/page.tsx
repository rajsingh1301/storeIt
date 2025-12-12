import React from 'react'

const page = async ({params }: SearchParamProps) => {
    const type = ((await params)?.type as string)   || " ";

  return (
    <div className=' mx-auto flex w-full max-w-7xl flex-col items-center gap-8 '>
        <section className='w-full'>
            <h1 className='h1 capitalize'>{type}</h1>
            <div className='flex mt-2 flex-col justify-between sm:flex-row sm:items-center'> 
            <p className='text-[16px] leading-5 font-normal'> Total : <span>
              0 MB</span> </p>
              <div className='mt-5 flex items-center sm:mt-0 sm:gap-3 '>
                <p className='text-[16px] leading-5 font-normal hidden sm:block text-[]'>
          helloooo
                </p>

              </div>
            </div>
             </section>
    </div>
  )
}

export default page