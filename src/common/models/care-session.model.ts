import { TRoom } from "@/app/(dashboard)/data/ruangan/model/room.model";
import { IEmployee } from "./employee.model";
import { TQueueStatus } from "./queue.model";
import { IVitalSign } from "./care-history.model";
import { IDiagnosis } from "./diagnosis.model";
import { IDrugOrder } from "./drug.model";
import { ICareSessionTreatment } from "./treatment.model";
import { IPatient } from "./patient.model";

export type ICareSessionDetail = {
  id: number;
  status: TQueueStatus;
  complaints: string;
  queue_number: string;
  patient: Pick<
    IPatient,
    | "id"
    | "name"
    | "medical_record_number"
    | "birth_date"
    | "gender"
    | "occupation"
  >;
  doctor: Pick<IEmployee, "id" | "username">;
  room: TRoom;
  vital_sign: IVitalSign | null;
  diagnoses: IDiagnosis[];
  drug_orders: IDrugOrder[];
  treatments: ICareSessionTreatment[];
  created_at: Date;
  updated_at: Date;
};
