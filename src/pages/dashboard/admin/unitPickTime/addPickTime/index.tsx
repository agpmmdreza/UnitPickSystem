import { addUnitPickTime } from "api/unitPickTime";
import { Years } from "components/common/dropdownField/years";
import Button from "components/core/button";
import Grid from "components/core/Grid";
import { notify } from "components/core/toast";
import FormDatePicker from "components/form/formDatePicker";
import { CalendarBold } from "components/icon";
import Page from "components/layout/page";
import { useFormik } from "formik";
import { IMenuOption } from "interfaces";
import { useMutation } from "react-query";
import { useHistory } from "react-router";
import { getFormikFieldProps } from "utils/form";
import yup from "utils/yupExtended";

export interface IAddMajorFields {
  entranceYear: IMenuOption;
  pickTime: string;
  modifyTime: string;
}

export const defaultValues: IAddMajorFields = {
  entranceYear: { key: "", value: "" },
  pickTime: "",
  modifyTime: "",
};

export const ValidationSchema = yup.object().shape({
  entranceYear: yup.object().dropdown(),
  pickTime: yup.date().required(),
  modifyTime: yup.date().required(),
});

const AddPickTime = () => {
  const history = useHistory();

  const { mutate } = useMutation(addUnitPickTime, {
    onSuccess: () => {
      notify.success("زمان انتخاب واحد با موفقیت اضافه شد.");
      history.replace("../unit-pick-time");
    },
  });

  const formik = useFormik<IAddMajorFields>({
    initialValues: defaultValues,
    validationSchema: ValidationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      //   onSumbit(values);
      mutate({ ...values, entranceYear: +values.entranceYear.key });
    },
  });

  return (
    <Page title="افزودن تایم انتخاب واحد" type="main">
      <form onSubmit={formik.handleSubmit}>
        <Grid flowDense>
          <Years formik={formik} fieldName="entranceYear" />
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
