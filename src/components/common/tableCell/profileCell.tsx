import {useHistory} from "react-router";
import ProfileBtn from "./profileBtn";

//? cell that by clicking shows profile
const ProfileCell = (
  props: any,
  idAccessor?: string,
  query?: string,
  path?: string,
  state?: any
) => {
  const idName =
    JSON.stringify(idAccessor) !== "{}" && idAccessor !== undefined
      ? idAccessor
      : "id";
  console.log(query);

  const row_id = Number(props.row.original[idName]);
  const history = useHistory();
  const pushURL = `${path ?? history.location.pathname}/view-profile/${row_id}${
    query ? `?${query}` : ""
  }`;
  return <ProfileBtn path={pushURL} disabled={false} state={state} />;
};

export { ProfileCell };
