import Page from "components/layout/page";
import { useMutation } from "react-query";
import { addUser } from "api/users";
import UserForm from "./userForm";

const AddUser = () => {
  const { mutate } = useMutation(addUser);

  return (
    <Page title="افزودن کاربر" type="inner" backTo="pop">
      <UserForm
        onSumbit={(values) => {
          mutate({
            ...values,
            role: values.role.key,
          });
        }}
      />
    </Page>
  );
};

export default AddUser;
