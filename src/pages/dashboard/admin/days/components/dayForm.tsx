import yup from "utils/yupExtended";
import Grid from "components/core/Grid";
import { useFormik } from "formik";
import { useHistory } from "react-router";
import Button from "components/core/button";
import FormInput from "components/form/formInput";
import { UserBold } from "components/icon";
import { getFormikFieldProps } from "utils/form";
import { IMenuOption } from "interfaces";
import { IDayData } from "api/days";
import FormNumberInput from "components/form/formNumberInput";

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

interface IDayFormProps {
  onSumbit: (values: IDayData) => void;
  initialValues?: IDayData;
}

export const defaultValues: IDayData = {
  dayOfWeek: 1,
  label: "",
};
export const ValidationSchema = yup.object().shape({
  dayOfWeek: yup.number().required(REQUIRED_FIELD_MESSAGE),
  label: yup.string().required(REQUIRED_FIELD_MESSAGE),
});

const DayForm = ({ onSumbit, initialValues }: IDayFormProps) => {
  const history = useHistory();
  const formik = useFormik<IDayData>({
    initialValues: initialValues || defaultValues,
    validationSchema: ValidationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      onSumbit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid flowDense>
        <FormInput
          {...getFormikFieldProps("label", "نام روز", formik)}
          rootProps={{ placeholder: "نام روز", icon: UserBold }}
        />

        <FormNumberInput
          rootProps={{
            size: "big",
            min: 1,
            max: 7,
          }}
          {...getFormikFieldProps("dayOfWeek", "شماره روز در هفته", formik)}
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
        <Button type="submit">ثبت روز</Button>
      </div>
    </form>
  );
};

export default DayForm;
