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
import type { Dispatch, SetStateAction } from "react";
import usePatientForm, {
  type TPatientFormSchema,
} from "@/hooks/data-pasien/usePatientForm";
import { Popover, PopoverContent, PopoverTrigger } from "../shared/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "../shared/calendar";
import { id } from "date-fns/locale";

interface IFormPatient {
  defaultValues?: TPatientFormSchema;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

export default function FormPatient({
  defaultValues,
  onOpenChange,
}: IFormPatient) {
  const { form, onSubmit } = usePatientForm(onOpenChange, defaultValues);

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
                <Input placeholder="Masukkan nama pasien" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birth_date"
          render={({ field }) => (
            <FormItem className="flex flex-col pt-1">
              <FormLabel>Tanggal lahir</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", { locale: id })
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => field.onChange(date?.toISOString())}
                    locale={id}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alamat</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan alamat pasien" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="occupation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pekerjaan</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan pekerjaan pasien" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nomor Telepon</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan nomor telepon" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan email" {...field} />
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
