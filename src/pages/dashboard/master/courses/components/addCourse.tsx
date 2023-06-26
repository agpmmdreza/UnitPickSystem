import Page from "components/layout/page";
import { useMutation, useQueryClient } from "react-query";
import { notify } from "components/core/toast";
import { useHistory } from "react-router";
import { addCourse } from "api/courses";
import CourseForm from "./courseForm";

const AddCourse = () => {
  const history = useHistory();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(addCourse, {
    onSuccess: () => {
      queryClient.invalidateQueries(["courseList"]);
      queryClient.invalidateQueries(["courseById"]);
      notify.success("درس با موفقیت اضافه شد.");
      history.replace("../courses");
    },
  });

  return (
    <Page title="افزودن درس" type="inner" backTo="pop">
      <CourseForm
        onSumbit={(values) => {
          mutate(values);
        }}
      />
    </Page>
  );
};

export default AddCourse;
