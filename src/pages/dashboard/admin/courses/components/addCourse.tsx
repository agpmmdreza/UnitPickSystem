import Page from "components/layout/page";
import { useMutation } from "react-query";
import TimeTableForm from "./courseForm";
import { notify } from "components/core/toast";
import { useHistory } from "react-router";
import { addCourse } from "api/courses";
import CourseForm from "./courseForm";

const AddCourse = () => {
  const history = useHistory();

  const { mutate } = useMutation(addCourse, {
    onSuccess: () => {
      notify.success("درس با موفقیت اضافه شد.");
      history.replace("../time-table-bells");
    },
  });

  return (
    <Page title="افزودن زنگ درسی" type="inner" backTo="pop">
      <CourseForm
        onSumbit={(values) => {
          mutate(values);
        }}
      />
    </Page>
  );
};

export default AddCourse;
