import React from "react";
import Image from "next/image";
import { verifySecret,sendEmailOTP } from "@/lib/actions/user.action";

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
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import { log } from "console";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
const OTPModal = ({
  accountId,
  email,
}: {
  accountId: string;
  email: string;
}) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(true);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {

      //call api to verify otp
      const secretId = await verifySecret({ accountId, password });
      if(secretId)router.push("/")
    } catch (error) {
      console.log("Failed to verify otp", error);
    }
  };
  const handleResendOtp = async () => {
    await sendEmailOTP({ email });
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent
        className="
            space-y-4 max-w-[95%] sm:w-fit rounded-xl md:rounded-[30px] px-4 md:px-8 py-10 bg-white outline-none"
      >
        <AlertDialogHeader className="relative flex justify-center">
          <AlertDialogTitle className="text-[24px]  font-bold text-center text-black">
            Enter your OTP
            <Image
              src="/assets/icons/close-dark.svg"
              alt="close"
              width={20}
              height={20}
              onClick={() => setIsOpen(false)}
              className="absolute -right-1 -top-7 cursor-pointer sm:-right-2 sm:-top-4  "
            />
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[14px] leading-[20px] font-semibold text-center  text-[#A3B2C7]">
            We've sent a code to{" "}
            <span className="pl-1 text-[#FA7275]">{email}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <InputOTP maxLength={6} value={password} onChange={setPassword}>
          <div className="w-full rounded-2xl bg-[#f6f6f6] shadow-[0_8px_24px_rgba(0,0,0,0.08)] px-4 py-5 flex justify-center">
            <InputOTPGroup className="w-full flex gap-1 sm:gap-2 justify-between">
            <InputOTPSlot
              index={0}
              className="w-12 h-12 md:w-16 md:h-16 text-[32px] font-semibold rounded-xl border-2 border-[#F2F5F9] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] text-[#EA6365] flex justify-center items-center gap-5"
            />
            <InputOTPSlot
              index={1}
              className="w-12 h-12 md:w-16 md:h-16 text-[32px] font-semibold rounded-xl border-2 border-[#F2F5F9] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] text-[#EA6365]  flex justify-center items-center gap-5"
            />
            <InputOTPSlot
              index={2}
              className="w-12 h-12 md:w-16 md:h-16 text-[32px] font-semibold rounded-xl border-2 border-[#F2F5F9] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] text-[#EA6365] flex justify-center items-center gap-5"
            />
            <InputOTPSlot
              index={3}
              className="w-12 h-12 md:w-16 md:h-16 text-[32px] font-semibold rounded-xl border-2 border-[#F2F5F9] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] text-[#EA6365] flex justify-center items-center gap-5"
            />
            <InputOTPSlot
              index={4}
              className="w-12 h-12 md:w-16 md:h-16 text-[32px] font-semibold rounded-xl border-2 border-[#F2F5F9] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] text-[#EA6365] flex justify-center items-center gap-5"
            />
            <InputOTPSlot
              index={5}
              className="w-12 h-12 md:w-16 md:h-16 text-[32px] font-semibold rounded-xl border-2 border-[#F2F5F9] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] text-[#EA6365] flex justify-center items-center gap-5"
            />
          </InputOTPGroup>
          </div>
        </InputOTP>
        <AlertDialogFooter className="w-full flex flex-col items-center mt-4">
          <div className="w-full">
            <AlertDialogAction className="w-full py-4 mb-3 rounded-full bg-[#EA6365] text-white font-semibold text-[18px] flex items-center justify-center shadow-[inset_0_-4px_8px_rgba(0,0,0,0.1)] hover:bg-[#e05a5d] transition-all mx-auto" onClick={handleSubmit}>
              Submit
              {isLoading && (
                <Image
                  src="/assets/icons/loader.svg"
                  alt="loader"
                  width={24}
                  height={24}
                  className="ml-2 animate-spin"
                />
              )}
            </AlertDialogAction>
            <div className="w-full text-center mt-4">
              Didn't receive the code?
              <Button type="button" variant = "link" onClick={handleResendOtp} className="pl-1 text-[#EA6365]">
                Resend OTP
              </Button>
            </div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OTPModal;
