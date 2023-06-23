import Page from "components/layout/page";
import { useMutation, useQuery } from "react-query";
import { getUserById, IUserData, updateUser } from "api/users";
import UserForm from "./majorForm";
import { useParams } from "react-router";
import { IParam } from "interfaces/param";

const EditUser = () => {
  const { id } = useParams<IParam>();

  const { data } = useQuery(["getUserById", id], () => getUserById(Number(id)));
  const { mutate } = useMutation((data: IUserData) =>
    updateUser(Number(id), data)
  );

  return (
    <Page title="ویرایش کاربر" type="inner" backTo="pop">
      {/* <UserForm
        
        onSumbit={(values) => {
          mutate({ ...values, role: values.role.key });
        }}
      /> */}
    </Page>
  );
};

export default EditUser;
