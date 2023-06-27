import apiCaller, { IResponse } from "api";
import { IPageParams, IPaginationTableList } from "./types/paginationType";

export interface ICourseData {
  title: string;
  unitsCount: number;
  prerequisiteList: string[];
}

export interface ICourseResponse {
  id: number;
  unitsCount: number;
  title: string;
  coursePrerequisiteList: {
    id: number;
    unitsCount: number;
    title: string;
  }[];
}

export function getCoursesList(
  params: IPageParams
): Promise<IResponse<IPaginationTableList<ICourseResponse>>> {
  return apiCaller.get(`courses`, { params });
}

export function getCoursesById(
  id: number
): Promise<IResponse<ICourseResponse>> {
  return apiCaller.get(`courses/${id}`);
}

export function addCourse(data: ICourseData): Promise<IResponse<any>> {
  return apiCaller.post(`courses`, data);
}

export function deleteCourse(dayId: number): Promise<IResponse<any>> {
  return apiCaller.delete(`courses/${dayId}`);
}

export function updateCourse(
  dayId: number,
  data: ICourseData
): Promise<IResponse<any>> {
  return apiCaller.put(`courses/${dayId}`, data);
}

export function getTodayCourses(): Promise<IResponse<ICourseResponse>> {
  return apiCaller.get(`courses/today-courses`);
}
