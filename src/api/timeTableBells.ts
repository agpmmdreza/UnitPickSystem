import apiCaller, { IResponse } from "api";
import { IPageParams, IPaginationTableList } from "./types/paginationType";

export interface ITimeTableBellData {
  dayId: number;
  bellId: number;
  weekType: string;
  roomNumber: number;
}

export interface ITimeTableBellResponse {
  id: number;
  day: {
    id: number;
    label: string;
    dayOfWeek: string;
  };
  bell: {
    id: number;
    label: string;
    bellOfDay: string;
  };
  weekType: string;
  roomNumber: number;
}

export function getTimeTableBellsList(
  params: IPageParams
): Promise<IResponse<IPaginationTableList<ITimeTableBellResponse>>> {
  return apiCaller.get(`time-table-bells`, { params });
}

export function getTimeTableBellsById(
  id: number
): Promise<IResponse<ITimeTableBellResponse>> {
  return apiCaller.get(`time-table-bells/${id}`);
}

export function addTimeTableBell(
  data: ITimeTableBellData
): Promise<IResponse<any>> {
  return apiCaller.post(`time-table-bells`, data);
}

export function deleteTimeTableBell(dayId: number): Promise<IResponse<any>> {
  return apiCaller.delete(`time-table-bells/${dayId}`);
}

export function updateTimeTableBell(
  dayId: number,
  data: ITimeTableBellData
): Promise<IResponse<any>> {
  return apiCaller.put(`time-table-bells/${dayId}`, data);
}
