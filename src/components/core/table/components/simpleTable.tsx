import {PropsWithChildren, ReactNode, useEffect} from "react";
import {useRowSelect, useTable} from "react-table";
import classes from "../styles.module.scss";
import clsx from "clsx";
import {IFetchedData} from "..";

export interface ISimpleTableProps extends PropsWithChildren<any> {
  columns: any[];
  resultsPerPage: number;
  filterPlaceholder?: string;
  headerTrailingComponent?: ReactNode;
  onRowSelect?: (selectedRows: unknown[]) => void;
  fetchedData: IFetchedData;
  isFetching?: boolean;
  activeFlagAccessor?: string | "is_active";
  nonSelectable?: boolean;
}

const SimpleTable = ({
  nonSelectable,
  columns,
  onRowSelect,
  fetchedData,
  onGoToPage: _,
  activeFlagAccessor = "is_active",
}: ISimpleTableProps) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data: fetchedData?.data,
      initialState: {
        pageIndex: 0,
      },
      manualPagination: true,
      pageCount: fetchedData.maxPage,
    },
    useRowSelect
    // (hooks) => {
    //   onRowSelect &&
    //     hooks.visibleColumns.push((columns) => {
    //       if (nonSelectable) {
    //         return [...columns];
    //       }
    //       return [
    //         {
    //           id: "selection",
    //           Header: ({ getToggleAllRowsSelectedProps }) => {
    //             return (
    //               <input
    //                 type="checkbox"
    //                 {...getToggleAllRowsSelectedProps()}
    //                 className={classes.checkbox}
    //               />
    //             );
    //           },
    //           Cell: ({ row }) => {
    //             return (
    //               <input
    //                 type="checkbox"
    //                 {...row.getToggleRowSelectedProps()}
    //                 className={classes.checkbox}
    //               />
    //             );
    //           },
    //         },
    //         ...columns,
    //       ];
    //     });
    // }
  );

  // console.log(rows);

  useEffect(() => {
    onRowSelect && onRowSelect(selectedFlatRows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFlatRows]);

  return (
    <table {...getTableProps()} className={classes.table}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                className={classes.header}
                {...column.getHeaderProps()}
                // style={{
                //   ...(column.minWidth && { minWidth: column.minWidth }),
                //   ...(column.width !== 150 && { width: column.width }),
                // }}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          let rowSelectedProps = row.getToggleRowSelectedProps();
          let original: any = row.original;
          return (
            <tr
              className={clsx(
                classes.bodyRow,
                activeFlagAccessor &&
                  original?.[activeFlagAccessor] !== undefined &&
                  !original?.[activeFlagAccessor] &&
                  classes.deActiveRow
              )}
              {...row.getRowProps()}
              data-selected={rowSelectedProps.checked}
            >
              {row.cells.map((cell) => (
                <td className={classes.cell} {...cell.getCellProps()}>
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default SimpleTable;
