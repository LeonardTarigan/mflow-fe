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
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/components/select/select";
import { UserCirclePlusIcon } from "@phosphor-icons/react";
import { UseFormReturn } from "react-hook-form";
import { TAddPatientFormSchema } from "../../../hooks/useAddPatientForm";

export default function PatientRegistrationForm({
  form,
  onSubmit,
  isLoading = false,
}: {
  form: UseFormReturn<TAddPatientFormSchema>;
  onSubmit: (_values: TAddPatientFormSchema) => void;
  isLoading?: boolean;
}) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mt-2 space-y-5">
          <div className="space-y-3">
            <div className="flex items-center gap-1 font-semibold">
              <UserCirclePlusIcon size={24} />
              <h3>Registrasi Pasien Baru</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
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
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jenis Kelamin</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Jenis Kelamin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="MALE">Laki-laki</SelectItem>
                            <SelectItem value="FEMALE">Perempuan</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
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
              <FormField
                control={form.control}
                name="occupation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pekerjaan</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukkan pekerjaan pasien"
                        {...field}
                      />
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
            </div>
          </div>
          <div className="flex justify-end gap-1">
            <Button
              type="reset"
              variant={"outline"}
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button isLoading={isLoading} type="submit">
              Registrasi
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
