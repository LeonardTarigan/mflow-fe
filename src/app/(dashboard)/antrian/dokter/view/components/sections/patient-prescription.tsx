import { Button } from "@/common/components/button/button";
import { IDrugOrder } from "@/common/models/drug.model";
import { PrescriptionIcon, TrashIcon } from "@phosphor-icons/react";
import AddDrugOrderModal from "../modals/add-drug-order-modal";
import useDeleteSessionDrugOrder from "../../../hooks/useDeleteSessionDrugOrder";

export default function PatientPrescription({
  careSessionId,
  drugOrders,
}: {
  careSessionId: number;
  drugOrders: IDrugOrder[];
}) {
  const { mutateAsync, isPending } = useDeleteSessionDrugOrder();

  return (
    <div className="space-y-3 py-5">
      <div className="mb-3 flex items-center gap-2">
        <PrescriptionIcon size={24} weight="fill" />
        <h3 className="text-xl font-bold">Resep Obat</h3>
      </div>
      <div className="space-y-2">
        {drugOrders.length === 0 && (
          <p className="italic text-neutral-400">
            Belum ada resep obat yang ditambahkan
          </p>
        )}
        {drugOrders.map(({ id, drug, dose, quantity }) => (
          <div
            key={drug.id}
            className="flex items-center justify-between gap-3 rounded-lg border border-secondary-500 bg-secondary-100 p-5"
          >
            <div>
              <p className="font-semibold">
                {drug.name}, {quantity} {drug.unit}
              </p>
              <p>{dose}</p>
            </div>
            <div className="space-y-2">
              <Button
                disabled={isPending}
                onClick={() => mutateAsync(id)}
                variant={"destructive"}
                size={"icon"}
              >
                <TrashIcon />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <AddDrugOrderModal careSessionId={careSessionId} />
      </div>
    </div>
  );
}
