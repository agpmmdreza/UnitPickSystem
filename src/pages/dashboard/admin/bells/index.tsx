import { deleteBell, getBellsList, seedBells } from "api/bells";
import { queryClient } from "App";
import { ActionCell } from "components/common/tableCell";
import RegistrationButton from "components/common/tableHeader/registrationButton";
import Button from "components/core/button";
import Table from "components/core/table";
import { notify } from "components/core/toast";
import Page from "components/layout/page";
import usePagination from "hooks/usePagination";
import { useMutation, useQuery } from "react-query";

const COLUMNS = [
  {
    Header: "روز",
    accessor: "label",
  },
  {
    Header: "شماره زنگ در روز",
    accessor: "bellOfDay",
  },
];

const BellList = () => {
  const {
    handleGotoPage,
    handleNextPage,
    handlePreviousPage,
    handleResultsPerPageChange,
    pagination,
    updateMaxPage,
  } = usePagination();

  const { data, refetch, isFetching } = useQuery(
    ["bellsList", pagination.currentPage, pagination.resultsPerPage],
    () => getBellsList({ page: pagination.currentPage }),
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

  const { mutate, isLoading } = useMutation(seedBells, {
    onSuccess: () => {
      queryClient.invalidateQueries(["bellsList"]);
      notify.success("اطلاعات با موفقیت افزوده شد");
    },
  });

  const actionCell = {
    Header: "عملیات",
    accessor: "none",
    Cell: (props: any) =>
      ActionCell({
        cellProps: props,
        refetch,
        deleteMutationFn: deleteBell,
      }),
  };

  return (
    <Page title="لیست زنگ‌ها" type="main">
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
        title="زنگ‌ها"
        actionsComponent={
          <div className="d-flex gap-2">
            <Button
              color="secondary"
              disabled={isLoading}
              onClick={() => mutate()}
            >
              افزودن خودکار داده
            </Button>
            <RegistrationButton title="افزودن زنگ" />
          </div>
        }
      />
    </Page>
  );
};

export default BellList;
