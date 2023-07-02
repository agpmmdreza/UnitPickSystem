import yup from "utils/yupExtended";
import Grid from "components/core/Grid";
import { useFormik } from "formik";
import { useHistory } from "react-router";
import Button from "components/core/button";
import { getFormikFieldProps } from "utils/form";
import { Years } from "components/common/dropdownField/years";
import FormDatePicker from "components/form/formDatePicker";
import { IUPickData } from "api/unitPickTime";
import moment from "moment";
import { IMenuOption } from "interfaces";

const REQUIRED_FIELD_MESSAGE = "This field is required.";

interface IUnitPickTimeFormProps {
  onSumbit: (values: IUPickData) => void;
  initialValues?: IUnitPickTimeForm;
}

interface IUnitPickTimeForm {
  entranceYear: IMenuOption;
  pickTime: string | Date;
  modifyTime: string | Date;
}

export const defaultValues: IUnitPickTimeForm = {
  entranceYear: { key: "", value: " " },
  pickTime: "",
  modifyTime: "",
};

export const ValidationSchema = yup.object().shape({
  entranceYear: yup.object().dropdown(),
  pickTime: yup.string().required(REQUIRED_FIELD_MESSAGE),
  modifyTime: yup.string().required(REQUIRED_FIELD_MESSAGE),
});

const UnitPickTimeForm = ({
  onSumbit,
  initialValues,
}: IUnitPickTimeFormProps) => {
  const history = useHistory();
  const formik = useFormik<IUnitPickTimeForm>({
    initialValues: initialValues || defaultValues,
    validationSchema: ValidationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      onSumbit({
        entranceYear: +values.entranceYear.key,
        modifyTime: moment(values.modifyTime).utc().format(),
        pickTime: moment(values.pickTime).utc().format(),
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid flowDense>
        <Years
          formik={formik}
          fieldName="entranceYear"
          yearsId={initialValues?.entranceYear.key}
          yearsName={initialValues?.entranceYear.value}
        />
        <FormDatePicker
          noPadding
          {...getFormikFieldProps("pickTime", "زمان انتخاب واحد", formik)}
          placeholder={"زمان انتخاب واحد"}

          //   rootProps={{readOnly: isViewingProfile}}
        />
        <FormDatePicker
          noPadding
          {...getFormikFieldProps("modifyTime", "زمان حذف و اضافه", formik)}
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
  );
};

export default UnitPickTimeForm;
