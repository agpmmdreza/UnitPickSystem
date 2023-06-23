import { CoursesDropdown } from "components/common/dropdownField/coursesDropdown";
import { TimeTableBellMultiSelect } from "components/common/dropdownField/timeTableBellMutli";
import { UsersByRole } from "components/common/dropdownField/userListByRole";
import Button from "components/core/button";
import Grid from "components/core/Grid";
import Page from "components/layout/page";
import { useFormik } from "formik";
import {
  defaultValues,
  ValidationSchema,
} from "pages/dashboard/admin/unitPickTime/addPickTime";
import { useHistory } from "react-router";

const AddUnit = () => {
  const history = useHistory();
  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: ValidationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      //   onSumbit({
      //     courseId: +values.courseId.key,
      //     masterId: +values.masterId.key,
      //     timeTableBellsId: values.timeTableBellsId.map((i) => +i.key),
      //   });
    },
  });

  return (
    <Page title="انتخاب واحد" type="main">
      <form onSubmit={formik.handleSubmit}>
        <Grid flowDense>
          {/* <CoursesDropdown
            formik={formik}
            courseFieldName="courseId"
            label="درس"
          /> */}

          {/* <UsersByRole
            formik={formik}
            userFieldName="masterId"
            label="استاد"
            role="master"
          /> */}

          <TimeTableBellMultiSelect
            formik={formik}
            timeTableFieldName="timeTableBellsId"
            label="زنگهای درسی"
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
          <Button type="submit">ثبت </Button>
        </div>
      </form>
    </Page>
  );
};

export default AddUnit;
