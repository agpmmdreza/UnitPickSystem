import { chooseUnit, deleteUnit, getStudentUnits } from "api/timeTable";
import { TimeTables } from "components/common/dropdownField/timeTable";
import ListItem from "components/common/list/components/listItem";
import Button from "components/core/button";
import Grid from "components/core/Grid";
import { notify } from "components/core/toast";
import Page from "components/layout/page";
import { useFormik } from "formik";
import { IMenuOption } from "interfaces";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useHistory } from "react-router";
import yup from "utils/yupExtended";

interface ITableTableFields {
  timeTable: IMenuOption;
}

const ValidationSchema = yup.object().shape({
  timeTable: yup.object().dropdown(),
});

const AddUnit = () => {
  const history = useHistory();
  const queryClient = useQueryClient();
  const { mutate } = useMutation(chooseUnit, {
    onSuccess: () => {
      queryClient.invalidateQueries(["studentUnits"]);
      notify.success("درس موردنظر با موفقیت اخذ گردید .");
    },
  });

  const { mutate: deleteUnitById } = useMutation(deleteUnit, {
    onSuccess: () => {
      queryClient.invalidateQueries(["studentUnits"]);
      notify.success("درس موردنظر با موفقیت حذف گردید .");
    },
  });

  const { data } = useQuery(["studentUnits"], () => getStudentUnits(), {
    keepPreviousData: true,
    onSuccess: (data) => {
      // const result = data?.data.data;
      // if (result) {
      //   updateMaxPage(
      //     Math.floor(result.total / pagination.resultsPerPage) + 1
      //   );
      // }
    },
  });

  const formik = useFormik<ITableTableFields>({
    initialValues: { timeTable: { key: "", value: "" } },
    validationSchema: ValidationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      mutate(+values.timeTable.key);
    },
  });

  const handleRemoveUnit = (unitId: number) => {
    deleteUnitById(unitId);
  };

  return (
    <Page title="انتخاب واحد" type="main">
      <form onSubmit={formik.handleSubmit}>
        <Grid flowDense>
          <Grid.Column doubleWidth>
            <TimeTables
              formik={formik}
              timeTableFieldName="timeTable"
              label="درس و زمان مربوطه"
            />
          </Grid.Column>
        </Grid>

        <div className="row gy-2 mt-4">
          {data?.data.data?.map((item, index) => (
            <ListItem
              key={index}
              data={{
                title: item.timeTable.course.title,
                columns: [
                  {
                    label: "کد درس: ",
                    value: item.timeTable.course?.id.toString(),
                  },
                  { label: "کد گروه: ", value: item.timeTable.id.toString() },
                  {
                    label: "زمان: ",
                    value: item.timeTable.timeTableBellList[0]?.day.label,
                  },
                ],
              }}
              deletable
              onDeleteItem={() => handleRemoveUnit(item.timeTable.id)}
            />
          ))}
        </div>

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
