import {
  acceptTimeTable,
  ITimeTableResponse,
  masterTimeList,
} from "api/timeTable";
import { ITimeTableBellResponse } from "api/timeTableBells";
import { queryClient } from "App";
import RegistrationButton from "components/common/tableHeader/registrationButton";
import Button from "components/core/button";
import Chip from "components/core/chip";
import { Dropdown } from "components/core/dropdown";
import DropdownItem from "components/core/dropdownItem";
import { DropdownMenu } from "components/core/dropdownMenu";
import Table from "components/core/table";
import { notify } from "components/core/toast";
import { ActionMenuBold } from "components/icon";
import Page from "components/layout/page";
import usePagination from "hooks/usePagination";
import { useMutation, useQuery } from "react-query";
import { Cell } from "react-table";
import { isClassJoinTime } from "utils/time";
import { generateUUIDv4 } from "utils/uuid";
import OnlineClass from "./components/onlineClass";
import { io, Socket } from "socket.io-client";
import { useEffect, useState } from "react";

const getChipColor = (v: string) => {
  switch (v) {
    case "accepted":
      return "success";
    case "not_accepted":
      return "danger";
  }
};

const COLUMNS = [
  {
    Header: "آیدی",
    accessor: "id",
  },
  {
    Header: "عنوان",
    accessor: "course.title",
  },
  {
    Header: "تعداد واحد",
    accessor: "course.unitsCount",
  },
  {
    Header: "ترم",
    accessor: "term",
  },
  {
    Header: "اطلاعات درس",
    accessor: "course",
    Cell: (value: any) => {
      return (
        <>
          {value.row.original.timeTableBellList?.map(
            (i: ITimeTableBellResponse) => (
              <div>
                {`${i.day.label} ساعت (${i.bell.label}) هفته ${i.weekType} کلاس ${i.roomNumber}`}
              </div>
            )
          )}
        </>
      );
    },
  },
  {
    Header: "وضعیت",
    accessor: "status",
    Cell: (value: any) => {
      return (
        <Chip
          text={value.row.original.status}
          color={getChipColor(value.row.original.status)}
        />
      );
    },
  },
];

const Courses = () => {
  const [showClass, setShowClass] = useState(false);

  const {
    handleGotoPage,
    handleNextPage,
    handlePreviousPage,
    handleResultsPerPageChange,
    pagination,
    updateMaxPage,
  } = usePagination();

  const { data, isFetching } = useQuery(
    ["masterCourse", pagination.currentPage, pagination.resultsPerPage],
    () => masterTimeList({ page: pagination.currentPage }),
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

  const { mutate } = useMutation(acceptTimeTable, {
    onSuccess: () => {
      notify.success("درس مورد نظر با موفقیت تایید و اخذ گردید.");
      queryClient.invalidateQueries(["masterCourse"]);
    },
  });

  const responseData = data?.data.data;
  const fixedData = {
    data: responseData ? responseData.list : [],
    ...pagination,
  };

  function renderActionCell(props: Cell<ITimeTableResponse>) {
    const id = "bb" + generateUUIDv4().split("-")[0];
    const row: any = props.row.original;

    if (row.status === "accepted") {
      const shouldShowButton = isClassJoinTime(
        props.row.original.timeTableBellList.map((t) => t.day.label)
      );

      return shouldShowButton ? (
        <Button
          onClick={() => {
            setShowClass(true);
          }}
          size="small"
        >
          پیوستن به کلاس
        </Button>
      ) : null;
    }

    return (
      <Dropdown anchor={"top"}>
        <div id={id}>
          <ActionMenuBold />
        </div>

        <DropdownMenu anchor={"bottom-end"} toggleId={id}>
          <DropdownItem
            onClick={() => mutate(row.id)}
            // className={clsx(classes.patientManagement__dropdownItem)}
          >
            تایید و اخذ درس
          </DropdownItem>

          <DropdownItem
          // className={clsx(classes.patientManagement__dropdownItem)}
          >
            رد کردن درس
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  return (
    <Page title="دروس" type="main">
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
        columns={[
          ...COLUMNS,
          { Header: "عملیات", accessor: "actions", Cell: renderActionCell },
        ]}
        {...{ isFetching }}
        title="لیست دروس"
        actionsComponent={<RegistrationButton title="افزودن درس" />}
      />
      {showClass && <OnlineClass />}
    </Page>
  );
};

export default Courses;
