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

export interface IUPickData {
  entranceYear: number;
  pickTime: string;
  modifyTime: string;
}

export function getUnitPickTimeList(
  params: IPageParams
): Promise<IResponse<IPaginationTableList<IUPickData>>> {
  return apiCaller.get(`unit-pick-time/?page=${params.page}`);
}

export function getMajorById(
  id: number
): Promise<IResponse<IMajorListResponse>> {
  return apiCaller.get(`majors/${id}`);
}

export function addUnitPickTime(data: IUPickData): Promise<IResponse<any>> {
  return apiCaller.post(`unit-pick-time`, data);
}

export function deleteMajor(userId: number): Promise<IResponse<any>> {
  return apiCaller.delete(`majors/${userId}`);
}

// export function updateMajor(
//   userId: number,
//   data: IMajorData
// ): Promise<IResponse<any>> {
//   return apiCaller.put(`majors/${userId}`, data);
// }
