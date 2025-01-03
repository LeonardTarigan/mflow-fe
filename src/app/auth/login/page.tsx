"use client";

import { Button } from "@/components/shared/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shared/form";
import { Input } from "@/components/shared/input";
import useLoginForm from "@/hooks/auth/useLoginForm";
import Image from "next/image";

export default function LoginPage() {
  const { form, onSubmit, showError, isPending } = useLoginForm();

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
          {showError && (
            <div className="mb-3 rounded-md bg-error-100 p-4 font-semibold text-error-500 text-sm">
              NIP atau password salah!
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
                  <Input
                    type="password"
                    placeholder="Masukkan Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending} className="mt-5 w-full">
            {isPending ? "Loading..." : "Masuk"}
          </Button>
        </form>
      </Form>
    </main>
  );
}
