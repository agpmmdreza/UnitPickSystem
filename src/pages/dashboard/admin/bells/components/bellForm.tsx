import yup from "utils/yupExtended";
import Grid from "components/core/Grid";
import { useFormik } from "formik";
import { useHistory } from "react-router";
import Button from "components/core/button";
import FormInput from "components/form/formInput";
import { UserBold } from "components/icon";
import { getFormikFieldProps } from "utils/form";
import { IMenuOption } from "interfaces";
import FormNumberInput from "components/form/formNumberInput";
import { IBellData } from "api/bells";
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

interface IBellFormProps {
  onSumbit: (values: IBellData) => void;
  initialValues?: IBellData;
}

export const defaultValues: IBellData = {
  bellOfDay: 1,
  label: "",
};
export const ValidationSchema = yup.object().shape({
  bellOfDay: yup.number().required(REQUIRED_FIELD_MESSAGE),
  label: yup.string().required(REQUIRED_FIELD_MESSAGE),
});

const BellForm = ({ onSumbit, initialValues }: IBellFormProps) => {
  const history = useHistory();
  const formik = useFormik<IBellData>({
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
          {...getFormikFieldProps("label", "نام زنگ", formik)}
          rootProps={{ placeholder: "نام زنگ", icon: UserBold }}
        />

        <FormNumberInput
          rootProps={{
            size: "big",
            min: 1,
            max: 7,
          }}
          {...getFormikFieldProps("bellOfDay", "شماره زنگ در روز", formik)}
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
        <Button type="submit">ثبت زنگ</Button>
      </div>
    </form>
  );
};

export default BellForm;
