import { Button } from "@/common/components/button/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/common/components/form/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/components/select/select";
import { Textarea } from "@/common/components/textarea/textarea";
import { CalendarPlusIcon, InfoIcon } from "@phosphor-icons/react";
import { UseFormReturn } from "react-hook-form";
import { TAddQueueFormSchema } from "../../../hooks/useAddQueueForm";
import useQueryDoctors from "../../../hooks/useQueryDoctor";
import useQueryRooms from "../../../hooks/useQueryRoom";

interface IFormAddQueue {
  onSubmit: (_values: TAddQueueFormSchema) => void;
  defaultValues?: TAddQueueFormSchema;
  isLoading: boolean;
  form: UseFormReturn<TAddQueueFormSchema>;
}

export default function AddQueueForm({
  onSubmit,
  isLoading,
  form,
}: IFormAddQueue) {
  const { res: doctorData } = useQueryDoctors();
  const { res: roomData } = useQueryRooms();

  const doctorList = doctorData.data?.data;
  const roomList = roomData.data?.data;

  const enableQueueDetails = form.watch("patient_id");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 rounded-lg bg-white"
      >
        <div>
          <div className="space-y-3 border-y py-5">
            <div className="flex items-center gap-1 font-semibold">
              <CalendarPlusIcon size={24} />
              <h3>Detail Antrian</h3>
            </div>
            {!enableQueueDetails && (
              <div className="flex items-center gap-2 rounded-lg border border-secondary-400 bg-secondary-100 p-3 font-medium text-secondary-600">
                <InfoIcon size={24} />
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
            <Button
              disabled={!enableQueueDetails}
              isLoading={isLoading}
              type="submit"
            >
              Buat Antrian
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
