import { studentTimeList } from "api/timeTable";
import { MasterCourses } from "components/common/dropdownField/masterCourses";
import RegistrationButton from "components/common/tableHeader/registrationButton";
import Table from "components/core/table";
import Page from "components/layout/page";
import { useFormik } from "formik";
import usePagination from "hooks/usePagination";
import { IMenuOption } from "interfaces";
import { useQuery } from "react-query";
import { useHistory } from "react-router";
import yup from "utils/yupExtended";
import classes from "./components/styles.module.scss";
import Loader from "react-spinners/BeatLoader";

const COLUMNS = [
  {
    Header: "نام",
    accessor: "student.user.firstName",
  },
  {
    Header: "نام خانوادگی",
    accessor: "student.user.lastName",
  },
  {
    Header: "عمده",
    accessor: "student.major.majorName",
  },
  {
    Header: "نمره",
    accessor: "grade",
  },
];

const StudentList = () => {
  const {
    handleGotoPage,
    handleNextPage,
    handlePreviousPage,
    handleResultsPerPageChange,
    pagination,
    updateMaxPage,
  } = usePagination();

  interface ITimeTableForm {
    timeTableId: IMenuOption;
  }

  const defaultValues: ITimeTableForm = {
    timeTableId: { key: "", value: "" },
  };

  const ValidationSchema = yup.object().shape({
    timeTableId: yup.object().dropdown(),
  });

  const formik = useFormik<ITimeTableForm>({
    initialValues: defaultValues,
    validationSchema: ValidationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {},
  });

  const { data, isLoading, isFetching } = useQuery(
    ["studentTimeList", pagination.currentPage, pagination.resultsPerPage],
    () =>
      studentTimeList(formik.values.timeTableId.key, {
        page: pagination.currentPage,
      }),
    {
      enabled: !!formik.values.timeTableId.key,
      onSuccess: (data) => {
        console.log(data);

        const result = data?.data.data;
        if (result) {
          updateMaxPage(
            Math.floor(result.total / pagination.resultsPerPage) + 1
          );
        }
      },
    }
  );

  const responseData = data?.data.data;
  const fixedData = {
    data: responseData ? responseData.list : [],
    ...pagination,
  };

  return (
    <Page title="لیست دانشجویان" type="inner" backTo="pop">
      <MasterCourses
        formik={formik}
        bellFieldName="timeTableId"
        label="لیست دروس"
      />
      <div className={classes.marginTop}>
        {(isLoading || isFetching) && (
          <div className={classes.margin}>
            <Loader />
          </div>
        )}
        {!isLoading &&
          !isFetching &&
          formik.values.timeTableId.key &&
          data?.data?.data?.list &&
          data?.data?.data?.list.length > 0 && (
            <Table
              onRowSelect={(results) => {}}
              onNextPage={handleNextPage}
              onPreviousPage={handlePreviousPage}
              onResultsPerPageChange={(v) =>
                handleResultsPerPageChange(v, data?.data.data?.total)
              }
              resultsPerPage={pagination.resultsPerPage}
              onGoToPage={handleGotoPage}
              fetchedData={fixedData}
              columns={[...COLUMNS]}
              {...{ isFetching }}
              title="لیست دانشجویان"
              actionsComponent={
                <RegistrationButton
                  title="ثبت نمرات"
                  pathname={`/panel/master/submit-grade/${formik.values.timeTableId.key}`}
                />
              }
            />
          )}
      </div>
    </Page>
  );
};

export default StudentList;
