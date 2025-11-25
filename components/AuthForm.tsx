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
    const user = await createAccount({
      fullName: values.fullName || "",
      email: values.email,
    });

    setAccountId(user.accountId);
  } catch (error: any) {
    console.error("Full error:", error);
    setErrorMessage(error?.message || "Something went wrong");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex max-h-[800px] w-full max-w-[580px] flex-col justify-center space-y-6 transition-all lg:h-full lg:space-y-8"
        >
          <h1 className="text-[34px] leading-[42px] font-bold text-center text-[#333F4E] md:text-left">
            {type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>

          {type === "sign-up" && (
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <div className="flex h-[78px] flex-col justify-center rounded-xl border border-[#333F4E] px-4 shadow-drop-1">
                    <FormLabel className="text-[#333F4E] pt-2 text-[14px] leading-5 font-normal w-full">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Your Full Name"
                        {...field}
                        className="border-none shadow-none p-0 outline-none focus:ring-0 placeholder:text-[#a7aeae] text-[#333F4E] body-2"
                      />
                    </FormControl>
                    <FormMessage className="text-red text-[16px] leading-[26px] font-normal ml-4" />
                  </div>
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="flex h-[78px] flex-col justify-center rounded-xl border border-[#F2F5F9] px-4 shadow-drop-1">
                  <FormLabel className="text-[#333F4E] pt-2 text-[14px] leading-5 font-normal w-full">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Your Email"
                      {...field}
                      className="border-none shadow-none p-0 outline-none focus:ring-0 placeholder:text-[#a7aeae] text-[#333F4E] body-2"
                    />
                  </FormControl>
                  <FormMessage className="text-red text-[16px] leading-[26px] font-normal ml-4" />
                </div>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="bg-[#FA7275] hover:bg-[#dd5d60] transition-all rounded-full h-[66px] inline-flex items-center justify-center"
            disabled={isLoading}
          >
            {type === "sign-in" ? "Sign In" : "Sign Up"}
            {isLoading && (
              <Image
                src="/assets/icons/loader.svg"
                alt="Loader"
                width={24}
                height={24}
                className="ml-2 animate-spin"
              />
            )}
          </Button>

          {errorMessage && (
            <p className="text-[14px] leading-[26px] font-normal mx-auto w-fit rounded-xl bg-error/5 px-8 py-4 text-center text-error">
              {errorMessage}
            </p>
          )}

          <div className="text-[14px] leading-[26px] font-normal flex justify-center">
            <p className="text-gray-800">
              {type === "sign-in"
                ? "Don't have an account? "
                : "Already have an account? "}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className=" text-[#FA7275] ml-1"
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