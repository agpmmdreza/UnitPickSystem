import yup from "utils/yupExtended";
import Grid from "components/core/Grid";
import { useFormik } from "formik";
import { useHistory } from "react-router";
import Button from "components/core/button";
import FormInput from "components/form/formInput";
import { UserBold } from "components/icon";
import { getFormikFieldProps } from "utils/form";
import { IMenuOption } from "interfaces";
import { ITimeTableBellData } from "api/timeTableBells";
import { WeekType } from "components/common/dropdownField/weekType";
import { Days } from "components/common/dropdownField/days";
import { Bells } from "components/common/dropdownField/bells";
import { Courses } from "components/common/dropdownField/courses";
import { CoursesDropdown } from "components/common/dropdownField/coursesDropdown";
import { UsersByRole } from "components/common/dropdownField/userListByRole";
import { TimeTableBellMultiSelect } from "components/common/dropdownField/timeTableBellMutli";
import { ITimeTableData } from "api/timeTable";

const REQUIRED_FIELD_MESSAGE = "This field is required.";

export interface IAddUserFields {
  firstName: string;
  lastName: string;
  code: string;
  password: string;
  entranceYear: string;
  major: string;
  role: IMenuOption;
}

interface ITimeTableFormProps {
  onSumbit: (values: ITimeTableData) => void;
  initialValues?: ITimeTableForm;
}

interface ITimeTableForm {
  courseId: IMenuOption;
  masterId: IMenuOption;
  timeTableBellsId: IMenuOption[];
}

export const defaultValues: ITimeTableForm = {
  courseId: { key: "", value: "" },
  masterId: { key: "", value: "" },
  timeTableBellsId: [],
};

export const ValidationSchema = yup.object().shape({
  courseId: yup.object().dropdown(),
  masterId: yup.object().dropdown(),
});

const TimeTableForm = ({ onSumbit, initialValues }: ITimeTableFormProps) => {
  const history = useHistory();
  const formik = useFormik<ITimeTableForm>({
    initialValues: initialValues || defaultValues,
    validationSchema: ValidationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      onSumbit({
        courseId: +values.courseId.key,
        masterId: +values.masterId.key,
        timeTableBellsId: values.timeTableBellsId.map((i) => +i.key),
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid flowDense>
        <CoursesDropdown
          formik={formik}
          courseFieldName="courseId"
          label="درس"
        />

        <UsersByRole
          formik={formik}
          userFieldName="masterId"
          label="استاد"
          role="master"
        />

        <TimeTableBellMultiSelect
          formik={formik}
          timeTableFieldName="timeTableBellsId"
          label="زنگهای درسی"
        />
      </Grid>
      <div className="d-flex gap-2 justify-content-end mt-5 pt-5">
        <Button
          color={"secondary"}
          variant={"outlined"}
          onClick={() => history.goBack()}
        >
          لغو
        </Button>
        <Button type="submit">ثبت </Button>
      </div>
    </form>
  );
};

export default TimeTableForm;
