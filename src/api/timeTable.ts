import apiCaller, { IResponse } from "api";
import { IPageParams, IPaginationTableList } from "./types/paginationType";

export interface ITimeTableData {
  courseId: number;
  masterId: number;
  timeTableBellsId: number[];
  term: string;
}

export interface IAnnouncementData {
  timeTableId: number;
  message: string;
}

export interface ITimeTableResponse {
  id: number;
  status: "accepted" | "not_accepted";
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

export interface IStudentUnitResponse {
  id: number;
  timeTable: ITimeTableResponse;
  grade: number;
  term: number;
}

export interface IStudentList {
  id: number;
  student: {
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
  };
  timeTable: {
    id: number;
    status: string;
    master: {
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
    };
    course: {
      id: number;
      unitsCount: number;
      title: string;
    };
    timeTableBellList: [];
  };
  grade: number;
  term: number;
}

export interface IGrade {
  id: string;
  grade: string;
}
export interface ISubmitGrades {
  id: string;
  reportGrade: IGrade[];
}

interface ITTableParams extends IPageParams {
  term?: string;
}

export function getTimeTablesList(
  params: ITTableParams
): Promise<IResponse<IPaginationTableList<ITimeTableResponse>>> {
  return apiCaller.get(`time-tables`, {
    params,
  });
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

interface IStudentUnitsParams extends Partial<IPageParams> {
  term?: string;
}

export function getStudentUnits(
  params: IStudentUnitsParams
): Promise<IResponse<IStudentUnitResponse[]>> {
  return apiCaller.get(`time-tables/student-units`, { params });
}

export function chooseUnit(timeTableId: number): Promise<IResponse<any>> {
  return apiCaller.post(`time-tables/${timeTableId}/choose`);
}

export function deleteUnit(unitId: number): Promise<IResponse<any>> {
  return apiCaller.delete(`time-tables/${unitId}/remove`);
}

export function masterTimeList(
  params: IPageParams
): Promise<IResponse<IPaginationTableList<ITimeTableResponse>>> {
  return apiCaller.get("time-tables/master", { params });
}

export function studentTimeList(
  id: string,
  params: IPageParams
): Promise<IResponse<IPaginationTableList<IStudentList>>> {
  return apiCaller.get(`time-tables/${id}/students`, { params });
}

export function submitStudentGrades(
  data: ISubmitGrades
): Promise<IResponse<any>> {
  return apiCaller.post(`time-tables/${data.id}/students-grade`, {
    reportGrade: data.reportGrade,
  });
}

export function acceptTimeTable(timeTableId: number): Promise<IResponse<any>> {
  return apiCaller.put(`time-tables/${timeTableId}/accept`);
}
