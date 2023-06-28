import Page from "components/layout/page";
import { useMutation, useQuery } from "react-query";
import { getUserById, IUserData, updateUser } from "api/users";
import UserForm from "./userForm";
import { useHistory, useParams } from "react-router";
import { IParam } from "interfaces/param";
import { queryClient } from "App";
import { notify } from "components/core/toast";

const EditUser = () => {
  const { id } = useParams<IParam>();
  const history = useHistory();

  const { data, isLoading } = useQuery(["getUserById", id], () =>
    getUserById(Number(id))
  );
  const { mutate } = useMutation(
    (data: IUserData) => updateUser(Number(id), data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getUsers"]);
        queryClient.invalidateQueries(["getUserById"]);
        notify.success("کاربر با موفقیت ویرایش شد.");
        history.replace("../users");
      },
    }
  );

  return (
    <Page title="ویرایش کاربر" type="inner" backTo="pop">
      {!isLoading && (
        <UserForm
          initialValues={
            data?.data.data && {
              ...data?.data.data,
              role: { key: data.data.data.role.toLowerCase(), value: "" },
              entranceYear: { key: "", value: "" },
              major: { key: "", value: data.data.data.major },
            }
          }
          onSumbit={(values) => {
            mutate({ ...values, role: values.role });
          }}
        />
      )}
    </Page>
  );
};

export default EditUser;
