/* eslint-disable react-hooks/exhaustive-deps */
import { ArrowLeftLinear, ArrowRightLinear } from "components/icon";
import { PropsWithChildren, ReactNode } from "react";
import IconButton from "../iconButton";
import classes from "./styles.module.scss";
import Loader from "components/common/loader";
import SimpleTable from "./components/simpleTable";
import Filter, { IFilterDefaultProps } from "../filter";
import clsx from "clsx";
import { ListInfo } from "../../icon/listInfo";
import SearchInput from "./components/searchInput";
import Input from "../input";
// import { IPaginationTableList } from "api/types/paginationType";

/** Table types
 * basic => rows and columns as a regular HTML table.
 * custom => data (rows) should be passed as children to the
 * table, so you can have your own table style (e.g., Cards
 * as rows)
 */
type tableType = "basic" | "custom";

/**
 * Interface for table data
 */
export interface IFetchedData {
  currentPage: number;
  maxPage: number;
  resultsPerPage: number;
  data: any[];
}

/**
 * Table search input component properties. This props
 * are passed to the table component and be set to search Input
 * field inside table.
 */
export interface ISearchInputProps {
  /**
   * Value of search field
   * ! if u use the optimizedOnChange then don't need to pass this props
   */
  value?: string;
  /**
   * Function to be called on search input value change
   * ! use optimizedOnChange instead of onChange
   * TODO: remove this function
   */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * this is a optimized version of onchange.
   * indeed this won't let send a request on input change.
   * instead will send a request 3s after the user write his last character in search box.
   */
  optimizedOnChange?: (value: string) => void;

  /** Input placeholder */
  placeholder?: string;
}

/**
 * Interface for table component properties
 */
export interface ITableProps extends PropsWithChildren<any> {
  /** Columns of table */
  columns?: any[];
  /** Number of results shown in a page */
  resultsPerPage: number;
  filterPlaceholder?: string;
  headerTrailingComponent?: ReactNode;
  onRowSelect?: (selectedRows: unknown[]) => void;
  /** These next four props are for pagination */
  onNextPage: () => void;
  onPreviousPage: () => void;
  onGoToPage: (page: number) => void;
  onResultsPerPageChange: (resultPerPage: number) => void;
  /** Fetched data from api that'd be shown in table */
  fetchedData: IFetchedData;
  /** Is app fetching data from api on this moment? */
  isFetching?: boolean;
  activeFlagAccessor?: string | "is_active";
  /** Table type */
  type?: tableType;
  filterComponent?: ReactNode;
  /** Props for filter component inside table */
  filterProps?: IFilterDefaultProps;
  /** Props for Search input inside table */
  searchProps?: ISearchInputProps;
  /** Title of the table */
  title?: string;
  /** Available actions/operations on table (e.g.
   * register new record, change table style, download sheet
   * buttons, ...)   */
  actionsComponent?: ReactNode;
  description?: string;
  nonSelectable?: boolean;
}

// type ConditionalProps =
//   | {
//       type: "custom";
//       fetchedData: never;
//       onRowSelect: never;
//     }
//   | {};

// type ITableNewProps = ConditionalProps & ITableProps;

// table component
function Table({
  // columns,
  // onRowSelect,
  children,
  fetchedData,
  onPreviousPage,
  onNextPage,
  onGoToPage: _,
  onResultsPerPageChange,
  isFetching,
  // activeFlagAccessor = "is_active",
  type = "basic",
  operationsComponent,
  filterProps,
  searchProps,
  actionsComponent,
  title,
  description,
  ...rest
}: ITableProps) {
  return (
    <>
      <div className={classes.container}>
        <div className={clsx(["col-12 p-3", classes.titleContainer])}>
          <div className="col-12 d-flex align-items-center justify-content-between flex-wrap gap-3">
            <div className="d-flex align-items-center">
              {/* <ListInfo /> */}
              <span className={classes.title}>{title}</span>
            </div>

            <div className="d-flex gap-2">
              {!!filterProps && <Filter {...filterProps!} />}
              {actionsComponent}
            </div>
          </div>

          {description && (
            <div className={clsx("col-12 pt-2", classes.tableDescription)}>
              {description}
            </div>
          )}
        </div>

        {/* This line should be removed after changing all tables to new format */}
        {/* {type === "basic" ? children : operationsComponent} */}

        {searchProps && (
          <div
            className={clsx(
              "d-flex align-items-center p-3 gap-3",
              classes.filterContainer
              // type === "custom" && "border-bottom"
            )}
          >
            {!!searchProps && searchProps.optimizedOnChange ? (
              <SearchInput {...searchProps} />
            ) : (
              <Input
                type="search"
                name="filter-search"
                className="w-100 tableSearchInput"
                {...searchProps}
              />
            )}
          </div>
        )}
        <Loader isLoading={!!isFetching}>
          <div className={classes.tableContainer}>
            {fetchedData?.data?.length !== 0 ? (
              type === "basic" ? (
                <SimpleTable columns={[]} fetchedData={fetchedData} {...rest} />
              ) : (
                children
              )
            ) : (
              <div className={clsx(classes.empty)}>No Data Found</div>
            )}
          </div>
        </Loader>
        <div
          className={clsx(
            classes.pagination,
            isFetching && classes.paginationFetching
          )}
        >
          <div className="d-flex align-items-center">
            <IconButton
              variant="text"
              icon={ArrowRightLinear}
              onClick={() => onPreviousPage()}
              disabled={fetchedData.currentPage === 1}
            />
            <IconButton
              variant="text"
              icon={ArrowLeftLinear}
              onClick={() => onNextPage()}
              disabled={fetchedData.currentPage === fetchedData.maxPage}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Table;
