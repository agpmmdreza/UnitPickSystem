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
  bellId: number;
  dayId: number;
  roomNumber: number;
  weekType: IMenuOption;
}

export const defaultValues: ITimeTableForm = {
  bellId: 1,
  dayId: 1,
  roomNumber: 1,
  weekType: { key: "", value: "" },
};

export const ValidationSchema = yup.object().shape({
  bellId: yup.number().required(REQUIRED_FIELD_MESSAGE),
  dayId: yup.number().required(REQUIRED_FIELD_MESSAGE),
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
      onSumbit({ ...values, weekType: values.weekType.key });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid flowDense>
        <FormInput
          {...getFormikFieldProps("dayId", "آیدی روز", formik)}
          rootProps={{ placeholder: "آیدی روز", icon: UserBold }}
        />

        <FormInput
          {...getFormikFieldProps("bellId", "آیدی زنگ", formik)}
          rootProps={{ placeholder: "آیدی زنگ", icon: UserBold }}
        />

        <FormInput
          {...getFormikFieldProps("roomNumber", "شماره اتاق", formik)}
          rootProps={{ placeholder: "شماره اتاق", icon: UserBold }}
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
