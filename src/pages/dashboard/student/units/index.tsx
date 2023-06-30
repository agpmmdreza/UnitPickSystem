import { getStudentUnits } from "api/timeTable";
import { ITimeTableBellResponse } from "api/timeTableBells";
import Table from "components/core/table";
import Page from "components/layout/page";
import usePagination from "hooks/usePagination";
import { useQuery } from "react-query";

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
      const timeTable = value.row.original.timeTable.timeTableBellList?.map(
        (i: ITimeTableBellResponse) => (
          <div>
            {`${i.day.label} ساعت (${i.bell.label}) هفته ${i.weekType} کلاس ${i.roomNumber}`}
          </div>
        )
      );

      return <span>{timeTable}</span>;
    },
  },
];

const StudentUnits = () => {
  const { handleGotoPage, handleNextPage, handlePreviousPage, pagination } =
    usePagination();

  const { data, isFetching } = useQuery(
    ["studentUnits", pagination.currentPage, pagination.resultsPerPage],
    () => getStudentUnits(),
    {
      keepPreviousData: true,
    }
  );

  const responseData = data?.data.data;
  const fixedData = {
    data: responseData || [],
    ...pagination,
  };

  return (
    <Page title="لیست دروس انتخاب شده" type="main">
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
        title="دروس اخذ شده"
        // actionsComponent={<RegistrationButton title="افزودن زنگ درسی" />}
      />
    </Page>
  );
};

export default StudentUnits;
