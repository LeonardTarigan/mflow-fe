import useVitalSignForm from "@/hooks/antrian/useVitalSignForm";
import type { Dispatch, SetStateAction } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../shared/form";
import { Input } from "../shared/input";
import { Button } from "../shared/button";

interface IFormVitalSign {
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

export default function FormVitalSign({ onOpenChange }: IFormVitalSign) {
  const { form, onSubmit } = useVitalSignForm(onOpenChange);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-5 grid grid-cols-2 gap-2 border-y py-5 text-sm">
          <div>
            <h4 className="text-xs">Kode Antrian:</h4>
            <p className="font-semibold">U2-10</p>
          </div>
          <div>
            <h4 className="text-xs">Pasien:</h4>
            <p className="font-semibold">Johan Sutardjo</p>
          </div>
          <div>
            <h4 className="text-xs">Dokter:</h4>
            <p className="font-semibold">Dr. Hendra Wijaya</p>
          </div>

          <div>
            <h4 className="text-xs">Waktu Registrasi:</h4>
            <p className="font-semibold">16 Okt 2024, 13:34</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tinggi Badan</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Masukkan tinggi badan pasien"
                        {...field}
                        className="pr-8"
                      />
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-500 text-sm">
                        cm
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Berat Badan</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Masukkan berat badan pasien"
                        {...field}
                        className="pr-8"
                      />
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-500 text-sm">
                        kg
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="temperature"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Suhu Badan</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Masukkan suhu badan pasien"
                        {...field}
                        className="pr-8"
                      />
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-500 text-sm">
                        °C
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="blood_pressure"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tekanan Darah</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Masukkan tekanan darah pasien"
                        {...field}
                        className="pr-8"
                      />
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-500 text-sm">
                        mmHg
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pulse"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Denyut Jantung</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Masukkan denyut jantung pasien"
                        {...field}
                        className="pr-8"
                      />
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-500 text-sm">
                        bpm
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="respitory_rate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frekuensi Pernafasan</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Masukkan pernafasan pasien"
                        {...field}
                        className="pr-8"
                      />
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-500 text-sm">
                        bpm
                      </span>
                    </div>
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
          <Button type="submit">Simpan Data</Button>
        </div>
      </form>
    </Form>
  );
}
