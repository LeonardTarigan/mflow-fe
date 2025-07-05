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
import { UseFormReturn } from "react-hook-form";
import { TSessionTreatmentFormSchema } from "../../../hooks/useTreatmentForm";

interface ITreatmentForm {
  onSubmit: (_values: TSessionTreatmentFormSchema) => void;
  isLoading: boolean;
  form: UseFormReturn<TSessionTreatmentFormSchema>;
}

export default function TreatmentForm({
  onSubmit,
  isLoading,
  form,
}: ITreatmentForm) {
  const selectedDrugName = form.watch("name");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormItem>
          <FormLabel>Nama</FormLabel>
          <FormControl>
            {selectedDrugName ? (
              <p className="font-bold">{selectedDrugName}</p>
            ) : (
              <p className="italic text-neutral-400">
                Belum ada penanganan yang ditambahkan
              </p>
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormField
          control={form.control}
          name="quantity"
          disabled={form.watch("name") === ""}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kuantitas</FormLabel>
              <FormControl>
                <Input
                  placeholder="Masukkan kuantitas obat"
                  {...field}
                  className="pr-12"
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
