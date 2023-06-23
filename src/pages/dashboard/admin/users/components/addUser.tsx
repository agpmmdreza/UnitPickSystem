import Page from "components/layout/page";
import { useMutation } from "react-query";
import { addUser } from "api/users";
import UserForm from "./userForm";
import { useHistory } from "react-router";
import { notify } from "components/core/toast";

const AddUser = () => {
  const history = useHistory();
  const { mutate } = useMutation(addUser, {
    onSuccess: () => {
      notify.success(" کاربر با موفقیت اضافه شد.");
      history.replace("../users");
    },
  });

  return (
    <Page title="افزودن کاربر" type="inner" backTo="pop">
      <UserForm
        onSumbit={(values) => {
          mutate({
            ...values,
            role: values.role,
          });
        }}
      />
    </Page>
  );
};

export default AddUser;
