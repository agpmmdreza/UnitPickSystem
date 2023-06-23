import { deleteUser, getUserList } from "api/users";
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
    Header: "نام",
    accessor: "firstName",
  },
  {
    Header: "نام خانوادگی",
    accessor: "lastName",
  },
  {
    Header: "نقش",
    accessor: "role",
  },
  {
    Header: "نام کاربری",
    accessor: "code",
  },
];

const UsersList = () => {
  const {
    handleGotoPage,
    handleNextPage,
    handlePreviousPage,
    handleResultsPerPageChange,
    pagination,
    updateMaxPage,
  } = usePagination();

  const { data, isLoading, isError, refetch, isFetching } = useQuery(
    ["getFacilities", pagination.currentPage, pagination.resultsPerPage],
    () => getUserList({ page: pagination.currentPage }),
    {
      keepPreviousData: true,
      onSuccess: (data) => {
        const result = data?.data.data;
        if (result) {
          updateMaxPage(result.totalPage);
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
        deleteMutationFn: deleteUser,
      }),
  };

  return (
    <Page title="لیست کاربران" type="main">
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
        title="کابران"
        actionsComponent={<RegistrationButton title="افزودن کاربر" />}
      />
    </Page>
  );
};

export default UsersList;
