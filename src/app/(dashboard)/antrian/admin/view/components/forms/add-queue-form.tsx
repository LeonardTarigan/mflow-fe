import { SearchIcon } from "lucide-react";

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
import { Textarea } from "@/common/components/textarea/textarea";
import useAddQueueForm, {
  TAddQueueFormSchema,
} from "../../../hooks/useAddQueueForm";
import { TRoom } from "@/app/(dashboard)/data/ruangan/model/room.model";
import { IEmployee } from "@/common/models/employee.model";
import useAutofillPatientData from "../../../hooks/useAutofillPatientData";

interface IFormAddQueue {
  onSubmit: (_values: TAddQueueFormSchema) => void;
  defaultValues?: TAddQueueFormSchema;
  isLoading: boolean;
  roomList: TRoom[] | undefined;
  doctorList: IEmployee[] | undefined;
}

export default function AddQueueForm({
  onSubmit,
  defaultValues,
  isLoading,
  roomList,
  doctorList,
}: IFormAddQueue) {
  const { form } = useAddQueueForm(defaultValues);
  const { search, isFetching, setMrInput, mrInputRef, mrInput } =
    useAutofillPatientData(form);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 rounded-lg bg-white"
      >
        <div className="mb-5 grid gap-2 sm:grid-cols-2">
          <div className="flex items-center gap-1">
            <Input
              placeholder="Cari No. Medical Record"
              ref={mrInputRef}
              value={mrInput}
              onChange={(e) => setMrInput(e.target.value)}
            />
            <Button
              type="button"
              size={"icon"}
              variant={"outline"}
              isLoading={isFetching}
              spinnerClassName="border-primary-500"
              onClick={() => {
                if (mrInputRef.current) {
                  search(mrInputRef.current.value);
                }
              }}
            >
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
                    <Input placeholder="Masukkan pekerjaan pasien" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
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
                    <Textarea
                      placeholder="Masukkan keluhan pasien"
                      rows={5}
                      className="resize-none"
                      {...field}
                    />
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
                          {doctorList?.map(({ id, username }) => (
                            <SelectItem key={id} value={id.toString()}>
                              {username}
                            </SelectItem>
                          ))}
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
              name="room_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Poli</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(val) => field.onChange(Number(val))}
                      defaultValue={field.value?.toString()}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Poli" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {roomList?.map(({ id, name }) => (
                            <SelectItem key={id} value={id.toString()}>
                              {name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-1 pt-10">
              <Button
                type="reset"
                variant={"outline"}
                onClick={() => form.reset()}
              >
                Reset
              </Button>
              <Button isLoading={isLoading} type="submit">
                Buat Antrian
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
