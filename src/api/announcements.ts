import apiCaller, { IResponse } from "api";
import { IAnnouncementData, ITimeTableResponse } from "./timeTable";
import { IPaginationTableList } from "./types/paginationType";

export interface IAnnouncementResponse {
  id: number;
  timeTable: ITimeTableResponse;
  message: string;
}

export interface IAnnouncementParams {
  page: number;
}

export function getAnnouncementsList(
  params: IAnnouncementParams
): Promise<IResponse<IPaginationTableList<IAnnouncementResponse>>> {
  return apiCaller.get(`announcements`, { params });
}

export function getMasterAnnouncementsList(
  params: IAnnouncementParams
): Promise<IResponse<IPaginationTableList<IAnnouncementResponse>>> {
  return apiCaller.get(`announcements/master-announcements`, { params });
}

export function addAnnouncements(
  data: IAnnouncementData
): Promise<IResponse<IPaginationTableList<IAnnouncementResponse>>> {
  return apiCaller.post(`announcements`, data);
}

export function getAnnouncementById(
  id: number
): Promise<IResponse<IAnnouncementResponse>> {
  return apiCaller.get(`announcements/${id}`);
}

export function updateAnnouncement(
  id: number,
  data: IAnnouncementData
): Promise<IResponse<any>> {
  return apiCaller.put(`announcements/${id}`, data);
}

export function deleteAnnouncement(id: number): Promise<IResponse<any>> {
  return apiCaller.delete(`announcements/${id}`);
}
