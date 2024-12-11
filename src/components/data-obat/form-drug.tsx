"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shared/form";
import { Input } from "@/components/shared/input";
import { Button } from "../shared/button";
import useDrugForm, {
  type TDrugFormSchema,
} from "@/hooks/data-obat/useDrugForm";
import type { Dispatch, SetStateAction } from "react";

interface IFormDrug {
  defaultValues?: TDrugFormSchema;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

export default function FormDrug({ defaultValues, onOpenChange }: IFormDrug) {
  const { form, formattedPrice, onSubmit, onPriceInputChange } = useDrugForm(
    onOpenChange,
    defaultValues,
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 ">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan nama obat" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kategori</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan kategori obat" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="unit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan unit obat" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Harga</FormLabel>
              <FormControl>
                <Input
                  placeholder="Masukkan harga obat"
                  value={formattedPrice}
                  onChange={(e) => onPriceInputChange(e, field)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-1 pt-5">
          <Button variant={"outline"} onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit">Simpan</Button>
        </div>
      </form>
    </Form>
  );
}
