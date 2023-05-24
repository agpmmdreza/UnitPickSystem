import {useLocation} from "react-router";

export function isViewProfile(pathName: string) {
  const splitedPathName = pathName.split("/");
  return splitedPathName[splitedPathName.length - 2] === "view-profile";
}

export function getRolePath(path: string) {
  const p = path?.split("/");
  path = p[2];
  if (path.includes("super")) {
    return "/panel/super/";
  }
  if (path.includes("patient")) {
    return "/panel/patient/";
  }
  if (path.includes("doctor")) {
    return "/panel/doctor/";
  }
  if (path.includes("staff")) {
    return "/panel/staff/";
  }
  if (path.includes("local-admin")) {
    return "/panel/local-admin/";
  }
  if (path.includes("cmo")) {
    return "/panel/cmo/";
  }
}

export const useBaseUrl = () => {
  const loc = useLocation();
  return getRolePath(loc.pathname);
};
