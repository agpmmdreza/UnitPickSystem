import Page from "components/layout/page";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useHistory, useParams } from "react-router";
import { IParam } from "interfaces/param";
import { notify } from "components/core/toast";
import { getCoursesById, ICourseData, updateCourse } from "api/courses";
import CourseForm from "./courseForm";

const EditUser = () => {
  const { id } = useParams<IParam>();
  const history = useHistory();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(["courseById", id], () =>
    getCoursesById(Number(id))
  );
  const { mutate } = useMutation(
    (data: ICourseData) => updateCourse(Number(id), data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["courseList"]);
        queryClient.invalidateQueries(["courseById"]);
        notify.success("زنگ با موفقیت ویرایش شد.");
        history.replace("../courses");
      },
    }
  );

  return (
    <Page title="ویرایش درس" type="inner" backTo="pop">
      {!isLoading && (
        <CourseForm
          initialValues={
            data?.data.data && {
              ...data?.data.data,
              prerequisiteList: data?.data?.data?.coursePrerequisiteList?.map(
                (i) => ({
                  key: i.id.toString(),
                  value: i.title,
                })
              ),
            }
          }
          onSumbit={(values) => {
            mutate(values);
          }}
        />
      )}
    </Page>
  );
};

export default EditUser;
