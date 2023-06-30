import { deleteUnitPickTime, getUnitPickTimeList } from "api/unitPickTime";
import { ActionCell } from "components/common/tableCell";
import RegistrationButton from "components/common/tableHeader/registrationButton";
import Table from "components/core/table";
import Page from "components/layout/page";
import usePagination from "hooks/usePagination";
import { useQuery } from "react-query";
import { convertToDateAndTime } from "utils/time";

const COLUMNS = [
  {
    Header: "سال ورودی",
    accessor: "entranceYear",
  },
  {
    Header: "زمان انتخاب واحد",
    accessor: "pickTime",
    Cell: (value: any) => {
      return <span> {convertToDateAndTime(value.cell.value)} </span>;
    },
  },
  {
    Header: "زمان حذف و اضافه",
    accessor: "modifyTime",
    Cell: (value: any) => {
      return <span> {convertToDateAndTime(value.cell.value)} </span>;
    },
  },
];

const UnitPickList = () => {
  const {
    handleGotoPage,
    handleNextPage,
    handlePreviousPage,
    handleResultsPerPageChange,
    pagination,
    updateMaxPage,
  } = usePagination();

  const { data, refetch, isFetching } = useQuery(
    ["getPickTimes", pagination.currentPage, pagination.resultsPerPage],
    () => getUnitPickTimeList({ page: pagination.currentPage }),
    {
      keepPreviousData: true,
      onSuccess: (data) => {
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
  console.log(fixedData);

  const actionCell = {
    Header: "عملیات",
    accessor: "none",
    Cell: (props: any) =>
      ActionCell({
        cellProps: props,
        refetch,
        deleteMutationFn: deleteUnitPickTime,
        idAccessor: "entranceYear",
      }),
  };

  return (
    <Page title="لیست تایم انتخاب واحد" type="main">
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
        columns={[...COLUMNS, actionCell]}
        {...{ isFetching }}
        title="تایم انتخاب واحد"
        actionsComponent={
          <RegistrationButton title="افزودن تایم انتخاب واحد" />
        }
      />
    </Page>
  );
};

export default UnitPickList;
