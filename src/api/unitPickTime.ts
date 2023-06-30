import apiCaller, { IResponse } from "api";
import { IPageParams, IPaginationTableList } from "./types/paginationType";

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

export function getUnitPickTimeById(
  id: number
): Promise<IResponse<IUPickData>> {
  return apiCaller.get(`unit-pick-time/${id}`);
}

export function addUnitPickTime(data: IUPickData): Promise<IResponse<any>> {
  return apiCaller.post(`unit-pick-time`, data);
}

export function deleteUnitPickTime(userId: number): Promise<IResponse<any>> {
  return apiCaller.delete(`unit-pick-time/${userId}`);
}

export function updateUnitPickTime(
  userId: number,
  data: IUPickData
): Promise<IResponse<any>> {
  return apiCaller.put(`unit-pick-time/${userId}`, data);
}
