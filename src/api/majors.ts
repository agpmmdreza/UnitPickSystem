import apiCaller, { IResponse } from "api";
import { IPageParams, IPaginationTableList } from "./types/paginationType";

interface IMajorListResponse {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
  code: string;
  major: string;
}

export interface IMajorData {
  majorName: string;
}

export function getMajorList(
  params: IPageParams
): Promise<IResponse<IPaginationTableList<IMajorListResponse>>> {
  return apiCaller.get(`majors`, { params });
}

export function getMajorById(
  id: number
): Promise<IResponse<IMajorListResponse>> {
  return apiCaller.get(`majors/${id}`);
}

export function addMajor(data: IMajorData): Promise<IResponse<any>> {
  return apiCaller.post(`majors/add`, data);
}

export function deleteMajor(userId: number): Promise<IResponse<any>> {
  return apiCaller.delete(`majors/${userId}`);
}

export function updateMajor(
  userId: number,
  data: IMajorData
): Promise<IResponse<any>> {
  return apiCaller.put(`majors/${userId}`, data);
}
