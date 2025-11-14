import React from "react";
import Image from "next/image";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
import { useState } from "react";
import { log } from "console";
const OTPModal = ({accountId , email, }:{
    accountId:string ;
    email : string;
}) => {
    const [isOpen , setIsOpen] = useState(true);
    const [password, setPassword] = useState("");
    const [isLoading , setIsLoading] = useState(false);
    const handleSubmit =  async(e: React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault();
        setIsLoading(true); 

        try{
            //call api to verify otp 
        } catch(error){
            console.log("Failed to verify otp", error);
            
        }
    }
    const handleResendOtp = async () =>{

    }
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
    <AlertDialogContent
  className="
    fixed left-1/2 top-1/2 
    -translate-x-1/2 -translate-y-1/2
    flex flex-col items-center justify-center text-center
    space-y-4 max-w-[95%] sm:w-fit
    rounded-xl md:rounded-[30px]
    px-4 md:px-8 py-10
    bg-white
  "className=""
>
      <AlertDialogHeader className="relative flex justify-center">
        <AlertDialogTitle className="text-[24px] leading-[36px] font-bold text-center text-black">Enter your OTP 
            <Image src = "/assets/icons/close-dark.svg" 
            alt ="close"
            width ={20} height={20} onClick={() => setIsOpen(false)} className="absolute -right-1 -top-7 cursor-pointer sm:-right-2 sm:-top-4  !important;" />
        </AlertDialogTitle>
        <AlertDialogDescription className="text-[14px] leading-[20px] font-semibold text-center  text-[#A3B2C7]">
          We've sent a code to <span className="pl-1 text-[#FA7275]">{email}</span>
        </AlertDialogDescription >
      </AlertDialogHeader>
      <InputOTP maxLength={6} value={password} onChange={setPassword}>
  <InputOTPGroup className="w-full flex gap-1 sm:gap-2 justify-between !important;">
    <InputOTPSlot index={0} className="text-[40px] font-medium rounded-xl ring-[#A3B2C7] shadow-drop-1 text-brand-100 justify-center flex border-2 border-light-300 size-12 md:size-16 gap-5 !important;"/>
    <InputOTPSlot index={1} className="text-[40px] font-medium rounded-xl ring-[#A3B2C7] shadow-drop-1 text-brand-100 justify-center flex border-2 border-light-300 size-12 md:size-16 gap-5 !important;"/>
    <InputOTPSlot index={2} className="text-[40px] font-medium rounded-xl ring-[#A3B2C7] shadow-drop-1 text-brand-100 justify-center flex border-2 border-light-300 size-12 md:size-16 gap-5 !important;"/>
    <InputOTPSlot index={3} className="text-[40px] font-medium rounded-xl ring-[#A3B2C7] shadow-drop-1 text-brand-100 justify-center flex border-2 border-light-300 size-12 md:size-16 gap-5 !important;"/>
    <InputOTPSlot index={4} className="text-[40px] font-medium rounded-xl ring-[#A3B2C7] shadow-drop-1 text-brand-100 justify-center flex border-2 border-light-300 size-12 md:size-16 gap-5 !important;"/>
    <InputOTPSlot index={5} className="text-[40px] font-medium rounded-xl ring-[#A3B2C7] shadow-drop-1 text-brand-100 justify-center flex border-2 border-light-300 size-12 md:size-16 gap-5 !important;"/>
  </InputOTPGroup>
</InputOTP>
      <AlertDialogFooter className="w-full flex justify-center gap-4 flex-row items-center mt-4">
        <AlertDialogCancel className="px-6 py-3 rounded-lg bg-white border text-black hover:bg-gray-50 w-auto">
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction className="px-6 py-3 rounded-lg bg-black text-white hover:bg-gray-800 w-auto">
          Continue
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}

export default OTPModal 