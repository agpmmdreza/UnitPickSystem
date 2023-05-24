import apiCaller, {IResponse} from "api/index";
import {DOCTOR_TYPE} from "constants/enumTypes";
import {statusType, UserRoleName} from "./types/userTypes";

const DROPDOWN = "dropdown";

export interface IDropdownResponse {
  id: string;
  name: string | null;
  [k: string]: any;
}

export interface ICountryResponse {
  id: string;
  name: string | null;
  flag: string;
}

export interface ILanguageOptions {
  id: {
    code: string;
    name: string;
    nativeName: string;
  };
  name: {
    code: string;
    name: string;
    nativeName: string;
  };
}
export function getPromotionTypes(): Promise<IResponse<IDropdownResponse[]>> {
  return apiCaller.get("/dropdown/promotion-types");
}

export function getFacilityRobots(
  facility_id: number
): Promise<IResponse<IDropdownResponse[]>> {
  return apiCaller.get(`dropdown/facilities/${facility_id}/robots`);
}
//#endregion

export function getRelationshipTypes(): Promise<
  IResponse<IDropdownResponse[]>
> {
  return apiCaller.get("/dropdown/relationship-types");
}

export function getRobotLocations(): Promise<IResponse<IDropdownResponse[]>> {
  return apiCaller.get("/dropdown/robots/locations");
}

export function getLanguage(): Promise<IResponse<ILanguageOptions[]>> {
  return apiCaller.get("/dropdown/languages");
}
export function getTestTypes(): Promise<IResponse<IDropdownResponse[]>> {
  return apiCaller.get("/dropdown/test-types");
}
export function getIntakeFormTestTypes(): Promise<
  IResponse<IDropdownResponse[]>
> {
  return apiCaller.get("/dropdown/intake-form-test-types");
}
export function getSpecialities(): Promise<IResponse<IDropdownResponse[]>> {
  return apiCaller.get("/dropdown/doctors-specialities");
}
export function getDoctorsByTypeAndSpeciality(
  type: string,
  speciality: string
): Promise<IResponse<IDropdownResponse[]>> {
  return apiCaller.get(`dropdown/doctor-type/${type}?speciality=${speciality}`);
}
//#region index facility doctors
export function getFacilityDoctors(
  facility_id: number
): Promise<IResponse<IDropdownResponse[]>> {
  return apiCaller.get(`dropdown/facilities/${facility_id}/doctors`);
}
//#endregion

//#region index facility departments
export function getFacilityDepartments(
  facility_ids: number[]
): Promise<IResponse<IDropdownResponse[]>> {
  const obj: { [k: string]: any } = {};

  facility_ids.forEach((fId, idx) => {
    obj[`facilities_ids[${idx}]`] = fId;
  });

  return apiCaller.get(`dropdown/facilities/departments`, {
    params: obj,
  });
}
interface IFacilitiesDepartments {
  facilities_ids: number[];
}
export function getFacilitiesDepartments(
  params: IFacilitiesDepartments
): Promise<IResponse<IDropdownResponse[]>> {
  return apiCaller.get(`dropdown/facilities/departments`, { params: params });
}

//#endregion

//#region index facility branches
interface IFacilityBranchesResponse {
  //they did not specify
}
export function getFacilityBranches(
  facility_id: number
): Promise<IResponse<IFacilityBranchesResponse>> {
  return apiCaller.get(`dropdown/facilities/${facility_id}/branches`);
}
//#endregion

//#region index department robots
export function getDepartmentRobots(
  department_id: number
): Promise<IResponse<IDropdownResponse[]>> {
  return apiCaller.get(`dropdown/departments/${department_id}/robots`);
}
//#endregion

//#region index department doctors
interface IDepartmentDoctorsResponse {
  //they did not specify
}
export function getDepartmentDoctors(
  department_id: number
): Promise<IResponse<IDepartmentDoctorsResponse>> {
  return apiCaller.get(`dropdown/departments/${department_id}/doctors`);
}
//#endregion

//#region index countries
export function getCountries(): Promise<IResponse<IDropdownResponse[]>> {
  return apiCaller.get(`dropdown/countries`);
}
//#endregion

//#region index states
export function getStates(
  country_id: number
): Promise<IResponse<IDropdownResponse[]>> {
  return apiCaller.get(`dropdown/countries/${country_id}/states`);
}
//#endregion

//#region index cities
export function getCities(
  state_id: number
): Promise<IResponse<IDropdownResponse[]>> {
  return apiCaller.get(`dropdown/states/${state_id}/cities`);
}
//#endregion

//#region index facility types
interface IFacilityTypesResponse {
  id: string;
  name: string;
}
export function getFacilityTypes(): Promise<
  IResponse<IFacilityTypesResponse[]>
> {
  return apiCaller.get(`dropdown/facilities/types`);
}
//#endregion

//#region index facility names
interface IFacilitiesByTypeParams {
  hf_type: string;
}
export function getFacilitiesByType(
  params: IFacilitiesByTypeParams
): Promise<IResponse<IDropdownResponse[]>> {
  return apiCaller.get(`dropdown/facilities/names`, { params: params });
}

//#endregion

export function getFacilityNames({
  city_id,
  hf_type,
}: {
  hf_type: string;
  city_id?: number;
}): Promise<IResponse<IDropdownResponse[]>> {
  return apiCaller.get(`/dropdown/facilities/names`, {
    params: {
      city_id,
      hf_type,
    },
  });
}

export function getPatientsByFacilityAndCity({
  hf_id,
  city_id,
  gender,
}: {
  city_id: number;
  hf_id: number;
  gender: string;
}): Promise<IResponse<IDropdownResponse[]>> {
  return apiCaller.get(`/dropdown/patients-facility-city`, {
    params: {
      city_id,
      hf_id,
      gender,
    },
  });
}

//#region index city facilities by type
export function getCityFacilitiesByType(
  city_id: number,
  type: string
): Promise<IResponse<IDropdownResponse[]>> {
  return apiCaller.get(`dropdown/cities/${city_id}/type/${type}/facilities`);
}
//#endregion

//#region index robot types
export function getRobotTypes(): Promise<IResponse<IDropdownResponse[]>> {
  return apiCaller.get(`dropdown/robots/types`);
}
//#endregion

export function getRobotLevels(): Promise<IResponse<IDropdownResponse[]>> {
  return apiCaller.get(`dropdown/robots/levels`);
}
//#endregion

//#region index robots
interface IRobotsParams {
  type: string;
  level: string;
}
export function getRobots(
  params: IRobotsParams
): Promise<IResponse<IDropdownResponse[]>> {
  return apiCaller.get(`dropdown/robots`, { params: params });
}
//#endregion

//#region index city doctors
export function getCityDoctors(
  city_id: number
): Promise<IResponse<IDropdownResponse[]>> {
  return apiCaller.get(`dropdown/cities/${city_id}/doctors`);
}
//#endregion

export function getDoctorsByCityAndSpeciality(
  city_id: number,
  speciality: string
): Promise<IResponse<IDropdownResponse[]>> {
  return apiCaller.get(
    `/dropdown/doctors-city-speciality?city_id=${city_id}&speciality=${speciality}`
  );
}

//#region index country timezones
export function getCountryTimezones(
  country_id: number
): Promise<IResponse<IDropdownResponse[]>> {
  return apiCaller.get(`/dropdown/countries/${country_id}/timezones`);
}
//#endregion

//#region index facility side
export function getFacilitySides(): Promise<IResponse<IDropdownResponse[]>> {
  return apiCaller.get(`dropdown/facilities/sides`);
}
//#endregion

//#region index device types
export function getDeviceTypes(): Promise<IResponse<IDropdownResponse[]>> {
  return apiCaller.get(`dropdown/device-types`);
}
//#endregion

//#region index device type devices
export function getDeviceTypeDevices(
  deviceType_id: number
): Promise<IResponse<IDropdownResponse[]>> {
  return apiCaller.get(`dropdown/device-types/${deviceType_id}/devices`);
}
//#endregion

//#region index department names
export function getAllDepartments(): Promise<IResponse<IDropdownResponse[]>> {
  return apiCaller.get(`dropdown/department-names`);
}
//#endregion

//#region index country phone codes
export function getCountryPhoneCodes(
  country_id: number
): Promise<IResponse<IDropdownResponse[]>> {
  return apiCaller.get(`dropdown/countries/${country_id}/phone-codes`);
}
//#endregion

//#region index city facilities by type and side
export function getCityFacilitiesByTypeAndSide(
  city_id: number,
  type: string,
  side: string
): Promise<IResponse<IDropdownResponse[]>> {
  return apiCaller.get(
    `dropdown/cities/${city_id}/type/${type}/side/${side}/facilities`
  );
}
//#endregion

//#region index facility robots by type and level
export function getFacilityRobotsByTypeAndLevel(
  facility_id: number,
  type: string,
  level: string,
  departmentId?: number
): Promise<IResponse<IDropdownResponse[]>> {
  const params = !!departmentId ? { department_id: departmentId } : {};
  return apiCaller.get(
    `dropdown/facilities/${facility_id}/type/${type}/level/${level}/robots`,
    {
      params: params,
    }
  );
}
//#endregion

//#region index facility doctors by dna

export function getFacilityDoctorByDNA(
  facility_id: number,
  dna_id: number
): Promise<IResponse<IDropdownResponse[]>> {
  return apiCaller.get(
    `dropdown/facilities/${facility_id}/dna/${dna_id}/doctors`
  );
}

//#endregion

// interface ICityDoctorsByDnaAndSpecialityParams {
//   city_id: number;
//   speciality: string;
//   dna_id?: number;
// }
// export function getCityDoctorsByDnaAndSpeciality(
//   params: ICityDoctorsByDnaAndSpecialityParams
// ): Promise<IResponse<IDropdownResponse[]>> {
//   return apiCaller.get(`users-list`, {
//     params: { ...params, role_name: "doctor" },
//   });
// }

export function getCityDnas(
  city_id: number,
  keyword?: string
): Promise<IResponse<IDropdownResponse[]>> {
  return apiCaller.get(`${DROPDOWN}/cities/${city_id}/dnas`, {
    params: {
      keyword,
    },
  });
}

export function getCurrentUserTimezones() {
  return apiCaller.get(`${DROPDOWN}/countries/timezones`);
}

//#region index not builded robots by type and level
interface INotBuildedRobotsParams {
  type: string;
  level: string;
}
export function getNotBuildedRobots(
  params: INotBuildedRobotsParams
): Promise<IResponse<IDropdownResponse[]>> {
  return apiCaller.get(`dropdown/not-builded-robots`, { params: params });
}
//#endregion
//#region index not builded robots by type and level
interface INotAssignedRobotsParams {
  type: string;
  level: string;
}
export function getNotAssignedToFacilityRobots(
  params: INotAssignedRobotsParams
): Promise<IResponse<IDropdownResponse[]>> {
  return apiCaller.get(`dropdown/not-assigned-robots`, { params: params });
}
//#endregion

//#region index facilities by type and side
interface IFacilitiesByTypeAndSideParams {
  type: string;
  side: string;
}
export function getFacilitiesByTypeAndSide(
  params: IFacilitiesByTypeAndSideParams
): Promise<IResponse<IDropdownResponse[]>> {
  return apiCaller.get(`dropdown/facilities`, { params: params });
}
//#endregion

//#region index all dnas
export function getAllDNAs(): Promise<IResponse<IDropdownResponse[]>> {
  return apiCaller.get(`dropdown/users-list`, {
    params: { role_name: "doctor-network-admin" },
  });
}
//#endregion

//#region index doctor types
export function getDoctorTypes(): Promise<IResponse<IDropdownResponse[]>> {
  return apiCaller.get(`dropdown/doctors-types`);
}
//#endregion

//#region index doctors specialities
export function getDoctorsSpecialities(): Promise<
  IResponse<IDropdownResponse[]>
> {
  return apiCaller.get(`dropdown/doctors-specialities`);
}
//#endregion

//#region
interface IDoctorsByCityAndSpecialityParams {
  city_id: number;
  speciality: string;
}
export function getCityDoctorsByCityAndSpeciality(
  params: IDoctorsByCityAndSpecialityParams
) {
  return apiCaller.get(`dropdown/doctors-city-speciality`, {
    params: params,
  });
}
//#endregion

//#region Visit Type
export function getVisitTypes(): Promise<IResponse<IDropdownResponse[]>> {
  return apiCaller.get(`dropdown/visit-types`);
}
//#endregion

//#region
export function getFamilyMembers(
  id: string | number
): Promise<IResponse<IDropdownResponse[]>> {
  return apiCaller.get(`dropdown/family-members/${id}`);
}
//#endregion

export function getSubSpecialities(
  id: string
): Promise<IResponse<IDropdownResponse[]>> {
  return apiCaller.get(`/dropdown/doctors-subspecialities/${id}`);
}
export function getFacilityParents(): Promise<IResponse<IDropdownResponse[]>> {
  return apiCaller.get(`/dropdown/facilities/parents`);
}

//#region index users by role name
export interface IUsersByRoleParams {
  role_name: UserRoleName;
  hf_type?: string[];
  department_id?: string[];
  gender?: string[];
  status?: statusType;
  keyword?: string;
  facility_id?: number[];
  doctor_type?: DOCTOR_TYPE[];
  mrn_number?: number;
  birthday?: string; //1999-02-13
  city_id?: number[];
}
export function getUsersByRole(
  params: IUsersByRoleParams
): Promise<IResponse<IDropdownResponse[]>> {
  return apiCaller.get(`/dropdown/users-list`, { params: params });
}
//#endregion
