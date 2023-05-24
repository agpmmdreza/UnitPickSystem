import apiCaller, {IResponse} from "api";
import {IPageParams, IPaginationTableList} from "./types/paginationType";

interface IUserListResponse {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
  code: string;
}

interface IUserData {
  firstName: string;
  lastName: string;
  password: string;
  role: string;
  code: string;
  major: string;
}

export function getUserList(
  params: IPageParams
): Promise<IResponse<IPaginationTableList<IUserListResponse>>> {
  return apiCaller.get(`users`, { params });
}

export function addUser(data: IUserData): Promise<IResponse<any>> {
  return apiCaller.post(`users`, data);
}

export function deleteUser(userId: number): Promise<IResponse<any>> {
  return apiCaller.delete(`users/${userId}`);
}
