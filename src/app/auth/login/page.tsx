"use client";

import { Button } from "@/common/components/button/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/common/components/form/form";
import { Input } from "@/common/components/input/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Image from "next/image";
import useLoginForm from "./hooks/useLoginForm";

export default function LoginPage() {
  const {
    form,
    onSubmit,
    errorMsg,
    isPending,
    showPassword,
    togglePasswordVisibility,
  } = useLoginForm();

  return (
    <main className="flex h-screen w-full items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-3/4 max-w-[450px] flex-col gap-2 rounded-xl bg-white p-5 shadow-md"
        >
          <div className="mb-3 flex flex-col items-center gap-3">
            <div className="-translate-y-[2px] relative aspect-[407/466] w-12">
              <Image
                src={"/assets/img/logo-app-text-vertical-red.png"}
                alt="App Logo"
                fill
              />
            </div>

            <h1 className="font-bold text-2xl">Login ke Akun Anda</h1>
          </div>
          {Boolean(errorMsg) && (
            <div className="mb-3 rounded-md bg-error-100 p-4 font-semibold text-error-500 text-sm">
              {errorMsg}
            </div>
          )}
          <FormField
            control={form.control}
            name="nip"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NIP</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan NIP" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Masukkan Password"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      {showPassword ? (
                        <EyeOffIcon className="h-5 w-5 text-gray-500" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button isLoading={isPending} className="mt-5 w-full">
            Masuk
          </Button>
        </form>
      </Form>
    </main>
  );
}
