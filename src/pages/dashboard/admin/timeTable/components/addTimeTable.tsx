import Page from "components/layout/page";
import { useMutation } from "react-query";
import TimeTableForm from "./timeTableForm";
import { notify } from "components/core/toast";
import { useHistory } from "react-router";
import { addTimeTable } from "api/timeTable";

const AddTimeTableBell = () => {
  const history = useHistory();

  const { mutate } = useMutation(addTimeTable, {
    onSuccess: () => {
      notify.success("برنامه درسی با موفقیت اضافه شد.");
      history.replace("../time-table");
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
