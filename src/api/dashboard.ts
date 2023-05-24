import apiCaller, {IResponse} from "./index";

export interface IPatientDashboard {
  messages_count: number;
  messages: [];
  notifications_count: number;
  notifications: [];
  appointments_count: number;
  visit_summary_notes_count: number;
}

export function getPatientDashboard(): Promise<IResponse<IPatientDashboard>> {
  return apiCaller.get("/patient-dashboard");
}
