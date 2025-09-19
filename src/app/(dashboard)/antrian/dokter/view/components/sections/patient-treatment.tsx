import { Button } from "@/common/components/button/button";
import { ICareSessionTreatment } from "@/common/models/treatment.model";
import { FirstAidIcon } from "@phosphor-icons/react";
import { TrashIcon } from "lucide-react";
import AddTreatmentModal from "../modals/add-treatment-modal";
import useDeleteSessionTreatment from "../../../hooks/useDeleteSessionTreatment";

export default function PatientTreatment({
  careSessionId,
  treatments,
}: {
  careSessionId: number;
  treatments: ICareSessionTreatment[];
}) {
  const { mutateAsync, isPending } = useDeleteSessionTreatment();

  return (
    <div className="space-y-3 py-5">
      <div className="mb-3 flex items-center gap-2">
        <FirstAidIcon size={24} weight="fill" />
        <h3 className="text-xl font-bold">Penanganan</h3>
      </div>
      <div className="space-y-2">
        {treatments.length === 0 && (
          <p className="italic text-neutral-400">
            Belum ada penanganan yang ditambahkan
          </p>
        )}
        {treatments.map(({ treatment, quantity }) => (
          <div
            key={treatment.id}
            className="flex items-center justify-between gap-3 rounded-lg border border-violet-400 bg-violet-100 p-5"
          >
            <p className="font-semibold">
              {treatment.name} ({quantity}x)
            </p>
            <div className="space-y-2">
              <Button
                disabled={isPending}
                onClick={() =>
                  mutateAsync({
                    care_session_id: careSessionId,
                    treatment_id: treatment.id,
                  })
                }
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
        <AddTreatmentModal careSessionId={careSessionId} />
      </div>
    </div>
  );
}
