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
import useVitalSignForm, {
  TVitalSignFormSchema,
} from "../../../hooks/useVitalSignForm";

interface IVitalSignForm {
  onSubmit: (_values: TVitalSignFormSchema) => void;
  isLoading: boolean;
}

export default function VitalSignForm({ onSubmit, isLoading }: IVitalSignForm) {
  const { form } = useVitalSignForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
                        {...field}
                        type="text"
                        inputMode="decimal"
                        pattern="[0-9.]*"
                        value={
                          field.value === undefined ||
                          String(field.value) === ""
                            ? ""
                            : field.value
                        }
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^0-9.]/g, "");
                          field.onChange(val);
                        }}
                        className="pr-8"
                      />
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-neutral-500">
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
                        {...field}
                        type="text"
                        inputMode="decimal"
                        pattern="[0-9.]*"
                        value={
                          field.value === undefined ||
                          String(field.value) === ""
                            ? ""
                            : field.value
                        }
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^0-9.]/g, "");
                          field.onChange(val);
                        }}
                        className="pr-8"
                      />
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-neutral-500">
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
                        {...field}
                        type="text"
                        inputMode="decimal"
                        pattern="[0-9.]*"
                        value={
                          field.value === undefined ||
                          String(field.value) === ""
                            ? ""
                            : field.value
                        }
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^0-9.]/g, "");
                          field.onChange(val);
                        }}
                        className="pr-8"
                      />
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-neutral-500">
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
                        {...field}
                        onChange={field.onChange}
                        className="pr-8"
                      />
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-neutral-500">
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
                        {...field}
                        type="text"
                        inputMode="decimal"
                        pattern="[0-9.]*"
                        value={
                          field.value === undefined ||
                          String(field.value) === ""
                            ? ""
                            : field.value
                        }
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^0-9.]/g, "");
                          field.onChange(val);
                        }}
                        className="pr-8"
                      />
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-neutral-500">
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
                        {...field}
                        type="text"
                        inputMode="decimal"
                        pattern="[0-9.]*"
                        value={
                          field.value === undefined ||
                          String(field.value) === ""
                            ? ""
                            : field.value
                        }
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^0-9.]/g, "");
                          field.onChange(val);
                        }}
                        className="pr-8"
                      />
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-neutral-500">
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
          <Button
            type="reset"
            variant={"outline"}
            isLoading={isLoading}
            onClick={() => form.reset()}
          >
            Reset
          </Button>
          <Button type="submit" isLoading={isLoading}>
            Simpan Data
          </Button>
        </div>
      </form>
    </Form>
  );
}
