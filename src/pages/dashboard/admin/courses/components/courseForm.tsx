import yup from "utils/yupExtended";
import Grid from "components/core/Grid";
import { useFormik } from "formik";
import { useHistory } from "react-router";
import Button from "components/core/button";
import FormInput from "components/form/formInput";
import { UserBold } from "components/icon";
import { getFormikFieldProps } from "utils/form";
import { IMenuOption } from "interfaces";
import { ICourseData } from "api/courses";
import FormNumberInput from "components/form/formNumberInput";
import FormMultiSelect from "components/form/formMultiSelect";
import { Courses } from "components/common/dropdownField/courses";

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

interface ICourseFormProps {
  onSumbit: (values: ICourseData) => void;
  initialValues?: ICourseForm;
}

interface ICourseForm {
  title: string;
  unitsCount: number;
  prerequisiteList: string[];
}

export const defaultValues: ICourseForm = {
  title: "",
  unitsCount: 1,
  prerequisiteList: [],
};

export const ValidationSchema = yup.object().shape({
  title: yup.string().required(REQUIRED_FIELD_MESSAGE),
  unitsCount: yup.number().required(REQUIRED_FIELD_MESSAGE),
  // prerequisiteList: yup.number().required(REQUIRED_FIELD_MESSAGE),
});

const CourseForm = ({ onSumbit, initialValues }: ICourseFormProps) => {
  const history = useHistory();
  const formik = useFormik<ICourseForm>({
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
          {...getFormikFieldProps("dayId", "عنوان درس", formik)}
          rootProps={{ placeholder: "عنوان درس", icon: UserBold }}
        />

        <FormNumberInput
          rootProps={{
            size: "big",
            min: 1,
            max: 7,
          }}
          {...getFormikFieldProps("unitsCount", "تعداد واحد", formik)}
        />

        <Courses courseFieldName="prerequisiteList" formik={formik} />
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

export default CourseForm;
