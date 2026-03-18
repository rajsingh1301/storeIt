"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import OTPModal from "./OtpModal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createAccount } from "@/lib/actions/user.action";
import { signInUser } from "@/lib/actions/user.action";

type FormType = "sign-in" | "sign-up";

const authFormSchema = (formType: FormType) => {
  return z.object({
    email: z.string().email(),
    fullName:
      formType === "sign-up"
        ? z.string().min(2).max(50)
        : z.string().optional(),
  });
};

interface AuthFormProps {
  type: FormType;
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [accountId, setAccountId] = useState("");

  const formSchema = authFormSchema(type);
  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      fullName: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const user =
        type === "sign-up" ? await createAccount({
          fullName: values.fullName || "",
          email: values.email,
        }) : await signInUser({ email: values.email });

      setAccountId(user.accountId);
    } catch (error: any) {
      console.error("Full auth error:", error);
      setErrorMessage(error?.response?.message || error?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
className="flex flex-col w-full max-w-[520px] gap-10 sm:gap-12 p-10 sm:p-16 rounded-[32px] bg-white/[0.02] backdrop-blur-[40px] border border-white/[0.08] shadow-[0_0_30px_rgba(250,114,117,0.1),inset_0_1px_1px_rgba(255,255,255,0.05)]"        >
<div className="flex flex-col gap-3">
              <h1 className="text-[36px] sm:text-[40px] font-bold text-white text-center tracking-tight antialiased">
              {type === "sign-in" ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-[15px] text-slate-400 text-center font-normal antialiased">
              {type === "sign-in" ? "Sign in to access your FileDock." : "Sign up and get securely organized."}
            </p>
          </div>

          {type === "sign-up" && (
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col">
                    <FormLabel className="text-slate-400 text-[13px] mb-2 font-medium uppercase tracking-wider">
                      FULL NAME
                    </FormLabel>
                    <FormControl>
                      <div className="relative flex items-center w-full rounded-[12px] bg-[#161C2D] border border-[#2A3449] shadow-[inset_0_2px_6px_rgba(0,0,0,0.2)] focus-within:border-[#FA7275] focus-within:shadow-[0_0_12px_rgba(250,114,117,0.3),inset_0_2px_6px_rgba(0,0,0,0.2)] transition-all h-[52px]">
                        <Input
                          placeholder="Enter your full name"
                          {...field}
                          className="w-full h-full border-none shadow-none bg-transparent px-[16px] outline-none focus-visible:ring-0 text-white font-medium text-[15px] placeholder:text-slate-500 placeholder:font-normal caret-white rounded-[12px]"
                        />
                      </div>
                    </FormControl>
                  </div>
                  <FormMessage className="text-[#FA7275] text-[13px] font-medium ml-1 mt-1 drop-shadow-sm" />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className={type === "sign-up" ? "mt-6" : ""}>
                <div className="flex flex-col">
                  <FormLabel className="text-slate-400 text-[13px] mb-2 font-medium uppercase tracking-wider">
                    EMAIL
                  </FormLabel>
                  <FormControl>
                    <div className="relative flex items-center w-full rounded-[12px] bg-[#161C2D] border border-[#2A3449] shadow-[inset_0_2px_6px_rgba(0,0,0,0.2)] focus-within:border-[#FA7275] focus-within:shadow-[0_0_12px_rgba(250,114,117,0.3),inset_0_2px_6px_rgba(0,0,0,0.2)] transition-all h-[52px]">
                      <Input
                        placeholder="Enter your email"
                        {...field}
                        className="w-full h-full border-none shadow-none bg-transparent px-[16px] outline-none focus-visible:ring-0 text-white font-medium text-[15px] placeholder:text-slate-500 placeholder:font-normal caret-white rounded-[12px]"
                      />
                    </div>
                  </FormControl>
                </div>
                <FormMessage className="text-[#FA7275] text-[13px] font-medium ml-1 mt-1 drop-shadow-sm" />
              </FormItem>
            )}
          />

         <div className="flex flex-col gap-3 p-5">
  <Button
    type="submit"
    disabled={isLoading}
    className="w-full h-[52px] rounded-xl font-semibold text-[16px] 
    bg-gradient-to-r from-[#FF6B6B] to-[#FA7275] 
    hover:from-[#ff8689] hover:to-[#ff8689] 
    text-white transition-all duration-300 
    shadow-[0_6px_20px_rgba(250,114,117,0.35)] 
    flex items-center justify-center gap-2"
  >
    {type === "sign-in" ? "Sign In" : "Sign Up"}

    {isLoading && (
      <Image
        src="/assets/icons/loader.svg"
        alt="Loader"
        width={20}
        height={20}
        className="animate-spin"
      />
    )}
  </Button>
</div>
          {errorMessage && (
            <p className="text-[14px] leading-tight font-medium mx-auto w-full rounded-[10px] bg-red-500/10 border border-red-500/20 px-6 py-4 text-center text-[#FA7275] mt-6">
              {errorMessage}
            </p>
          )}

<div className="text-[14px] font-medium flex justify-center pt-6 border-t border-white/[0.05]">            <p className="text-slate-400">
              {type === "sign-in"
                ? "Don't have an account? "
                : "Already have an account? "}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="text-[#FA7275]/90 ml-1.5 hover:text-[#FA7275] transition-colors"
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </div>
        </form>
      </Form>

      {/* OTP Verification */}
      {accountId && (
        <OTPModal
          email={form.getValues("email")}
          accountId={accountId}
        />
      )}
    </>
  );
};

export default AuthForm;