import apiCaller, { IResponse } from "api";
import { IPageParams, IPaginationTableList } from "./types/paginationType";

export interface IBellData {
  label: string;
  bellOfDay: number;
}

export interface IBellResponse {
  id: number;
  label: string;
  bellOfDay: number;
}

export function getBellsList(
  params: IPageParams
): Promise<IResponse<IPaginationTableList<IBellResponse>>> {
  return apiCaller.get(`bells`, { params });
}

export function getBellsById(id: number): Promise<IResponse<IBellResponse>> {
  return apiCaller.get(`bells/${id}`);
}

export function addBell(data: IBellData): Promise<IResponse<any>> {
  return apiCaller.post(`bells`, data);
}

export function deleteBell(dayId: number): Promise<IResponse<any>> {
  return apiCaller.delete(`bells/${dayId}`);
}

export function updateBell(
  dayId: number,
  data: IBellData
): Promise<IResponse<any>> {
  return apiCaller.put(`bells/${dayId}`, data);
}

export function seedBells(): Promise<IResponse<any>> {
  return apiCaller.post(`bells/seed`);
}
