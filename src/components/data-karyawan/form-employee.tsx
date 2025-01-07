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
import useEmployeeForm, {
  type TEmployeeFormSchema,
} from "@/hooks/data-karyawan/useEmployeeForm";
import { EMPLOYEE_ROLES } from "@/model/employee.model";
import { Button } from "../shared/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shared/select";

interface IFormEmployee {
  onSubmit: (values: TEmployeeFormSchema) => void;
  isLoading: boolean;
  defaultValues?: TEmployeeFormSchema;
}

export default function FormEmployee({
  defaultValues,
  onSubmit,
  isLoading = false,
}: IFormEmployee) {
  const form = useEmployeeForm(defaultValues);

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
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {EMPLOYEE_ROLES.map((val) => (
                    <SelectItem key={val} value={val}>
                      {val}
                    </SelectItem>
                  ))}
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
          <Button disabled={isLoading} type="submit">
            {isLoading ? "Loading..." : "Simpan"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
