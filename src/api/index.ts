import axios, { AxiosResponse } from "axios";
import { UserRoleName } from "./types/userTypes";

const API_BASE = process.env.REACT_APP_API_BASE;
const API_STORAGE = process.env.REACT_APP_STORAGE_BASE;

const apiCaller = axios.create({
  baseURL: API_BASE,
});

const setAxiosToken = (token: string | null): void => {
  if (token === null) {
    delete apiCaller.defaults.headers.common["Authorization"];
    return;
  }

  apiCaller.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const setAxiosFacility = (facility: number | null) => {
  if (facility === null) {
    delete apiCaller.defaults.headers.common["FACILITY-ID"];
    return;
  }

  apiCaller.defaults.headers.common["FACILITY-ID"] = facility;
};

const setAxiosRole = (role: UserRoleName | null) => {
  if (role === null) {
    delete apiCaller.defaults.headers.common["CURRENT-ROLE"];
    return;
  }
  console.log("role is:" + role?.replace("super", "super-admin"));
  apiCaller.defaults.headers.common["CURRENT-ROLE"] = role?.replace(
    "super",
    "super-admin"
  );
  window.localStorage.setItem("role", role);
};

export interface IServerResponse<T> {
  message?: string;
  status?: string;
  errors?: { [key: string]: string[] }; // back-end Guarantees this type.
  data?: T;
}

export interface IResponse<T> extends AxiosResponse {
  data: IServerResponse<T>;
}

export default apiCaller;
export { API_BASE, API_STORAGE, setAxiosToken, setAxiosFacility, setAxiosRole };
