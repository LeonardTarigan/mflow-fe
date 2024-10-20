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
import useEmployeeForm, {
  type TEmployeeFormSchema,
} from "@/hooks/data-karyawan/useEmployeeForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shared/select";

interface IFormEmployee {
  defaultValues?: TEmployeeFormSchema;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

export default function FormEmployee({
  defaultValues,
  onOpenChange,
}: IFormEmployee) {
  const { form, onSubmit } = useEmployeeForm(onOpenChange, defaultValues);

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
                <Input placeholder="Masukkan nama karyawan" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                  <SelectItem value="doctor">Dokter</SelectItem>
                </SelectContent>
              </Select>

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
                <Input placeholder="Masukkan email karyawan" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
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
