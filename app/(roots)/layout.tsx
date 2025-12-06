import Sidebar from '@/components/Sidebar'
import React from 'react'
import MobileNavigation from '@/components/MobileNavigation'
import Header from '@/components/Header'
import { getUserProfile } from '@/lib/actions/user.action'
import { redirect } from 'next/navigation'
import { Toaster } from "@/components/ui/sonner"




const layout =  async ({children} : {children:React.ReactNode}) => {
    const CurrentUser = await getUserProfile(); 
    if(!CurrentUser) return redirect('/auth/sign-in');
  return( <main className='flex h-screen'>

    <Sidebar {...CurrentUser}/> 
    <section className='flex h-full flex-1 flex-col '>
        <MobileNavigation  {...CurrentUser}/> <Header/> 
        <div className='main-content '> {children}</div>

    </section>
    <Toaster />



  </main>)
}

export default layout