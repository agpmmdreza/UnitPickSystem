import yup from "utils/yupExtended";
import Grid from "components/core/Grid";
import { useFormik } from "formik";
import { useHistory } from "react-router";
import Button from "components/core/button";
import FormInput from "components/form/formInput";
import { UserBold } from "components/icon";
import { getFormikFieldProps } from "utils/form";

const REQUIRED_FIELD_MESSAGE = "This field is required.";

export interface IAddMajorFields {
  majorName: string;
}

interface IMajorFormProps {
  onSumbit: (values: IAddMajorFields) => void;
  initialValues?: IAddMajorFields;
}

export const defaultValues: IAddMajorFields = {
  majorName: "",
};
export const ValidationSchema = yup.object().shape({
  majorName: yup.string().required(REQUIRED_FIELD_MESSAGE),
});

const MajorForm = ({ onSumbit, initialValues }: IMajorFormProps) => {
  const history = useHistory();
  const formik = useFormik<IAddMajorFields>({
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
          {...getFormikFieldProps("majorName", "عنوان رشته", formik)}
          rootProps={{ placeholder: "عنوان رشته", icon: UserBold }}
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
        <Button type="submit">ثبت رشته</Button>
      </div>
    </form>
  );
};

export default MajorForm;
