export interface IRolePermission {
  id: number;
  name: string;
}

export interface IUserRole {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  slug: string;
  permissions: IRolePermission[];
}

export enum UserLoginType {
  Email = "email",
  Mobile = "mobile",
  Username = "user_name",
}

export enum UserRoleName {
  SuperAdmin = "ADMIN",
  Master = "MASTER",
  Student = "STUDENT",
  Doctor = "doctor",
  DoctorNetworkAdmin = "dna",
  Staff = "staff",
  LocalAdmin = "local-admin",
  Patient = "patient",
  CMO = "cmo",
}
export type statusType = "active" | "pending" | "denied";
