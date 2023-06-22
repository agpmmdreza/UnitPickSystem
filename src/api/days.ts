import apiCaller, { IResponse } from "api";
import { IPageParams, IPaginationTableList } from "./types/paginationType";

export interface IDayData {
  label: string;
  dayOfWeek: number;
}

export function getDayList(
  params: IPageParams
): Promise<IResponse<IPaginationTableList<IDayData>>> {
  return apiCaller.get(`days`, { params });
}

export function getDayById(id: number): Promise<IResponse<IDayData>> {
  return apiCaller.get(`days/${id}`);
}

export function addDay(data: IDayData): Promise<IResponse<any>> {
  return apiCaller.post(`days`, data);
}

export function deleteDay(dayId: number): Promise<IResponse<any>> {
  return apiCaller.delete(`days/${dayId}`);
}

export function updateDay(
  dayId: number,
  data: IDayData
): Promise<IResponse<any>> {
  return apiCaller.put(`days/${dayId}`, data);
}
