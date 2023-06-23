import Page from "components/layout/page";
import { useMutation } from "react-query";
import TimeTableForm from "./timeTableBellForm";
import { addTimeTableBell } from "api/timeTableBells";
import { notify } from "components/core/toast";
import { useHistory } from "react-router";

const AddTimeTableBell = () => {
  const history = useHistory();

  const { mutate } = useMutation(addTimeTableBell, {
    onSuccess: () => {
      notify.success("زنگ درسی با موفقیت اضافه شد.");
      history.replace("../time-table-bells");
    },
  });

  return (
    <Page title="افزودن زنگ درسی" type="inner" backTo="pop">
      <TimeTableForm
        onSumbit={(values) => {
          mutate(values);
        }}
      />
    </Page>
  );
};

export default AddTimeTableBell;
