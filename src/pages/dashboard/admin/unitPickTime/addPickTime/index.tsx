import { addUnitPickTime, IUPickData } from "api/unitPickTime";
import Button from "components/core/button";
import Grid from "components/core/Grid";
import FormDatePicker from "components/form/formDatePicker";
import FormInput from "components/form/formInput";
import { CalendarBold, UserBold } from "components/icon";
import Page from "components/layout/page";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import { useHistory } from "react-router";
import { getFormikFieldProps } from "utils/form";
import yup from "utils/yupExtended";

const REQUIRED_FIELD_MESSAGE = "This field is required.";

export interface IAddMajorFields {
  entranceYear: number;
  pickTime: string;
  modifyTime: string;
}

interface IMajorFormProps {
  onSumbit: (values: IAddMajorFields) => void;
  initialValues?: IAddMajorFields;
}

export const defaultValues: IUPickData = {
  entranceYear: 1399,
  pickTime: "",
  modifyTime: "",
};

export const ValidationSchema = yup.object().shape({
  entranceYear: yup.number().required(),
  pickTime: yup.date().required(),
  modifyTime: yup.date().required(),
});

const AddPickTime = () => {
  const history = useHistory();

  const { mutate } = useMutation(addUnitPickTime);

  const formik = useFormik<IUPickData>({
    initialValues: defaultValues,
    validationSchema: ValidationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      //   onSumbit(values);
      mutate(values);
    },
  });

  return (
    <Page title="افزودن تایم انتخاب واحد" type="main">
      <form onSubmit={formik.handleSubmit}>
        <Grid flowDense>
          <FormInput
            {...getFormikFieldProps("entranceYear", "سال ورود", formik)}
            rootProps={{ placeholder: "سال ورود", icon: UserBold }}
          />
          <FormDatePicker
            noPadding
            {...getFormikFieldProps("pickTime", "زمان انتخاب واحد", formik)}
            icon={CalendarBold}
            placeholder={"زمان انتخاب واحد"}
            //   rootProps={{readOnly: isViewingProfile}}
          />
          <FormDatePicker
            noPadding
            {...getFormikFieldProps("modifyTime", "زمان حذف و اضافه", formik)}
            icon={CalendarBold}
            placeholder="زمان حذف و اضافه"
            //   rootProps={{readOnly: isViewingProfile}}
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
          <Button type="submit">ثبت زمان</Button>
        </div>
      </form>
    </Page>
  );
};

export default AddPickTime;
