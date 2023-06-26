import { submitStudentGrades } from "api/timeTable";
import { notify } from "components/core/toast";
import Page from "components/layout/page";
import { useMutation, useQueryClient } from "react-query";
import { useHistory } from "react-router";
import GradesForm from "./gradesForm";

const AddCourse = () => {
  const history = useHistory();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(submitStudentGrades, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studentTimeList"] });
      notify.success("نمره با موفقیت ثبت شد.");
      history.replace("../");
    },
  });

  return (
    <Page title="ثبت نمرات" type="inner" backTo="pop">
      <GradesForm
        onSumbit={(values) => {
          mutate(values);
        }}
      />
    </Page>
  );
};

export default AddCourse;
