import { getStudentUnits, IStudentUnitResponse } from "api/timeTable";
import Table from "components/core/table";
import Page from "components/layout/page";
import usePagination from "hooks/usePagination";
import { useQuery } from "react-query";
import { Cell } from "react-table";

const COLUMNS = [
  {
    Header: "کد درس",
    accessor: "timeTable.course.id",
  },
  {
    Header: "عنوان درس",
    accessor: "timeTable.course.title",
  },
  {
    Header: "ترم",
    accessor: "term",
  },
  {
    Header: "کد گروه",
    accessor: "timeTable.id",
  },
  {
    Header: "زمان کلاس",
    accessor: "timeTabe.timeTableBellList[0]",
    Cell: (value: any) => {
      const timeTable = value.row.original.timeTable.timeTableBellList[0];
      const day = timeTable?.day.label;
      const bell = timeTable?.bell.label;
      const weekType = timeTable?.weekType;
      const roomNumber = timeTable?.roomNumber;
      return (
        <span>
          {" "}
          {timeTable &&
            `${day} (${bell}) - هفته های ${weekType} - کلاس ${roomNumber}`}
        </span>
      );
    },
  },
  {
    Header: "نمره",
    accessor: "grade",
    Cell: (props: Cell<IStudentUnitResponse>) => {
      return (
        <span>
          {props.row.original.grade === 0.25 ? null : props.row.original.grade}
        </span>
      );
    },
  },
];

const GradeReport = () => {
  const { handleGotoPage, handleNextPage, handlePreviousPage, pagination } =
    usePagination();

  const { data, isFetching } = useQuery(
    ["reports", pagination.currentPage, pagination.resultsPerPage],
    () => getStudentUnits({ page: 1 }),
    {
      keepPreviousData: true,
      onSuccess: (data) => {
        // const result = data?.data.data;
        // if (result) {
        //   updateMaxPage(
        //     Math.floor(result.total / pagination.resultsPerPage) + 1
        //   );
        // }
      },
    }
  );

  const responseData = data?.data.data;
  const fixedData = {
    data: responseData || [],
    ...pagination,
  };

  console.log(data?.data);

  return (
    <Page title="گزارش" type="main">
      <Table
        onRowSelect={(results) => {}}
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
        onResultsPerPageChange={(v) => {
          //   handleResultsPerPageChange(v, data?.data.data?.total);
        }}
        resultsPerPage={pagination.resultsPerPage}
        onGoToPage={handleGotoPage}
        fetchedData={fixedData}
        columns={[...COLUMNS]}
        {...{ isFetching }}
        title="کارنامه"
        // actionsComponent={<RegistrationButton title="افزودن زنگ درسی" />}
      />
    </Page>
  );
};

export default GradeReport;
