import { Button } from "@/common/components/button/button";
import { Input } from "@/common/components/input/input";
import LoadingSpinner from "@/common/components/loader/loading-spinner";
import { MagnifyingGlassIcon, WarningIcon } from "@phosphor-icons/react";
import { Dispatch, SetStateAction } from "react";
import useAddPatientForm from "../../../hooks/useAddPatientForm";
import useAddQueueForm from "../../../hooks/useAddQueueForm";
import useAutofillPatientData from "../../../hooks/useAutofillPatientData";
import useCreatePatient from "../../../hooks/useCreatePatient";
import useCreateQueue from "../../../hooks/useCreateQueue";
import AddQueueForm from "../forms/add-queue-form";
import PatientRegistrationForm from "../forms/patient-registration-form";
import PatientData from "./patient-data";

export default function AddQueueModalContent({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const patientForm = useAddPatientForm();
  const queueForm = useAddQueueForm();

  const { isPending: isCreateQueuePending, onSubmit: onCreateQueueSubmit } =
    useCreateQueue(setOpen);
  const {
    isPending: isCreatePatientPending,
    onSubmit: onCreatePatientSubmit,
    createdPatient,
  } = useCreatePatient(queueForm);

  const {
    data,
    isLoading: isPatientSearchLoading,
    search,
    mrInput,
    mrInputRef,
    formattedMrNumber,
    foundPatient,
    onMrInputChange,
  } = useAutofillPatientData(queueForm);

  const isPatientNotFound =
    data?.error && !isPatientSearchLoading && mrInput !== "";

  const showRegistrationForm = !foundPatient && !isPatientSearchLoading;
  const showPatientNotFoundWarning = Boolean(
    !!data && isPatientNotFound && !isPatientSearchLoading,
  );

  return (
    <>
      <div className="flex items-center gap-1">
        <Input
          placeholder="Cari No. Medical Record"
          ref={mrInputRef}
          value={formattedMrNumber}
          onChange={onMrInputChange}
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
          <MagnifyingGlassIcon size={24} />
          <p>{isPatientSearchLoading ? "Mencari..." : "Cari"}</p>
        </Button>
      </div>
      {foundPatient && (
        <PatientData patient={foundPatient} title="Data Pasien Ditemukan" />
      )}
      {createdPatient && (
        <PatientData
          patient={createdPatient}
          title="Data Pasien Baru Berhasil Ditambahkan"
        />
      )}
      {isPatientSearchLoading && (
        <div className="flex h-32 w-full items-center justify-center">
          <LoadingSpinner className="border-primary-500" />
        </div>
      )}
      {showPatientNotFoundWarning && (
        <div className="flex items-center gap-2 rounded-lg border border-warning-400 bg-warning-100 p-3 font-medium text-warning-600">
          <WarningIcon size={24} />
          <p>
            Pasien tidak ditemukan. Silakan registrasi pasien baru untuk
            melanjutkan.
          </p>
        </div>
      )}
      {showRegistrationForm && !createdPatient && (
        <PatientRegistrationForm
          form={patientForm}
          onSubmit={onCreatePatientSubmit}
          isLoading={isCreatePatientPending}
        />
      )}
      <AddQueueForm
        form={queueForm}
        onSubmit={onCreateQueueSubmit}
        isLoading={isCreateQueuePending}
      />
    </>
  );
}
