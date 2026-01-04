export interface IAddSessionDiagnosisPayload {
  care_session_id: number;
  diagnosis_id: string;
  diagnosis_name: string;
}

export interface IDeleteSessionDiagnosisPaylaod {
  care_session_id: number;
  diagnosis_id: string;
}

export type IDiagnosis = {
  id: string;
  name: string;
};
