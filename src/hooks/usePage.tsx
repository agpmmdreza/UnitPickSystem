import {IParam} from "interfaces/param";
import {useHistory, useParams} from "react-router";

import * as H from "history";

export type pageType = "register" | "viewProfile" | "edit" | undefined;

function getType(history: H.History, IdParam: string | undefined): pageType {
  const pathname = history.location.pathname;
  const splittedPathname = pathname.split("/");
  if (splittedPathname[splittedPathname.length - 1] === "create") {
    return "register";
  }
  if (
    splittedPathname[splittedPathname.length - 2] === "view-profile" ||
    splittedPathname[splittedPathname.length - 1] === "view-profile"
  ) {
    return "viewProfile";
  }
  if (
    splittedPathname[splittedPathname.length - 1] === IdParam ||
    splittedPathname[splittedPathname.length - 1] === "edit" ||
    splittedPathname[splittedPathname.length - 2] === "edit"
  ) {
    return "edit";
  }
  return undefined;
}

function replaceViewProfileWithEdit(pathName: string) {
  return pathName.replace("/view-profile", "/edit");
}
function replaceEditWithViewProfile(pathName: string) {
  return pathName.replace("/edit", "/view-profile");
}

const usePage = () => {
  const { id } = useParams<IParam>();
  const history = useHistory();
  const type = getType(history, id);
  return {
    id: id,
    pageType: type,
    location: history.location,
    /**
     * replace `view-profile` with `edit`
     * @returns edit pathname
     */
    convertToEdit: () => replaceViewProfileWithEdit(history.location.pathname),
    /**
     * replace `edit` with `view-profile`
     * @returns view-profile pathname
     */
    convertToViewProfile: () =>
      replaceEditWithViewProfile(history.location.pathname),
  };
};

export default usePage;
