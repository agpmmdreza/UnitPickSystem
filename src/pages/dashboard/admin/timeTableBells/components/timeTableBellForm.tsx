import yup from "utils/yupExtended";
import Grid from "components/core/Grid";
import { useFormik } from "formik";
import { useHistory } from "react-router";
import Button from "components/core/button";
import FormInput from "components/form/formInput";
import { getFormikFieldProps } from "utils/form";
import { IMenuOption } from "interfaces";
import { ITimeTableBellData } from "api/timeTableBells";
import { WeekType } from "components/common/dropdownField/weekType";
import { Days } from "components/common/dropdownField/days";
import { Bells } from "components/common/dropdownField/bells";

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
  onSumbit: (values: ITimeTableBellData) => void;
  initialValues?: ITimeTableForm;
}

interface ITimeTableForm {
  bellId: IMenuOption;
  dayId: IMenuOption;
  roomNumber: number;
  weekType: IMenuOption;
}

export const defaultValues: ITimeTableForm = {
  bellId: { key: "", value: "" },
  dayId: { key: "", value: "" },
  roomNumber: 1,
  weekType: { key: "", value: "" },
};

export const ValidationSchema = yup.object().shape({
  bellId: yup.object().dropdown(),
  dayId: yup.object().dropdown(),
  roomNumber: yup.number().required(REQUIRED_FIELD_MESSAGE),
  weekType: yup.object().dropdown(),
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
        dayId: +values.dayId.key,
        bellId: +values.bellId.key,
        weekType: values.weekType.key,
        roomNumber: values.roomNumber,
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid flowDense>
        <Days
          formik={formik}
          dayFieldName="dayId"
          label="روز"
          dayId={initialValues?.dayId.key}
        />

        <Bells
          formik={formik}
          bellFieldName="bellId"
          label="زنگ"
          bellId={initialValues?.bellId.key}
        />

        <FormInput
          {...getFormikFieldProps("roomNumber", "شماره اتاق", formik)}
          rootProps={{ placeholder: "شماره اتاق" }}
        />

        <WeekType
          formik={formik}
          fieldName="weekType"
          weekTypeId={initialValues?.weekType.key}
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
        <Button type="submit">ثبت زنگ درسی</Button>
      </div>
    </form>
  );
};

export default TimeTableForm;
