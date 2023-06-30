import apiCaller, { IResponse } from "api";
import { IPageParams, IPaginationTableList } from "./types/paginationType";

interface IUserListResponse {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
  code: string;
  major: string;
}

export interface IUserData {
  firstName: string;
  lastName: string;
  password: string;
  role: string;
  code: string;
  major: string;
  entranceYear: string;
}

export interface IMastersResponse {
  id: number;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    password: string;
    role: string;
    code: string;
    major: string;
    entranceYear: number;
  };
  major: {
    id: number;
    majorName: string;
  };
}

interface IPasswordData {
  currentPassword: string;
  newPassword: string;
}

interface IUpdateProfileData {
  firstName: string;
  lastName: string;
  code: string;
}

export function getUserList(
  params: IPageParams
): Promise<IResponse<IPaginationTableList<IUserListResponse>>> {
  return apiCaller.get(`users`, { params });
}

export function getUserById(id: number): Promise<IResponse<IUserListResponse>> {
  return apiCaller.get(`users/${id}`);
}

export function addUser(data: IUserData): Promise<IResponse<any>> {
  return apiCaller.post(`users`, data);
}

export function deleteUser(userId: number): Promise<IResponse<any>> {
  return apiCaller.delete(`users/${userId}`);
}

export function updateUser(
  userId: number,
  data: IUserData
): Promise<IResponse<any>> {
  return apiCaller.put(`users/${userId}`, data);
}

export function getMasters(
  params: IPageParams
): Promise<IResponse<IMastersResponse[]>> {
  return apiCaller.get(`masters`);
}

export function changePassword(data: IPasswordData): Promise<IResponse<any>> {
  return apiCaller.post(`users/profile/change-password`, data);
}
export function updateProfile(
  data: IUpdateProfileData
): Promise<IResponse<any>> {
  return apiCaller.post(`users/profile`, data);
}
