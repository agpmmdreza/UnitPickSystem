import { deleteDay } from "api/days";
import { getStudentUnits } from "api/timeTable";
import { ActionCell } from "components/common/tableCell";
import RegistrationButton from "components/common/tableHeader/registrationButton";
import Table from "components/core/table";
import Page from "components/layout/page";
import usePagination from "hooks/usePagination";
import { useQuery } from "react-query";

const COLUMNS = [
  {
    Header: "آیدی",
    accessor: "id",
  },
  {
    Header: "ترم",
    accessor: "term",
  },
  {
    Header: "نوع هفته",
    accessor: "weekType",
  },
  {
    Header: "شماره اتاق",
    accessor: "roomNumber",
  },
];

const StudentUnits = () => {
  const {
    handleGotoPage,
    handleNextPage,
    handlePreviousPage,
    handleResultsPerPageChange,
    pagination,
    updateMaxPage,
  } = usePagination();

  const { data, refetch, isFetching } = useQuery(
    ["studentUnits", pagination.currentPage, pagination.resultsPerPage],
    () => getStudentUnits(),
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

  const actionCell = {
    Header: "عملیات",
    accessor: "none",
    Cell: (props: any) =>
      ActionCell({
        cellProps: props,
        refetch,
        deleteMutationFn: deleteDay,
      }),
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
        columns={[...COLUMNS, actionCell]}
        {...{ isFetching }}
        title="زنگ‌های درسی"
        actionsComponent={<RegistrationButton title="افزودن زنگ درسی" />}
      />
    </Page>
  );
};

export default StudentUnits;
