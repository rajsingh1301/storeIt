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
    setIsLoading(false);
  };
  const handleResendOtp = async () => {
    await sendEmailOTP({ email });
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent
        className="
            space-y-4 max-w-[95%] sm:w-fit rounded-xl md:rounded-[30px] px-4 md:px-8 py-10 glassmorphism bg-[#1E293B]/95 outline-none border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
      >
        <AlertDialogHeader className="relative flex justify-center">
          <AlertDialogTitle className="text-[24px] font-bold text-center text-white drop-shadow-sm">
            Enter your OTP
            <Image
              src="/assets/icons/close-dark.svg"
              alt="close"
              width={20}
              height={20}
              onClick={() => setIsOpen(false)}
              className="absolute -right-1 -top-7 cursor-pointer sm:-right-2 sm:-top-4 filter invert opacity-60 hover:opacity-100 transition-opacity"
            />
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[14px] leading-[20px] font-semibold text-center text-slate-400">
            We've sent a code to{" "}
            <span className="pl-1 text-[#FA7275]">{email}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <InputOTP maxLength={6} value={password} onChange={setPassword}>
          <div className="w-full rounded-2xl bg-[#0B1121]/50 border border-white/5 shadow-[inset_0_2px_8px_rgba(0,0,0,0.5)] px-4 py-5 flex justify-center">
            <InputOTPGroup className="w-full flex gap-1 sm:gap-2 justify-between">
            <InputOTPSlot
              index={0}
              className="w-12 h-12 md:w-16 md:h-16 text-[32px] font-semibold rounded-xl border border-white/10 bg-white/5 shadow-[inset_0_2px_4px_rgba(255,255,255,0.05)] text-white flex justify-center items-center gap-5 focus-within:border-[#FA7275]"
            />
            <InputOTPSlot
              index={1}
              className="w-12 h-12 md:w-16 md:h-16 text-[32px] font-semibold rounded-xl border border-white/10 bg-white/5 shadow-[inset_0_2px_4px_rgba(255,255,255,0.05)] text-white flex justify-center items-center gap-5 focus-within:border-[#FA7275]"
            />
            <InputOTPSlot
              index={2}
              className="w-12 h-12 md:w-16 md:h-16 text-[32px] font-semibold rounded-xl border border-white/10 bg-white/5 shadow-[inset_0_2px_4px_rgba(255,255,255,0.05)] text-white flex justify-center items-center gap-5 focus-within:border-[#FA7275]"
            />
            <InputOTPSlot
              index={3}
              className="w-12 h-12 md:w-16 md:h-16 text-[32px] font-semibold rounded-xl border border-white/10 bg-white/5 shadow-[inset_0_2px_4px_rgba(255,255,255,0.05)] text-white flex justify-center items-center gap-5 focus-within:border-[#FA7275]"
            />
            <InputOTPSlot
              index={4}
              className="w-12 h-12 md:w-16 md:h-16 text-[32px] font-semibold rounded-xl border border-white/10 bg-white/5 shadow-[inset_0_2px_4px_rgba(255,255,255,0.05)] text-white flex justify-center items-center gap-5 focus-within:border-[#FA7275]"
            />
            <InputOTPSlot
              index={5}
              className="w-12 h-12 md:w-16 md:h-16 text-[32px] font-semibold rounded-xl border border-white/10 bg-white/5 shadow-[inset_0_2px_4px_rgba(255,255,255,0.05)] text-white flex justify-center items-center gap-5 focus-within:border-[#FA7275]"
            />
          </InputOTPGroup>
          </div>
        </InputOTP>
        <AlertDialogFooter className="w-full flex flex-col items-center mt-4">
          <div className="w-full">
            <AlertDialogAction className="w-full h-[60px] mb-3 rounded-full bg-[#FA7275] text-white font-bold text-[18px] flex items-center justify-center hover:bg-[#ffb4b6] hover:text-[#1a1f2c] transition-all mx-auto shadow-[0_0_20px_rgba(250,114,117,0.4)]" onClick={handleSubmit}>
              Submit
              {isLoading && (
                <Image
                  src="/assets/icons/loader.svg"
                  alt="loader"
                  width={24}
                  height={24}
                  className="ml-2 animate-spin filter brightness-0 invert"
                />
              )}
            </AlertDialogAction>
            <div className="w-full text-center mt-4 text-slate-400">
              Didn't receive the code?
              <Button type="button" variant="link" onClick={handleResendOtp} className="pl-1 text-[#FA7275] hover:text-[#ffb4b6]">
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
