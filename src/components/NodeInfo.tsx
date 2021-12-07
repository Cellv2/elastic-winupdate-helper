import React from "react";
import RbTable from "react-bootstrap/Table";
import { useTable } from "react-table";

type Props = {};

type ElasticNodeInfo = {
    master: string;
    nodeName: string;
    heapPct: number;
    ramPct: number;
    cpuPct: number;
};

const NodeInfo = (props: Props) => {
    const data = React.useMemo(
        () =>
            [
                {
                    master: "",
                    nodeName: "es03",
                    heapPct: 44,
                    ramPct: 14,
                    cpuPct: 0,
                },
                {
                    master: "*",
                    nodeName: "es01",
                    heapPct: 67,
                    ramPct: 14,
                    cpuPct: 0,
                },
                {
                    master: "",
                    nodeName: "es02",
                    heapPct: 44,
                    ramPct: 14,
                    cpuPct: 0,
                },
            ] as ElasticNodeInfo[],
        []
    );

    const columns = React.useMemo(
        () => [
            {
                Header: "Master",
                accessor: "master",
            },
            {
                Header: "Node Name",
                accessor: "nodeName",
            },
            {
                Header: "Heap %",
                accessor: "heapPct",
            },
            {
                Header: "RAM %",
                accessor: "ramPct",
            },
            {
                Header: "CPU %",
                accessor: "cpuPct",
            },
        ],
        []
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        // FIXME - typing for this are incorrect
        //@ts-expect-error
        useTable({ columns, data });
    return (
        <RbTable bordered striped hover size="sm" {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th>{column.render("Header")}</th>
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
                                    <td {...cell.getCellProps()}>
                                        {cell.render("Cell")}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </RbTable>
    );
};

export default NodeInfo;
