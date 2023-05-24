/* eslint-disable react-hooks/exhaustive-deps */
import {useTable} from "react-table";
import classes from "./styles.module.scss";

export interface IBasicTableProps {
  columns: any[];
  data?: any[];
}

// basic html table with customizable columns and data
function BasicTable({ columns, data }: IBasicTableProps) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: data ? data : [],
    });

  // render component
  return (
    <>
      <div className={classes.container}>
        <table {...getTableProps()} className={classes.table}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th className={classes.header} {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr className={classes.bodyRow} {...row.getRowProps()}>
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
        {rows.length === 0 && (
          <div className={classes.empty}>No Data Found</div>
        )}
      </div>
    </>
  );
}

export default BasicTable;
