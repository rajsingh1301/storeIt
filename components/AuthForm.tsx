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
          className="flex flex-col w-full max-w-[480px] space-y-6 transition-all glassmorphism p-8 sm:p-10 rounded-[32px] border border-white/10"
        >
          <div className="flex flex-col gap-2 mb-2">
            <h1 className="text-[30px] sm:text-[34px] leading-tight font-bold text-white text-center sm:text-left tracking-tight drop-shadow-sm">
              {type === "sign-in" ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-[15px] text-slate-400 text-center sm:text-left">
              {type === "sign-in" ? "Sign in to access your FileDock." : "Sign up and get securely organized."}
            </p>
          </div>

          {type === "sign-up" && (
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <div className="flex h-[76px] flex-col justify-center rounded-2xl border border-white/5 bg-white/5 px-4 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] focus-within:border-white/20 focus-within:bg-white/10 transition-colors">
                    <FormLabel className="text-slate-400 pt-1 text-[13px] leading-5 font-semibold w-full uppercase tracking-wider">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
                        {...field}
                        className="border-none shadow-none px-0 py-2 h-auto outline-none focus:ring-0 placeholder:text-slate-600 text-white font-medium text-[16px] bg-transparent"
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-[#FA7275] text-[13px] font-medium ml-2 mt-1 drop-shadow-sm" />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="flex h-[76px] flex-col justify-center rounded-2xl border border-white/5 bg-white/5 px-4 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] focus-within:border-white/20 focus-within:bg-white/10 transition-colors">
                  <FormLabel className="text-slate-400 pt-1 text-[13px] leading-5 font-semibold w-full uppercase tracking-wider">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      {...field}
                      className="border-none shadow-none px-0 py-2 h-auto outline-none focus:ring-0 placeholder:text-slate-600 text-white font-medium text-[16px] bg-transparent"
                    />
                  </FormControl>
                </div>
                <FormMessage className="text-[#FA7275] text-[13px] font-medium ml-2 mt-1 drop-shadow-sm" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="bg-[#FA7275] hover:bg-[#ffb4b6] hover:text-[#1a1f2c] text-white transition-all duration-300 rounded-full h-[60px] inline-flex items-center justify-center font-bold text-[16px] shadow-[0_0_24px_rgba(250,114,117,0.4)] hover:shadow-[0_0_32px_rgba(250,114,117,0.6)] mt-2"
            disabled={isLoading}
          >
            {type === "sign-in" ? "Sign In" : "Sign Up"}
            {isLoading && (
              <Image
                src="/assets/icons/loader.svg"
                alt="Loader"
                width={24}
                height={24}
                className="ml-2 animate-spin filter brightness-0 invert"
              />
            )}
          </Button>

          {errorMessage && (
            <p className="text-[14px] leading-tight font-medium mx-auto w-full rounded-2xl bg-red-500/10 border border-red-500/20 px-6 py-4 text-center text-[#FA7275] shadow-[inset_0_0_12px_rgba(250,114,117,0.1)]">
              {errorMessage}
            </p>
          )}

          <div className="text-[14px] font-medium flex justify-center mt-2">
            <p className="text-slate-400">
              {type === "sign-in"
                ? "Don't have an account? "
                : "Already have an account? "}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="text-[#FA7275] ml-1.5 hover:text-[#ffb4b6] transition-colors drop-shadow-[0_0_8px_rgba(250,114,117,0.4)]"
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