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
import useDrugForm, { TDrugFormSchema } from "../../../hooks/useDrugForm";

interface IDrugForm {
  onSubmit: (_values: TDrugFormSchema) => void;
  isLoading: boolean;
  defaultValues?: TDrugFormSchema;
}

export default function DrugForm({
  defaultValues,
  onSubmit,
  isLoading,
}: IDrugForm) {
  const { form, formattedPrice, onPriceInputChange } =
    useDrugForm(defaultValues);

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
