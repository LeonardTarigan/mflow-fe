import { Button } from "@/common/components/button/button";
import AddDiagnosisModal from "../modals/add-diagnosis-modal";
import { SyringeIcon, TrashIcon } from "@phosphor-icons/react";
import { IDiagnosis } from "@/common/models/diagnosis.model";

export default function PatientDiagnosis({
  careSessionId,
  diagnoses,
}: {
  careSessionId: number;
  diagnoses: IDiagnosis[];
}) {
  return (
    <div className="space-y-3 py-5">
      <div className="mb-3 flex items-center gap-2">
        <SyringeIcon size={24} weight="fill" />
        <h3 className="text-xl font-bold">Diagnosis</h3>
      </div>
      <div className="space-y-2">
        {diagnoses.length === 0 && (
          <p className="italic text-neutral-400">
            Belum ada diagnosis yang ditambahkan
          </p>
        )}
        {diagnoses.map(({ id, name }) => (
          <div
            key={id}
            className="flex items-center justify-between gap-3 rounded-lg border border-yellow-400 bg-yellow-100 p-5"
          >
            <div>
              <p className="text-sm">{id}</p>
              <p className="font-semibold">{name}</p>
            </div>
            <div className="space-y-2">
              <Button onClick={() => {}} variant={"destructive"} size={"icon"}>
                <TrashIcon />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <AddDiagnosisModal onAdd={() => {}} />
      </div>
    </div>
  );
}
