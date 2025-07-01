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
import useTreatmentForm, {
  TTreatmentFormSchema,
} from "../../../hooks/useTreatmentForm";

interface ITreatmentForm {
  defaultValues?: TTreatmentFormSchema;
  isLoading: boolean;
  onSubmit: (_values: TTreatmentFormSchema) => void;
}

export default function TreatmentForm({
  defaultValues,
  onSubmit,
  isLoading,
}: ITreatmentForm) {
  const { form, formattedPrice, onPriceInputChange } =
    useTreatmentForm(defaultValues);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan nama penanganan" {...field} />
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
                  placeholder="Masukkan harga penanganan"
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
