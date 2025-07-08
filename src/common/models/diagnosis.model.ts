export interface IAddSessionDiagnosisPayload {
  care_session_id: number;
  diagnosis_ids: string[];
  external_diagnoses?: { id: string; name: string }[];
}
