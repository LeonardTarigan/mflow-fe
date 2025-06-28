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
import { Textarea } from "@/common/components/textarea/textarea";
import { UseFormReturn } from "react-hook-form";
import { TDrugOrderFormSchema } from "../../../hooks/useDrugOrderForm";

interface IDrugForm {
  onSubmit: (_values: TDrugOrderFormSchema) => void;
  isLoading: boolean;
  form: UseFormReturn<TDrugOrderFormSchema>;
}

export default function DrugOrderForm({
  onSubmit,
  isLoading,
  form,
}: IDrugForm) {
  const selectedDrugName = form.watch("name");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormItem>
          <FormLabel>Nama Obat</FormLabel>
          <FormControl>
            {selectedDrugName ? (
              <p className="font-bold">{selectedDrugName}</p>
            ) : (
              <p className="italic text-neutral-400">
                Belum ada obat yang ditambahkan
              </p>
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormField
          control={form.control}
          name="quantity"
          disabled={form.watch("id") === 0}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kuantitas</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Masukkan kuantitas obat"
                    {...field}
                    className="pr-12"
                  />
                  <span className="absolute inset-y-0 right-0 flex items-center rounded-r-lg bg-neutral-200 px-3 text-sm font-medium text-neutral-500">
                    {form.watch("unit") || "Unit"}
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dose"
          disabled={form.watch("id") === 0}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dosis</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Masukkan dosis obat"
                  rows={5}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-1 pt-5">
          <Button
            disabled={isLoading}
            variant={"outline"}
            onClick={() => form.reset()}
          >
            Reset
          </Button>
          <Button isLoading={isLoading} type="submit">
            Simpan
          </Button>
        </div>
      </form>
    </Form>
  );
}
