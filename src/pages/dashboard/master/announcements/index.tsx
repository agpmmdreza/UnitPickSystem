import { deleteAnnouncement, getAnnouncementsList } from "api/announcements";
import { ActionCell } from "components/common/tableCell";
import RegistrationButton from "components/common/tableHeader/registrationButton";
import Table from "components/core/table";
import Page from "components/layout/page";
import usePagination from "hooks/usePagination";
import { useQuery } from "react-query";

const COLUMNS = [
  {
    Header: "درس",
    accessor: "timeTable.course.title",
  },
  {
    Header: "اطلاعیه",
    accessor: "message",
  },
];

const AnnouncementsList = () => {
  const {
    handleGotoPage,
    handleNextPage,
    handlePreviousPage,
    handleResultsPerPageChange,
    pagination,
    updateMaxPage,
  } = usePagination();

  const { data, refetch, isFetching } = useQuery(
    ["announcementsList", pagination.currentPage, pagination.resultsPerPage],
    () => getAnnouncementsList({ page: pagination.currentPage }),
    {
      keepPreviousData: true,
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

  console.log(fixedData);

  const actionCell = {
    Header: "عملیات",
    accessor: "none",
    Cell: (props: any) =>
      ActionCell({
        cellProps: props,
        refetch,
        deleteMutationFn: deleteAnnouncement,
      }),
  };

  return (
    <Page title="لیست اطلاعیه‌ها" type="main">
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
        title="اطلاعیه‌ها"
        actionsComponent={<RegistrationButton title="افزودن اطلاعیه" />}
      />
    </Page>
  );
};

export default AnnouncementsList;
