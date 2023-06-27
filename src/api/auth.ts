import apiCaller, { IResponse } from "api/index";
import { IUserRole, UserLoginType } from "api/types/userTypes";

// login

export interface ILoginData {
  user_name: string;
  password: string;
  type: UserLoginType;
}

export interface ILoginFirstStepData {
  user_name: string;
  password: string;
  type: UserLoginType;
}

export interface ILoginSecondStepData {
  user_name: string;
  verification_code: string;
  type: UserLoginType;
}

interface ILoginResponse {
  token: string;
  expireAt: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    password: string;
    role: string;
    code: string;
  };
}

export interface ILoginInfo {
  code: string;
  password: string;
}

export function login(data: ILoginInfo): Promise<IResponse<ILoginResponse>> {
  return apiCaller.post("auth/login", data);
}

// forgot password

interface IForgetPasswordData {
  email: string;
}

export function submitForgetPassword(
  data: IForgetPasswordData
): Promise<IResponse<null>> {
  return apiCaller.post("forgot_password", data);
}

interface ICheckVerificationCode {
  email: string;
  verification_code: string;
}

export function checkVerificationCode(
  data: ICheckVerificationCode
): Promise<IResponse<string>> {
  return apiCaller.post("check_verification_code", data);
}

//#region reset password
interface IResetPasswordData {
  email: string;
  otp: string;
  new_password: string;
  new_password_confirmation: string;
}

export function submitResetPassword(
  data: IResetPasswordData
): Promise<IResponse<null>> {
  return apiCaller.post("reset_password", data);
}

//#endregion

//#region change password
interface IChangePasswordData {
  old_password: string;
  new_password: string;
  new_password_confirmation: string;
}

export function submitChangePassword(
  data: IChangePasswordData
): Promise<IResponse<null>> {
  return apiCaller.put("change_password", data);
}

//#endregion

//#region logout
export function submitLogout(): Promise<IResponse<null>> {
  return apiCaller.post("logout");
}

//#endregion

//#region register

export type ITitle = "MD" | "PhD" | "MD/PhD" | "MBBS";

export interface ILicense {
  NPI_number: string;
  country_of_license: number;
}
export interface IRegisterData {
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  user_name: string;
  // password: string;
  // password_confirmation: string;
  birthday: Date | string; // with format of yyyy-mm-dd
  gender: "male" | "female";
  country_id?: string; // select from list
  state_id?: string; // select from list
  city_id: string; // select from list
  timezone: string;
  zip_code?: string;
  role_name: "staff" | "doctor" | "patient";
  facility_id: string;
  speciality?: string;
  sub_speciality?: string;
  title?: ITitle;
  NPI_number?: string;
  address: string;
  phone?: string;
  // address_id: string; // select from list. can be an empty string
  country_of_license?: string;
  alternative_phone_number?: string;
  languages?: { language: string; language_fluency: string }[];
  employee_number?: string;
  national_id?: string;
  mrn_number?: string;
  departments?: string[];
  doctor_type?: string;
  licenses?: ILicense[];
}

export function submitRegister({
  address,
  city_id,
  mobile,
  email,
  user_name,
  first_name,
  last_name,
  role_name,
  birthday,
  country_of_license,
  country_id,
  departments,
  employee_number,
  mrn_number,
  NPI_number,
  alternative_phone_number,
  phone,
  gender,
  languages,
  national_id,
  speciality,
  sub_speciality,
  timezone,
  title,
  facility_id,
  zip_code,
  state_id,
  doctor_type,
  licenses,
}: IRegisterData): Promise<IResponse<null>> {
  return apiCaller.post("register", {
    address,
    city_id,
    mobile,
    email,
    user_name,
    first_name,
    last_name,
    role_name,
    birthday,
    country_of_license,
    country_id,
    departments,
    employee_number,
    mrn_number,
    NPI_number,
    alternative_phone_number,
    phone,
    gender,
    languages,
    national_id,
    speciality,
    sub_speciality,
    timezone: timezone,
    timezone_id: timezone,
    title,
    facility_id,
    zip_code,
    state_id,
    doctor_type,
    licenses,
  });
}

//#endregion

interface IDoctorProfileInfo {
  DNA: string;

  biography: IDoctorBiography;
  licenses: {
    NPI_number: string;
    country_of_license: string;
    country_of_license_id: number;
  }[];

  id: number;
  speciality: string;
  sub_speciality: string;
  title: string;
  website: string;
}

interface IProfileAddress {
  id: number;
  name: string;
  phone: string;
  fax: string;
  address: string;
  postal_code: string;
  gmtOffset: number;
  city: { id: number; name: string };
  state: { id: number; name: string };
  country: { id: number; name: string; flag: string };
  email: string;
}

export interface IDoctorBiography {
  medical_experiences: {
    id: string;
    medical_doctor_school: string;
    practice_area: string;
    years_in_practice: string;
  }[];
  membership: { id: string; value: string }[];
  honors_and_awards: { id: string; value: string }[];
  doctor_position: { id: string; value: string }[];
  short_biography: string;
}

//#region profile
export interface IProfileResponse {
  id: number;
  firstName: string;
  lastName: string;
  code: string;
  role: string;
}

export function getProfile(): Promise<IResponse<IProfileResponse>> {
  return apiCaller.get("users/profile");
}

export interface ILanguage {
  language: string;
  language_fluency: string;
}

/** Make special fields optional (common fields are required) */
interface IUpdateProfile {
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  timezone_id: number;
  avatar: string;
  birthday: Date | string;
  gender: string;
  licenses: {
    NPI_number: string;
    country_of_license: number;
  }[];
  biography: IDoctorBiography;
  speciality: string;
  sub_speciality: string;
  title: string;
  website: string;
  signature: string;
  // more_info: IDoctorProfileInfo;
  address: string;
  languages: ILanguage[];
}

type IUpdateProfileData = Partial<IUpdateProfile>;

export function updateProfile(
  data: IUpdateProfileData
): Promise<IResponse<IProfileResponse>> {
  return apiCaller.put("profile", data);
}

//#endregion

//#region updateAvatar

export function uploadAvatar(data: {
  avatar: string;
}): Promise<IResponse<null>> {
  return apiCaller.post("upload_avatar", data);
}

//#endregion

interface IStudentDetailResponse {
  id: number;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    password: string;
    role: string;
    code: string;
    major: null;
    entranceYear: number;
  };
  major: {
    id: number;
    majorName: string;
  };
  unitPickTimeTable: {
    entranceYear: number;
    pickTime: string;
    modifyTime: string;
  };
}

export function getStudentDetail(): Promise<IResponse<IStudentDetailResponse>> {
  return apiCaller.get("student-detail");
}
