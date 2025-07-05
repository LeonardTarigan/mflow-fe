import {
  CalendarIcon,
  InfoIcon,
  SearchIcon,
  TriangleAlertIcon,
  UserRoundCheckIcon,
  UserRoundPlusIcon,
} from "lucide-react";

import { TRoom } from "@/app/(dashboard)/data/ruangan/model/room.model";
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
import { IEmployee } from "@/common/models/employee.model";
import useAddQueueForm, {
  TAddQueueFormSchema,
} from "../../../hooks/useAddQueueForm";
import useAutofillPatientData from "../../../hooks/useAutofillPatientData";
import SearchGif from "@/common/components/gif/search-gif";
import LoadingSpinner from "@/common/components/loader/loading-spinner";

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
  const {
    data,
    isLoading: isPatientSearchLoading,
    search,
    setMrInput,
    mrInputRef,
    mrInput,
  } = useAutofillPatientData(form);

  const showSearchGif = (mrInput === "" || !data) && !isPatientSearchLoading;
  const showQueueForm = data && !isPatientSearchLoading && mrInput !== "";
  const isPatientFound =
    data?.data && !isPatientSearchLoading && mrInput !== "";
  const isPatientNotFound =
    data?.error && !isPatientSearchLoading && mrInput !== "";

  const nik = form.watch("nik");
  const name = form.watch("name");
  const gender = form.watch("gender");
  const birth_date = form.watch("birth_date");
  const address = form.watch("address");
  const occupation = form.watch("occupation");
  const phone_number = form.watch("phone_number");

  const enableQueueDetails =
    !!nik &&
    !!name &&
    !!gender &&
    !!birth_date &&
    !!address &&
    !!occupation &&
    !!phone_number;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 rounded-lg bg-white"
      >
        <div className="flex items-center gap-1">
          <Input
            placeholder="Cari No. Medical Record"
            ref={mrInputRef}
            value={mrInput}
            onChange={(e) => setMrInput(e.target.value)}
          />
          <Button
            type="button"
            disabled={isPatientSearchLoading}
            spinnerClassName="border-primary-500"
            onClick={() => {
              if (mrInputRef.current) {
                search(mrInputRef.current.value);
              }
            }}
          >
            <SearchIcon size={20} />
            <p>{isPatientSearchLoading ? "Mencari..." : "Cari"}</p>
          </Button>
        </div>
        {isPatientSearchLoading && (
          <div className="flex h-32 w-full items-center justify-center">
            <LoadingSpinner className="border-primary-500" />
          </div>
        )}
        {showSearchGif && (
          <div className="flex flex-col items-center justify-center pb-5">
            <SearchGif />
            <p className="text-center text-neutral-400">
              Cari No. MR pasien untuk membuat antrian
            </p>
          </div>
        )}
        {isPatientFound && (
          <div className="space-y-3 rounded-lg border border-success-400 bg-success-100 p-3">
            <div className="flex items-center gap-1 font-medium text-success-600">
              <UserRoundCheckIcon />
              <h3> Data Pasien Ditemukan</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-sm text-neutral-400">No. MR:</p>
                <p className="font-semibold">
                  {data.data?.medical_record_number}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-400">Nama:</p>
                <p className="font-semibold">{data.data?.name}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-400">Nama:</p>
                <p className="font-semibold">{data.data?.name}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-400">No. Telepon:</p>
                <p className="font-semibold">{data.data?.phone_number}</p>
              </div>
            </div>
          </div>
        )}
        {isPatientNotFound && (
          <div className="space-y-5">
            <div className="flex items-center gap-2 rounded-lg border border-warning-400 bg-warning-100 p-3 font-medium text-warning-600">
              <TriangleAlertIcon size={18} className="shrink-0" />
              <p>
                Pasien tidak ditemukan. Silakan daftar pasien baru untuk
                melanjutkan.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-1 font-semibold">
                <UserRoundPlusIcon size={18} />
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
                        <Input
                          placeholder="Masukkan alamat pasien"
                          {...field}
                        />
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
          </div>
        )}
        {showQueueForm && (
          <div>
            <div className="space-y-3 border-y py-5">
              <div className="flex items-center gap-1 font-semibold">
                <CalendarIcon size={18} />
                <h3>Detail Antrian</h3>
              </div>
              {!enableQueueDetails && (
                <div className="flex items-center gap-2 rounded-lg border border-secondary-400 bg-secondary-100 p-3 font-medium text-secondary-600">
                  <InfoIcon size={18} className="shrink-0" />
                  <p>
                    Silakan lengkapi data pasien terlebih dahulu untuk mengisi
                    detail antrian.
                  </p>
                </div>
              )}
              <FormField
                control={form.control}
                disabled={!enableQueueDetails}
                name="complaint"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Keluhan</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Masukkan keluhan pasien"
                        rows={3}
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="doctor_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dokter</FormLabel>
                      <FormControl>
                        <Select
                          disabled={!enableQueueDetails}
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
                          disabled={!enableQueueDetails}
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
              </div>
            </div>
            <div className="flex justify-end gap-1 pt-5">
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
        )}
      </form>
    </Form>
  );
}
