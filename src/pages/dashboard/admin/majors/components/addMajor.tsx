import Page from "components/layout/page";
import { useMutation } from "react-query";
import UserForm from "./majorForm";
import { addMajor } from "api/majors";

const AddUser = () => {
  const { mutate } = useMutation(addMajor);

  return (
    <Page title="افزودن رشته" type="inner" backTo="pop">
      <UserForm
        onSumbit={(values) => {
          mutate({
            ...values,
          });
        }}
      />
    </Page>
  );
};

export default AddUser;
