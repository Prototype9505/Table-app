import React, { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import { useSortBy } from "react-table/dist/react-table.development";
import { useGlobalFilter } from "react-table/dist/react-table.development";
import users from "../users.json";
import { COLUMNS } from "./columns";
import GlobalFilter from "./GlobalFilter";
import { useResizeColumns } from "react-table/dist/react-table.development";
import { useBlockLayout } from "react-table/dist/react-table.development";


const DataTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => users, []);
  
  //Обработка возможных ошибок
  const getResource = async (URL) => {
    const res = await fetch(URL);

    if (!res.ok) {
      throw new Error(`Could not fetch ${URL}` + `, recieved ${res.status}`)
    }

    const body = await res.json();
    return body;

  };

  getResource('https://dummyjson.com/users')
  .then((body) => {
    console.log(body);
  })
  .catch((err) => {
    console.error('Could not fetch', err);
  });


//Далее указание размеров столбцов для дальнейшей возможности изменения 
  const defaultColumn = useMemo(() => ({
    minWidth: 50,
    width: 150,
    maxWidth: 400,
  }),
  []
);

  //Реализация самой таблицы
  const tableInstance = useTable(
    {
      columns: columns,
      data: data,
      defaultColumn
    },
    useGlobalFilter,
    useSortBy,
    useBlockLayout,
    useResizeColumns
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
    resetResizing,
  } = tableInstance;

  const { globalFilter } = state;
//Далее реализованы input-компонент по таблице и сортировка 
  return (
    <>
    <button onClick={resetResizing}>Reset Resizing</button>
      <div className="row">
        <div className="col-sm">
        </div>
        <div className="col-sm">
          <div className="action-widget" id="search-div">
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          </div>
        </div>
      </div>

      <div>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <div
                    {...column.getResizerProps()}
                    className={`resizer ${
                      column.isResizing ? "isResizing" : ""
                    }`}
                    onClick={(event)=> event.stopPropagation()}
                  />
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <span>
                            {"  "}
                            <i class="fas fa-arrow-down"></i>
                          </span>
                        ) : (
                          <span>
                            {"  "}
                            <i class="fas fa-arrow-up"></i>
                          </span>
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}> 
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DataTable;