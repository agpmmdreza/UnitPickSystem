import ProfileBtn from "./profileBtn";

export function ViewProfileByRole(props: any) {
  // const allRoles: TRoleName[] = props.row.original.all_roles;
  const userId = props.row.original.id;
  const baseURL = "/panel/super/";
  const roleURL = "";
  const editURL = baseURL + roleURL;
  //   console.log("editURL: ", editURL);

  //? Gets the role of user then returns the profile

  return <ProfileBtn path={editURL} disabled={!roleURL} />;
}
