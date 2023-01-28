import React, { useMemo } from "react";
import { useTable } from "react-table";

export interface TableData {
  T1: string;
  T2: string;
  T3: string;
  F1: string;
  F2: string;
  F3: string;
  M1: string;
  M2: string;
  H1: string;
  H2: string;
  date_added: Date;
}

interface TableProps {
  headers: any[];
  data: any[];
  loading?: boolean;
}

const Table = ({ headers, data, loading }: TableProps) => {
  const tableColumns = useMemo(() => headers, [headers]);
  const { rows, headerGroups, getTableProps, getTableBodyProps, prepareRow } =
    useTable({ columns: tableColumns, data });
  return (
    <div>
      {" "}
      <table {...getTableProps()} className="w-full border-collapse">
        <thead className="table__head">
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              key={headerGroup.getHeaderGroupProps().key}
            >
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  key={column.getHeaderProps().key}
                  className=" border border-[#ddd] p-2 py-3 text-left bg-[]"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        {!loading && (
          <tbody {...getTableBodyProps()} className="table__body">
            {rows.map((row, rowIndex) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  key={row.getRowProps().key}
                  className="hover:bg-[#ddd] even:bg-[#f2f2f2]"
                >
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        key={cell.getCellProps().key}
                        className=" border border-[#ddd] p-2"
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
      {loading && <div className="table__loading">Loading....</div>}
    </div>
  );
};

export default Table;
