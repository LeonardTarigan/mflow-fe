import { Button } from "@/common/components/button/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/common/components/dialog/dialog";
import { PlusIcon } from "lucide-react";

import SearchGif from "@/common/components/gif/search-gif";
import LoadingSpinner from "@/common/components/loader/loading-spinner";
import SearchBar from "@/common/components/search/search-bar";
import EmptyDataState from "@/common/components/table/empty-data-state";
import highlightMatch from "@/common/helpers/highlightMatch";
import { cn } from "@/common/lib/utils";
import { ICareSessionTreatment } from "@/common/models/treatment.model";
import { useState } from "react";
import useDrugOrderForm from "../../../hooks/useDrugOrderForm";
import useQueryTreatments from "../../../hooks/useQueryTreatment";
import useTreatmentForm, {
  TSessionTreatmentFormSchema,
} from "../../../hooks/useTreatmentForm";
import TreatmentForm from "../form/add-treatment-form";

export default function AddTreatmentModal({
  onAdd,
}: {
  onAdd: (_treatment: ICareSessionTreatment) => void;
}) {
  const [open, setOpen] = useState(false);

  const form = useTreatmentForm();

  const { res, searchInput, handleOnSearchChange } = useQueryTreatments();

  const treatmentData = res.data?.data;

  const handleAdd = (session: ICareSessionTreatment) => {
    form.setValue("id", session.id);
    form.setValue("name", session.name);
    form.setValue("price", session.price);
  };

  const handleFormSubmit = (values: TSessionTreatmentFormSchema) => {
    onAdd(values);
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"} variant={"outline"}>
          <PlusIcon size={20} />
          <span>Tambah penanganan</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[75vh] min-w-[750px] overflow-auto">
        <DialogTitle className="text-xl font-bold">
          Tambah Penanganan
        </DialogTitle>
        <div className="flex gap-5">
          <div className="flex h-full shrink-0 basis-[50%] flex-col gap-5">
            <SearchBar
              onChange={handleOnSearchChange}
              onResetSearch={() => {}}
              placeholder="Cari Penanganan"
              containerClassName="basis-auto h-14"
            />
            <p>
              <span className="font-semibold">
                {treatmentData?.length || 0}
              </span>{" "}
              Hasil Pencarian
            </p>
            <div className="flex h-full grow flex-col gap-2">
              {treatmentData?.map(({ id, name, price }) => (
                <div
                  key={id}
                  className={`${cn("borderp-2 flex items-center justify-between gap-3 rounded-lg border px-3 py-2", form.watch("id") === id ? "border-secondary-500 bg-secondary-100" : "bg-white")}`}
                >
                  <p className="font-medium">
                    {highlightMatch(name, searchInput)}
                  </p>
                  <Button
                    onClick={() => handleAdd({ id, name, price, quantity: 0 })}
                    disabled={form.watch("id") === id}
                    size={"icon"}
                    variant={"outline"}
                  >
                    <PlusIcon />
                  </Button>
                </div>
              ))}

              {res.isLoading && (
                <div className="flex h-32 w-full items-center justify-center">
                  <LoadingSpinner className="border-primary-500" />
                </div>
              )}
              {treatmentData?.length === 0 && !res.isLoading && (
                <div className="flex w-full items-center justify-center">
                  <EmptyDataState />
                </div>
              )}
              {searchInput === "" &&
                !res.isLoading &&
                treatmentData?.length !== 0 && (
                  <div className="flex h-[80%] w-full flex-col items-center justify-center">
                    <SearchGif className="opacity-70" />
                    <p className="text-neutral-400">Cari nama penanganan</p>
                  </div>
                )}
            </div>
          </div>
          <div className="basis-[50%]">
            <TreatmentForm
              form={form}
              onSubmit={handleFormSubmit}
              isLoading={false}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
