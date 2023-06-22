import Page from "components/layout/page";
import { useMutation } from "react-query";
import { addBell } from "api/bells";
import BellForm from "./bellForm";
import { useHistory } from "react-router";
import { notify } from "components/core/toast";

const AddBell = () => {
  const history = useHistory();
  const { mutate } = useMutation(addBell, {
    onSuccess: () => {
      notify.success("زنگ با موفقیت اضافه شد.");
      history.replace("../bells");
    },
  });

  return (
    <Page title="افزودن زنگ" type="inner" backTo="pop">
      <BellForm
        onSumbit={(values) => {
          mutate(values);
        }}
      />
    </Page>
  );
};

export default AddBell;
