import { ISubmitGrades, studentTimeList } from "api/timeTable";
import Grid from "components/core/Grid";
import Button from "components/core/button";
import FormNumberInput from "components/form/formNumberInput";
import { FormikProvider, useFormik } from "formik";
import usePagination from "hooks/usePagination";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { useHistory, useParams } from "react-router";
import Loader from "react-spinners/BeatLoader";
import { getFormikFieldProps } from "utils/form";
import yup from "utils/yupExtended";
import classes from "./styles.module.scss";
import ListItem from "components/common/list/components/listItem";

const REQUIRED_FIELD_MESSAGE = "This field is required.";

interface RouteParams {
  id: string;
}

interface IGrade {
  id: string;
  grade: string;
}

export interface IAddUserFields {
  grades: IGrade[];
}

interface ITimeTableFormProps {
  onSumbit: (values: ISubmitGrades) => void;
  initialValues?: ITimeTableForm;
}

interface ITimeTableForm {
  grades: IGrade[];
}

export const defaultValues: ITimeTableForm = {
  grades: [{ id: "", grade: "" }],
};

export const ValidationSchema = yup.object().shape({
  // timeTableId: yup.object().dropdown(),
  // grades: yup.object().shape({
  //   id: yup.string().required(REQUIRED_FIELD_MESSAGE),
  //   grade: yup.string().required(REQUIRED_FIELD_MESSAGE),
  // }),
});

const GradesForm = ({ onSumbit, initialValues }: ITimeTableFormProps) => {
  const { pagination, updateMaxPage } = usePagination();
  const history = useHistory();
  const { id } = useParams<RouteParams>();
  const formik = useFormik<ITimeTableForm>({
    initialValues: initialValues || defaultValues,
    validationSchema: ValidationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      const reportGrade: IGrade[] = values.grades.map((item) => {
        return { id: item.id, grade: item.grade.toString() };
      });

      onSumbit({ id, reportGrade });
    },
  });

  const { data, isLoading, isFetching } = useQuery(
    ["studentTimeList"],
    () =>
      studentTimeList(id, {
        page: 1,
        pageSize: 1000,
      }),
    {
      enabled: !!id,
      onSuccess: (data) => {
        const result = data?.data.data;
        if (result) {
          updateMaxPage(
            Math.floor(result.total / pagination.resultsPerPage) + 1
          );
        }
      },
    }
  );

  // useEffect(() => {
  //   if (data && data.data.data) {
  //     const updatedGrades = data.data.data.list.map((item) => ({
  //       id: item.user.id,
  //       grade: "",
  //     }));

  //     formik.setFieldValue("grades", updatedGrades);
  //   }
  // }, [data, formik]);
  useMemo(() => {
    if (data && data.data.data) {
      const updatedGrades = data.data.data.list.map((item) => ({
        id: item.student.id,
        grade: "",
      }));

      formik.setFieldValue("grades", updatedGrades);
    }
  }, [data]);

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        {(isLoading || isFetching) && (
          <div className={classes.margin}>
            <Loader />
          </div>
        )}
        <div>
          {!isLoading &&
            !isFetching &&
            data?.data.data?.list.map((item, index: number) => (
              <div className="row">
                <div className="col">
                  <ListItem
                    data={{
                      title: `${item.student.user.firstName} ${item.student.user.lastName}`,
                      columns: [
                        {
                          label: "کد دانشجو: ",
                          value: item.student.id.toString(),
                        },
                        {
                          label: "رشته: ",
                          value: item.student.major.majorName,
                        },
                        {
                          label: "نمره: ",
                          value: item.grade.toString(),
                        },
                      ],
                    }}
                  />
                </div>
                <div className="col col-lg-2 m-auto">
                  <FormNumberInput
                    {...getFormikFieldProps(
                      `grades[${index}].grade`,
                      "",
                      formik
                    )}
                  />
                </div>
              </div>
            ))}
        </div>
        <div className="d-flex gap-2 justify-content-end mt-5 pt-5">
          <Button
            color={"secondary"}
            variant={"outlined"}
            onClick={() => history.goBack()}
          >
            لغو
          </Button>
          <Button type="submit">ثبت نمرات </Button>
        </div>
      </form>
    </FormikProvider>
  );
};

export default GradesForm;
