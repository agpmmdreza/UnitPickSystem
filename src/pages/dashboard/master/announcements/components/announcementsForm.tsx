import { IAnnouncementData } from "api/timeTable";
import { MasterCourses } from "components/common/dropdownField/masterCourses";
import Grid from "components/core/Grid";
import Button from "components/core/button";
import FormTextarea from "components/form/formTextarea";
import { UserBold } from "components/icon";
import { useFormik } from "formik";
import { IMenuOption } from "interfaces";
import { useHistory } from "react-router";
import { getFormikFieldProps } from "utils/form";
import yup from "utils/yupExtended";

const REQUIRED_FIELD_MESSAGE = "This field is required.";

export interface IAddUserFields {
  timeTableId: string;
  message: string;
}

interface ITimeTableFormProps {
  onSumbit: (values: IAnnouncementData) => void;
  initialValues?: ITimeTableForm;
}

interface ITimeTableForm {
  timeTableId: IMenuOption;
  message: string;
}

export const defaultValues: ITimeTableForm = {
  timeTableId: { key: "", value: "" },
  message: "",
};

export const ValidationSchema = yup.object().shape({
  timeTableId: yup.object().dropdown(),
  message: yup.string().required(REQUIRED_FIELD_MESSAGE),
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
        message: values.message,
        timeTableId: +values.timeTableId.key,
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid flowDense>
        <MasterCourses
          formik={formik}
          bellFieldName="timeTableId"
          label="لیست دروس"
          timeTableId={initialValues?.timeTableId.key}
        />

        <FormTextarea
          {...getFormikFieldProps("message", "پیام", formik)}
          rootProps={{ placeholder: "پیام خود را وارد کنید", icon: UserBold }}
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
        <Button type="submit">ثبت اطلاعیه</Button>
      </div>
    </form>
  );
};

export default TimeTableForm;
