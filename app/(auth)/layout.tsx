import type { ReactNode } from 'react'
import Image from 'next/image'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#1A2234] to-[#0D111E]">
      {/* Branding Side - Deep Slate Panel */}
      <section className="hidden w-1/2 items-center justify-center border-r border-white/5 p-10 lg:flex xl:w-2/5 relative overflow-hidden">
        {/* Decorative ambient glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FA7275] rounded-full mix-blend-screen filter blur-[150px] opacity-10 pointer-events-none" />
        
        <div className="flex max-h-[800px] max-w-[430px] flex-col justify-center space-y-12 relative z-10">
          <div className="flex items-center gap-3">
            <Image
              src="/assets/icons/logo-brand.svg"
              alt="logo"
              width={64}
              height={64}
              className="h-auto opacity-90"
            />
            <span className="text-[42px] font-bold tracking-tight text-white drop-shadow-sm">FileDock</span>
          </div>

          <div className="space-y-5 text-white">
            <h1 className="text-[34px] leading-[42px] font-bold">Manage your files the best way</h1>
            <p className="text-[16px] leading-[24px] font-normal text-slate-300">
              This is a place where you can store all your documents securely and elegantly.
            </p>
          </div>
          <Image
            src="/assets/images/files.png"
            alt="Files"
            width={342}
            height={342}
            className="transition-transform duration-500 hover:rotate-2 hover:scale-105 opacity-80 mix-blend-screen"
          />
        </div>
      </section>

      {/* Auth Form Side */}
      <section className="flex flex-1 flex-col items-center justify-center p-6 lg:p-10 relative">
        <div className='mb-10 lg:hidden flex items-center gap-3'>
          <Image
            src="/assets/icons/logo-brand.svg"
            alt="Logo"
            width={52}
            height={52}
            className='h-auto w-[52px] drop-shadow-[0_0_12px_rgba(250,114,117,0.4)]'
          />
          <span className="text-[32px] font-bold tracking-tight text-white drop-shadow-sm">FileDock</span>
        </div>
        {children}
      </section>
    </div>
  )
}

export default Layout