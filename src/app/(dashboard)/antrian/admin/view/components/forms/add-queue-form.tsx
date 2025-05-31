import { SearchIcon } from "lucide-react";

import type { Dispatch, SetStateAction } from "react";
import useAddQueueForm, {
  TAddQueueFormSchema,
} from "../../../hooks/useAddQueueForm";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/common/components/form/form";
import { Input } from "@/common/components/input/input";
import { Button } from "@/common/components/button/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/components/select/select";

interface IFormAddQueue {
  defaultValues?: TAddQueueFormSchema;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

export default function AddQueueForm({
  onOpenChange,
  defaultValues,
}: IFormAddQueue) {
  const { form, onSubmit } = useAddQueueForm(onOpenChange, defaultValues);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 rounded-lg bg-white"
      >
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="flex items-center gap-1">
            <Input placeholder="Cari No. Medical Record" />
            <Button type="button" size={"icon"} variant={"outline"}>
              <SearchIcon size={20} />
            </Button>
          </div>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="nik"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NIK</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan NIK pasien" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                <FormItem>
                  <FormLabel>Tanggal Lahir</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan tanggal lahir pasien"
                      {...field}
                    />
                  </FormControl>
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
          </div>
          <div className="space-y-2">
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
                    <div className="flex items-center">
                      <span className="select-none rounded-l border border-r-0 border-input bg-muted px-2 py-2 text-sm text-muted-foreground">
                        +62
                      </span>
                      <Input
                        {...field}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        className="rounded-l-none"
                        placeholder="8xxxxxxxxxx"
                        value={field.value}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "");
                          field.onChange(val);
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="complaint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Keluhan</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan keluhan pasien" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="doctor_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dokter</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Dokter Jaga" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="1">
                            Dr. Heri Tamba - Poli Umum (08:00 - 14:00)
                          </SelectItem>
                          <SelectItem value="2">
                            Dr. Niko - Poli Gigi (07:00 - 16:00)
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex justify-end gap-1 pt-5">
          <Button type="reset" variant={"outline"}>
            Reset
          </Button>
          <Button type="submit">Buat Antrian</Button>
        </div>
      </form>
    </Form>
  );
}
