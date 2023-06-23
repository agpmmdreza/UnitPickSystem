import apiCaller, { IResponse } from "api";
import { IPageParams, IPaginationTableList } from "./types/paginationType";

export interface ITimeTableData {
  courseId: number;
  masterId: number;
  timeTableBellsId: number[];
}

export interface ITimeTableResponse {
  id: number;
  master: {
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
  };
  course: {
    id: number;
    unitsCount: number;
    title: string;
  };
  timeTableBellList: [
    {
      id: number;
      bell: {
        id: number;
        label: string;
        bellOfDay: number;
      };
      day: {
        id: number;
        label: string;
        dayOfWeek: number;
      };
      weekType: string;
      roomNumber: number;
    }
  ];
}

export function getTimeTablesList(
  params: IPageParams
): Promise<IResponse<IPaginationTableList<ITimeTableResponse>>> {
  return apiCaller.get(`time-tables`, { params });
}

export function getTimeTablesById(
  id: number
): Promise<IResponse<ITimeTableResponse>> {
  return apiCaller.get(`time-tables/${id}`);
}

export function addTimeTable(data: ITimeTableData): Promise<IResponse<any>> {
  return apiCaller.post(`time-tables`, data);
}

export function deleteTimeTable(dayId: number): Promise<IResponse<any>> {
  return apiCaller.delete(`time-tables/${dayId}`);
}

export function updateTimeTable(
  dayId: number,
  data: ITimeTableData
): Promise<IResponse<any>> {
  return apiCaller.put(`time-tables/${dayId}`, data);
}

export function getStudentUnits(): Promise<IResponse<ITimeTableResponse[]>> {
  return apiCaller.get(`time-tables/student-units`);
}
