import Page from "components/layout/page";
import { useMutation, useQueryClient } from "react-query";
import UserForm from "./majorForm";
import { addMajor } from "api/majors";
import { notify } from "components/core/toast";
import { useHistory } from "react-router";

const AddUser = () => {
  const history = useHistory();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(addMajor, {
    onSuccess: () => {
      queryClient.invalidateQueries(["majorList"]);
      queryClient.invalidateQueries(["majorById"]);
      notify.success("رشته با موفقیت اضافه شد.");
      history.replace("../majors");
    },
  });

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
