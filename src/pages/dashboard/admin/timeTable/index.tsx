import { getTimeTablesList } from "api/timeTable";
import { TERM_OPTIONS } from "components/common/dropdownField/terms";
import RegistrationButton from "components/common/tableHeader/registrationButton";
import { IFilter, IFilterValue } from "components/core/filter";
import Table from "components/core/table";
import Page from "components/layout/page";
import usePagination from "hooks/usePagination";
import { useState } from "react";
import { useQuery } from "react-query";

const COLUMNS = [
  {
    Header: "درس",
    accessor: "course.title",
  },
  {
    Header: "استاد",
    accessor: "master.user.firstName",
    Cell: (value: any) => {
      return (
        <span>{`${value.row.original.master.user.firstName} ${value.row.original.master.user.lastName}`}</span>
      );
    },
  },
  {
    Header: "رشته",
    accessor: "master.major.majorName",
  },
  {
    Header: "ترم",
    accessor: "term",
  },
  {
    Header: "اطلاعات برنامه زمانی",
    accessor: "roomNumber",
    Cell: (value: any) => {
      const timeTable = value.row.original.timeTableBellList[0];
      const day = timeTable?.day.label;
      const bell = timeTable?.bell.label;
      const weekType = timeTable?.weekType;
      const roomNumber = timeTable?.roomNumber;
      return (
        <span>
          {timeTable &&
            `${day} (${bell}) - هفته های ${weekType} - کلاس ${roomNumber}`}
        </span>
      );
    },
  },
];

export function getFilterParamsByValue(
  filters: IFilterValue[],
  index: number,
  accessor: "value" | "key" = "value"
) {
  if (filters[index]) {
    return filters[index].filters.map((item) => item[accessor]);
  }
  return [];
}

const TimeTableBells = () => {
  const {
    handleGotoPage,
    handleNextPage,
    handlePreviousPage,
    handleResultsPerPageChange,
    pagination,
    updateMaxPage,
  } = usePagination();
  const [filters, setFilters] = useState<IFilter[]>([]);
  const filValue = getFilterParamsByValue(filters, 0, "key");

  const { data, isFetching } = useQuery(
    [
      "timeTableList",
      pagination.currentPage,
      pagination.resultsPerPage,
      filters,
    ],
    () =>
      getTimeTablesList({
        page: pagination.currentPage,
        term: filValue[filValue.length - 1],
      }),
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

  // const actionCell = {
  //   Header: "عملیات",
  //   accessor: "none",
  //   Cell: (props: any) =>
  //     ActionCell({
  //       cellProps: props,
  //       refetch,
  //       deleteMutationFn: deleteDay,
  //     }),
  // };

  return (
    <Page title="لیست برنامه های زمانی " type="main">
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
        filterProps={{
          options: [
            {
              title: "ترم",
              filters: TERM_OPTIONS,
            },
          ],
          value: filters,
          onFilterSelect(filters) {
            setFilters(filters);
          },
        }}
        {...{ isFetching }}
        title="برنامه زمانی"
        actionsComponent={<RegistrationButton title="افزودن برنامه زمانی" />}
      />
    </Page>
  );
};

export default TimeTableBells;
