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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/components/select/select";
import { EMPLOYEE_ROLES } from "@/common/models/employee.model";
import useEmployeeForm, {
  TEmployeeFormSchema,
} from "../../../hooks/useEmployeeForm";

interface IEmployeeForm {
  onSubmit: (_values: TEmployeeFormSchema) => void;
  isLoading: boolean;
  defaultValues?: TEmployeeFormSchema;
}

export default function EmployeeForm({
  defaultValues,
  onSubmit,
  isLoading = false,
}: IEmployeeForm) {
  const form = useEmployeeForm(defaultValues);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="username"
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Masukkan email karyawan"
                  {...field}
                  disabled={Boolean(defaultValues)}
                />
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
